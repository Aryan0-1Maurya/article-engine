import { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
    //  import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { db } from "../config/firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { v4 as uuidv4 } from "uuid";
import BlogEditor from "../components/BlogEditor";
import { Balancer } from "react-wrap-balancer";
import Dropdown from "../components/Dropdown";
import useImageUpload from "../hooks/useImageUpload";

const WriteBlog = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const { image, title } = blogData;
  const { storeImage } = useImageUpload(image);
  const [category, setCategory] = useState("");

  // To get category
  const selectCategory = (option) => {
    setCategory(option);
    setBlogData({
      ...blogData,
      category: option,
    });
  };

  // Add details to blogData state
  const onChangeHandler = (e) => {
    if (e.target.id === "title") {
      setBlogData({
        ...blogData,
        title: e.target.value,
      });
    }
    console.log(blogData);
    if (e.target.files) {
      setBlogData({
        ...blogData,
        image: e.target.files[0],
      });
    }
    // console.log(blogData);
  };

  // Submit details to firebase
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (blogData.content && blogData.category && blogData.title) {
      try {
        const imageUrl = await storeImage(blogData.image);
        delete blogData.image;
        const blogRef = collection(db, "blogs");
        await addDoc(blogRef, {
          uuid: uuidv4(),
          timestamp: serverTimestamp(),
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
          blogData,
          imageUrl,
          comments: [],
        });
        navigate(`/myBlogs/${auth.currentUser.uid}`);
        setLoading(false);
        toast.success("Post published");
      } catch (error) {
        setLoading(false);
        console.error(error);
        toast.error("Unable to publish post");
      } finally {
        setLoading(false);
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
        <Balancer>Create a new blog/article post</Balancer>
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
          onChange={onChangeHandler}
          type='text'
          className='mt-5 h-12 w-full rounded-md border-zinc-800 pl-3 text-zinc-700'
          value={title}
          id='title'
          placeholder='Enter title here...'
        />
        <input
          onChange={onChangeHandler}
          type='file'
          maxLength={1}
          accept='.jpg,.png,.jpeg'
          className='mt-5 w-full rounded-md border border-zinc-800 py-3 pl-3 text-zinc-700'
        />
        <BlogEditor blogData={blogData} setBlogData={setBlogData} />
        <div className='mx-auto my-8 w-full max-w-[50%] lg:max-w-[40%] '>
          <button
            type='submit'
            className='mt-20 w-full cursor-pointer rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white transition duration-200 ease-in-out active:scale-90 md:mt-8'
          >
            Publish post
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default WriteBlog;
