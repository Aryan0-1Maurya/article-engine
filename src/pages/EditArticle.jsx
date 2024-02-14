/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { db } from "../config/firebase";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import BlogEditor from "../components/BlogEditor";
import { Balancer } from "react-wrap-balancer";
import Dropdown from "../components/Dropdown";

const EditArticle = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    comments: "",
    // image: {},
  });
  // console.log(blogData);
  const [category, setCategory] = useState("");

  const { title } = blogData;

  // To get category
  const selectCategory = (option) => {
    setCategory(option);
    setBlogData({
      ...blogData,
      category: option,
    });
  };

  useEffect(() => {
    if (blog && blog?.author?.id !== auth?.currentUser?.uid) {
      toast.error("You cannot edit this blog!!");
      navigate("/");
    }
  }, []);

  // Add details to blogData state
  const onChangeHandler = (e) => {
    if (e.target.id !== "category") {
      setBlogData({
        ...blogData,
        [e.target.id]: e.target.value,
      });
    }
    console.log(blogData);
    /*     if(e.target.files){
      setBlogData({
        ...blogData,
        image: e.target.files,
      });
    } */
    // console.log(blogData);
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      if (auth && auth.currentUser) {
        const blogRef = doc(db, "blogs", articleId);
        const docSnap = await getDoc(blogRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBlog({ ...docSnap.data() });
          setBlogData({ ...data.blogData });
          // console.log(blogData);
          setLoading(false);
        }
      }
    } catch (error) {
      navigate("/");
      console.log(error);
      toast.error("Listing doesnot exist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Update details to firebase
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (blogData.content && blogData.category && blogData.title) {
      try {
        const blogDataCopy = {
          ...blogData,
          updatedAt: serverTimestamp(),
        };

        const blogRef = doc(db, "blogs", articleId);

        // updating the blogData which is inside blogData field
        await updateDoc(blogRef, {
          blogData: blogDataCopy,
        });
        navigate(`/myBlogs/${auth.currentUser.uid}`);
        setLoading(false);
        toast.success("Post published");
      } catch (error) {
        setLoading(false);
        console.error(error);
        toast.error("Unable to publish post");
      }
    } else {
      toast.error("Please fill all the fields");
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='h-full bg-gray-200 pb-20'>
      <h1 className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text py-4 pt-14 text-center font-raleway text-4xl font-extrabold text-transparent md:text-5xl'>
        <Balancer>Create a new blog post</Balancer>
      </h1>
      <form
        onSubmit={onSubmitHandler}
        className='mx-auto mt-[60px] w-[90%] max-w-3xl md:w-full lg:max-w-4xl'
      >
        {/* Categories */}
        <Dropdown
          toggleMenu={toggleMenu}
          category={category}
          selectCategory={selectCategory}
          isOpen={isOpen}
        />
        <input
          value={title}
          onChange={onChangeHandler}
          type='text'
          className='mt-5 h-12 w-full rounded-md border-zinc-800 pl-3 text-zinc-700'
          id='title'
          placeholder='Enter title here...'
        />
        {/* <input
          onChange={onChangeHandler}
          type='file'
          className='mt-5 w-full rounded-md border border-zinc-800 py-3 pl-3 text-zinc-700'
          name=''
          placeholder='Enter title here...'
        /> */}
        <BlogEditor blogData={blogData} setBlogData={setBlogData} />
        <div className='mx-auto my-8 mt-20 w-full max-w-[50%] md:mt-0 lg:max-w-[40%] '>
          <button
            type='submit'
            className='mt-8 w-full cursor-pointer rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white transition duration-200 ease-in-out active:scale-90'
          >
            Update post
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default EditArticle;
