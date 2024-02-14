/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";
// import Loader from "../components/Loader";
import Card from "../components/Card";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import CardSkeleton from "../components/skeleton/CardSkeleton";


const MyBlogs = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [userBlog, setUserBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fethUserData = async () => {
      const blogRef = collection(db, "blogs");
      // if query is under something then it should be written inside the backticks
      const q = query(
        blogRef,
        where(`author.id`, "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const docSnap = await getDocs(q);
      let blogs = [];
      docSnap.forEach((doc) => {
        blogs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setUserBlog(blogs);
      setLoading(false);
    };
    fethUserData();
  }, []);

  const delHandler = async (id) => {
    const showConfirmation = () => {
      return Swal.fire({
        title: "Confirm Delete?",
        text: "Are you sure you want to delete this post?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
      });
    };

    const result = await showConfirmation();
    if (auth.currentUser && result.isConfirmed) {
      try {
        const ref = doc(db, "blogs", id);
        await deleteDoc(ref);
        setUserBlog(userBlog.filter((blog) => blog?.id !== id));
        toast.success("Post deleted");
      } catch (error) {
        console.log(error.message);
        toast.error("Post not deleted");
      }
    }
  };

  return (
    <div className='mx-auto max-w-7xl'>
     
      <h1 className='my-12 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text py-5 text-center text-5xl font-extrabold text-transparent'>
        {/* from-red-500 to-orange-500 bg-clip-text text-transparent */}
        My Articles
      </h1>
     
      <div className='mx-auto mt-12 grid w-[80%] grid-cols-1 gap-5 md:w-[95%] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : userBlog && userBlog.length > 0 ? (
          userBlog.map((blog, index) => (
            <Card
              key={index}
              id={blog?.id}
              blog={blog?.data}
              delHandler={delHandler}
            />
          ))
        ) : (
          <p className='mt-24 text-center text-4xl font-extrabold'>
            You have not post any article yet!!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
