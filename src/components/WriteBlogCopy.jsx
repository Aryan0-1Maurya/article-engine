import { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { db } from "../config/firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { v4 as uuidv4 } from "uuid";
import BlogEditor from "../components/BlogEditor";
import { Balancer } from "react-wrap-balancer";

const WriteBlog = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [progress, setProgress] = useState(0);
  const [blogData, setBlogData] = useState({
    description: "",
    category: "",
    // image: {},
  });
  const { title, content } = blogData;
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

  const getData = () => {
    console.log(blogData);
  };
  // Submit details to firebase
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogRef = collection(db, "blogs");
      const data = await addDoc(blogRef, {
        uuid: uuidv4(),
        timestamp: serverTimestamp(),
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        blogData,
      });
      console.log(data);
      navigate(`/myBlogs/${auth.currentUser.uid}`);
      setLoading(false);
      toast.success("Post published");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Unable to publish post");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <h1 className='my-14 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text py-4 text-center font-raleway text-5xl font-extrabold text-transparent'>
        <Balancer>Create a new blog post</Balancer>
      </h1>
      <form
        onSubmit={onSubmitHandler}
        className='mx-auto mt-[60px] w-full max-w-3xl lg:max-w-4xl'
      >
        <div className='mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700'>
          <div className='flex items-center justify-between border-b px-3 py-2 dark:border-gray-600'>
            <div className='flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x'>
              {/* SVG's */}
              <div className='flex items-center space-x-1 sm:pr-4'>
                <button
                  type='button'
                  className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='sr-only'>Attach file</span>
                </button>
                <button
                  type='button'
                  className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='sr-only'>Upload image</span>
                </button>
                <button
                  type='button'
                  className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='sr-only'>Format code</span>
                </button>
                <button
                  type='button'
                  className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='sr-only'>Add emoji</span>
                </button>
              </div>
              <div className='flex flex-wrap items-center space-x-1 sm:pl-4'>
                <button
                  type='button'
                  className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='sr-only'>Add list</span>
                </button>
                <button
                  type='button'
                  className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='sr-only'>Settings</span>
                </button>
                <button
                  type='button'
                  className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='sr-only'>Timeline</span>
                </button>
              </div>
            </div>

            <button
              type='button'
              data-tooltip-target='tooltip-fullscreen'
              className='cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white sm:ml-auto'
            >
              <svg
                aria-hidden='true'
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Full screen</span>
            </button>
            <div
              id='tooltip-fullscreen'
              role='tooltip'
              className='tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700'
            >
              Show full screen
              <div className='tooltip-arrow' data-popper-arrow></div>
            </div>
          </div>
          <div className='rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800'>
            <label htmlFor='editor' className='sr-only'>
              Publish post
            </label>

            <div>
              <label htmlFor='title' className='sr-only'>
                Title
              </label>
              <input
                id='title'
                onChange={onChangeHandler}
                value={title}
                name='title'
                type='text'
                required
                className='block w-full border-0 bg-white px-0 text-lg text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 '
                placeholder='Title'
              />
            </div>
            <hr />
            <textarea
              id='content'
              onChange={onChangeHandler}
              value={content}
              rows='20'
              className='mt-2 block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
              placeholder='Write an article...'
              required
            ></textarea>
          </div>
        </div>

        {/* Categories */}
        <div className=' mt-8 space-y-5'>
          <div className='relative inline-block'>
            <button
              type='button'
              className='flex  items-center rounded bg-gray-700 px-4
                py-2 text-white hover:bg-gray-600 focus:outline-none'
              onClick={toggleMenu}
            >
              {category ? `${category}` : " Select a category"}

              <svg
                className='ml-2 h-4 w-4'
                aria-hidden='true'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                ></path>
              </svg>
            </button>
            {isOpen && (
              <div className='absolute z-10 mt-3 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700'>
                <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
                  <li
                    onClick={() => selectCategory("entertainment")}
                    id='category'
                    value='entertainment'
                    className='block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <a>Entertainment</a>
                  </li>
                  <li
                    onClick={() => selectCategory("knowledge")}
                    id='category'
                    value='knowledge'
                    className='block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <a>Knowledge</a>
                  </li>

                  <li
                    onClick={() => selectCategory("programming")}
                    id='category'
                    value='programming'
                    className='block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <a>Programming</a>
                  </li>

                  <li
                    onClick={() => selectCategory("productivity")}
                    id='category'
                    value='productivity'
                    className='block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <a>Productivity</a>
                  </li>

                  <li
                    onClick={() => selectCategory("lifestyle")}
                    id='category'
                    value='lifestyle'
                    className='block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <a>Lifestyle</a>
                  </li>

                  <li
                    onClick={() => selectCategory("design")}
                    id='category'
                    value='design'
                    className='block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <a>Design</a>
                  </li>

                  <li
                    onClick={() => selectCategory("travel")}
                    id='category'
                    value='travel'
                    className='block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <a>Travel</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div style={{ height: "360px" }}>
          <BlogEditor
            blogData={blogData}
            setBlogData={setBlogData}
            onchangeHandler={onChangeHandler}
          />
        </div>
        <hr className='mt-8 border-gray-600' />
        <div className='mx-auto my-8 w-full max-w-[50%] lg:max-w-[40%] '>
          <button
            type='submit'
            className='w-full cursor-pointer rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white transition duration-200 ease-in-out active:scale-90'
          >
            Publish post
          </button>
        </div>
      </form>
    </>
  );
};

export default WriteBlog;
