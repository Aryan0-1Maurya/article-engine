/* eslint-disable react/prop-types */
import { getAuth } from "firebase/auth";
import parse from "html-react-parser";
import { useLocation, useNavigate } from "react-router-dom";
import LazyLoad from "./common/LazyLoad";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Card = ({ id, blog, delHandler }) => {
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  const handleActionClick = (e) => {
    e.stopPropagation();
  };
  const fallBackImage =
    "https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?w=900&t=st=1686204841~exp=1686205441~hmac=16586e1f1340a9b9a774cd9538d3a9fc9fcd78acf00fbe2405160352f137faa4";

  return (
    <div>
      <div
        onClick={() => navigate(`/category/${blog.blogData.category}/${id}`)}
        className='google__btn__shadow relative mx-auto my-2 max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white bg-gradient-to-r from-gray-700 via-gray-900 to-black shadow transition-all  duration-200 ease-in-out hover:shadow-lg hover:shadow-sky-800 dark:border-gray-700 dark:bg-gray-800'
      >
        <a href='#' className='transition-all duration-300 ease-in-out'>
          <LazyLoad
            classes={
              "h-72 w-[30rem] rounded-t-lg object-cover transition-all duration-300 ease-in-out hover:scale-105"
            }
            image={blog?.imageUrl ? blog?.imageUrl : fallBackImage}
          />
        </a>
        <div className='h-56 p-5 font-bold tracking-tight'>
          <a href='#'>
            <h2 className='mb-2  line-clamp-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {blog?.blogData?.title}
            </h2>
          </a>
          <p className='mb-3 line-clamp-2 font-normal text-gray-700  dark:text-gray-400'>
            {parse(blog?.blogData?.content)}
          </p>
          <div className='mt-6 flex items-center justify-between'>
            <button className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
              Read more
              <svg
                aria-hidden='true'
                className='-mr-1 ml-2 h-4 w-4'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            <span className='absolute right-2 top-[14.8rem] cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-4 active:scale-95'>
              {blog?.blogData?.category}
            </span>

            <span className="active:scale-95' absolute left-2 top-[14.8rem] cursor-pointer rounded-lg bg-zinc-600 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-4">
              {blog?.timestamp
                ? dayjs(blog.timestamp.toDate()).fromNow()
                : "Timestamp not available"}
            </span>

            {/* Action icons */}
            {auth?.currentUser &&
              location.pathname !== "/articles" &&
              location.pathname !== "/" && (
                <div
                  onClick={handleActionClick}
                  className='z-50 flex items-center space-x-3'
                >
                  {/* del icon */}
                  <span
                    onClick={() => delHandler(id)}
                    className='cursor-pointer active:scale-95'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      className='h-6 w-6 stroke-red-500 stroke-2'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                  {/* edit icon */}
                  <span
                    onClick={() => navigate(`/edit/${id}`)}
                    className='cursor-pointer active:scale-95'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      className='h-6 w-6 stroke-cyan-500 stroke-[1.2px]'
                    >
                      <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
                      <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
                    </svg>
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
