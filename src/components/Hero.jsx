import heroImg from "../assets/118-macbook.png";

const Hero = () => {
  return (
    <div className='prose prose-stone mx-5 my-12 flex max-w-7xl flex-col items-center md:flex-row lg:mx-auto'>
      <div className='mx-auto w-full max-w-[90%] md:mr-3 md:max-w-[46%]'>
        <h1 className=' bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text py-3 text-3xl font-extrabold text-transparent lg:text-5xl'>
          Have any ideas? why keep it to yourslef?
        </h1>
        <p className='text-gray-400 md:pt-4 lg:text-lg'>
         This is platform where you can write your throughts -&gt; Article's / Blogs /
         Post's just like another social media app <br />
         We'll never share your Data with anyone else.  End-to-End encrypted your privacy my policy  &nbsp;  &nbsp; 
         <a style={{textDecoration:'none'}} className='text-gray-400 md:pt-4 lg:text-lg' href="https://www.termsfeed.com/live/b41df7ba-864d-496e-bd28-c8800be44777">Privacy/Policy1  &nbsp;  &nbsp; </a>
         <a style={{textDecoration:'none'}} className='text-gray-400 md:pt-4 lg:text-lg' href="https://www.freeprivacypolicy.com/live/e2daa1bc-aaf9-48c9-89a3-0dba9f79d6f0">Privacy/Policy2  &nbsp;  &nbsp; </a>
         <a style={{textDecoration:'none'}} className='text-gray-400 md:pt-4 lg:text-lg' href="https://www.privacypolicies.com/live/b7c6d0aa-121a-47f3-9e90-f0a09df4c67e">Privacy/Policy3  &nbsp;  &nbsp; </a>
         <a style={{textDecoration:'none'}} className='text-gray-400 md:pt-4 lg:text-lg' href="https://aryan0-1maurya.github.io/Licence/">Licence</a>
        </p>
      </div>
      <div className='mx-auto max-w-[70%] bg-transparent md:max-w-[50%]'>
        <img
          loading='lazy'
          className='w-full rounded-lg bg-black '
          src={heroImg}
          alt=''
        />
      </div>
    </div>
  );
};

export default Hero;
