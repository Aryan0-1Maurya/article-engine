import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      });
    };
    checkStatus();
  }, [auth]);

  useEffect(() => {
    setShow(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        container: "bg-gray-800",
        title: "text-white",
        content: "text-gray-300",
        confirmButton: "bg-blue-500 hover:bg-blue-700 text-white",
        cancelButton: "bg-green-500 hover:bg-red-700 text-white",
      },
    });

    if (result.isConfirmed) {
      try {
        const auth = getAuth();
        await signOut(auth);
        navigate("/");
        toast.success(
          "Logged Out, You have been logged out successfully",
          "success"
        );
      } catch (error) {
        console.log(error);
        toast.error(
          "Error",
          "An error occurred while loggin out. Please try again"
        );
      }
    }
  };

  const styles = {
    li: "hover:text-slate-300 ease-in-out transition duration-200 relative inline-block capitalize",
    mobileMenu: `absolute space-y-5 ease-in-out duration-500 transition-all text-2xl font-semibold ${show
      ? "translate-x-0 h-screen w-full top-12 bg-black justify-center"
      : "-translate-x-full top-12"
      } `,
  };
  return (
    <header className='header sticky top-0 z-40'>
      <div className='relative mx-auto flex max-w-7xl items-center justify-between py-3 font-raleway'>
        <h1
          onClick={() => navigate("/")}
          className='logo cursor-pointer pl-4 text-lg sm:text-3xl'
        >
          Article's Engine
        </h1>
        <div
          onClick={() => setShow(!show)}
          className='mr-3 cursor-pointer space-y-1 transition-all duration-200 ease-in-out md:hidden'
        >
          <span
            className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-200 ease-in-out ${show ? "translate-y-2 rotate-[50deg]" : "translate-y-0 rotate-0"
              } `}
          ></span>
          <span
            className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-200 ease-in-out ${show ? "opacity-0" : "opacity-100"
              } `}
          ></span>
          <span
            className={`block h-[2px] w-6 rounded-full bg-white transition-all duration-200 ease-in-out ${show
              ? "-translate-y-1 -rotate-[50deg]"
              : " translate-y-0 rotate-0"
              } `}
          ></span>
        </div>
        {/* Nav links */}
        <nav
          className={`absolute mr-4 flex items-center space-y-6 py-12 text-center text-lg transition-all duration-500 ease-in-out md:static md:h-auto md:w-auto md:translate-x-0 md:flex-row md:space-x-5 md:space-y-0 md:bg-transparent md:py-0 md:text-left ${show
            ? "top-12 h-screen w-full translate-x-0 flex-col bg-black"
            : "top-12 h-screen w-full -translate-x-full flex-col bg-black"
            } `}
        >
          <li
            className={`${styles.li} ${location.pathname === "/" && "highlight"
              } `}
          >
            <Link to='/'>Home</Link>
          </li>
          <li
            className={`${styles.li} ${location.pathname === "/articles" && "highlight"
              } `}
          >
            <Link to='/articles'>Articles</Link>
          </li>
              <li
            className={`${styles.li} ${location.pathname === "/About" && "highlight"
              } `}
          >
            <Link to='/About'>About</Link>
          </li>
          <li
            className={`${styles.li} ${location.pathname === "/Search" && "highlight"
              } `}
          >
            <Link to='/Search'>Search</Link>
          </li>
          {authenticated && (
            <li
              className={`${styles.li} ${location.pathname === `/>myblogs/${auth.currentUser.uid}` &&
                "highlight"
                } `}
            >
              <Link to={`/myblogs/${auth.currentUser.uid}`}>My Blogs</Link>
            </li>
          )}

          {/* Write Blog */}
          {authenticated && (
            <li
              className={`${styles.li} ${location.pathname === "/write" && "highlight"
                } `}
            >
              <Link to='/write'>Write</Link>
            </li>
          )}

          {authenticated && (
            <li
              className={`${styles.li} ${location.pathname === `/Aiamsrbot` &&
                "highlight"
                } `}
            >
              <Link to='/Aiamsrbot'>Ai</Link>
            </li>
          )}
    <li
            className={`${styles.li} ${location.pathname === "/ContactForm" && "highlight"
              } `}
          >
            <Link to='/ContactForm'>Contact</Link>
          </li>
          {authenticated && (
            <li
              className={`${styles.li} ${location.pathname === `/Call` &&
                "highlight"
                } `}
            >
              <Link to='/Call'>Call</Link>
            </li>
          )}
          {authenticated ? (
            <button
              onClick={handleLogout}
              className={`${`${styles.li}`} mr-6 cursor-pointer rounded-md bg-gradient-to-r from-amber-500 to-pink-500 px-4 py-1 shadow-xl active:scale-95`}
            >
              logout
            </button>
          ) : (
            <li
              className={`${styles.li} ${location.pathname === "/sign-in" && "highlight"
                } `}
            >
              <Link to='/sign-in'>sign-in</Link>
            </li>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

/* space-y-7 py-10 text-2xl font-semibold transition-all duration-500 ease-in-out
           ${
             show
               ? "top-12 h-screen w-full flex-col bg-black "
               : "top-12 h-screen -translate-x-full flex-col"
           } 
          md:flex-ro md:inline-block md:h-auto md:space-x-4 md:space-y-0 md:py-0 md:text-lg md:transition-none */
