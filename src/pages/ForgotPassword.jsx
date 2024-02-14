import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  // function to send reset mail
  const passwordResetEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      navigate("/sign-in");
      setLoading(false);
      toast.success("Email sent, check your mailbox!!");
    } catch (error) {
      console.error("Firebase Error:", error);
      if (error.code === "auth/network-request-failed") {
        toast.error("Network request failed. Please check your internet connection.");
      } else {
        toast.error("Unable to send reset email. Please check your credentials!");
      }
      setLoading(false);
    }
  };
  

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=''>
      <h1 className='my-12 mb-20 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center font-raleway text-5xl font-bold text-transparent'>
        Forgot Password
      </h1>
      <section className='mx-auto max-w-7xl'>
        <div className='h-full'>
          {/* <!-- Left column container with background--> */}
          <div className='g-6 flex h-full flex-wrap items-center justify-center lg:justify-between'>
            <div className='shrink-1 mb-12 grow-0 basis-auto rounded-md bg-[#003f5c] md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
              <img
                src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                className='w-full '
                alt='Sample image'
              />
            </div>

            {/* <!-- Right column container --> */}
            <div className='mx-auto mb-12 mt-8 md:mb-0 md:w-8/12 lg:mt-0 lg:w-5/12 xl:w-5/12'>
              <form onSubmit={passwordResetEmail}>
                {/* <!-- Email input --> */}
                <div className='form__group field relative mx-auto w-full max-w-[90%] py-4'>
                  <input
                    type='email'
                    id='email'
                    onChange={onChangeHandler}
                    value={email}
                    className='form__field bg-[#272727]'
                    placeholder='Email address'
                    required
                  />
                  <label htmlFor='email' className='form__label'>
                    Email address
                  </label>
                </div>

                <div className='mx-auto flex w-full max-w-[90%] items-center justify-between'>
                  <p className='text- pt-3 text-gray-400'>
                    Have an account?
                    <span
                      onClick={() => navigate("/sign-in")}
                      className='cursor-pointer bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent'
                    >
                      Login
                    </span>{" "}
                  </p>
                  <p
                    onClick={() => navigate("/sign-up")}
                    className='inline cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text pt-3 text-transparent hover:shadow-xl'
                  >
                    Register
                  </p>
                </div>

                {/* Login button */}
                <div className='mx-auto my-8 w-full max-w-[70%] '>
                  <button
                    type='submit'
                    className='w-full cursor-pointer rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold text-white transition duration-200 ease-in-out active:scale-90'
                  >
                    Send reset email
                  </button>
                </div>

                <div className='mx-auto my-4 mt-5 flex w-full max-w-[90%] items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-500 after:mt-0.5 after:flex-1 after:border-t after:border-gray-500'>
                  <p className='mx-4 mb-0 text-center font-semibold dark:text-white'>
                    OR
                  </p>
                </div>
              </form>
              {/* Google authentication */}
              <OAuth />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
