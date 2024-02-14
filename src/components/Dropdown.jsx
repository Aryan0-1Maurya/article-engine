const Dropdown = ({ toggleMenu, category, selectCategory, isOpen }) => {
  return (
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
            className={`ml-2 h-4 w-4 transition-all duration-200 ease-in-out ${
              !isOpen ? "rotate-1800" : "rotate-180"
            } `}
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
  );
};

export default Dropdown;

/* <div class="hs-dropdown relative inline-flex [--trigger:hover]">
  <button id="hs-dropdown-hover-event" type="button" class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
    Actions
    <svg class="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>

  <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:left-0 after:w-full before:h-4 before:absolute before:-top-4 before:left-0 before:w-full" aria-labelledby="hs-dropdown-hover-event">
    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
      Newsletter
    </a>
    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
      Purchases
    </a>
    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
      Downloads
    </a>
    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
      Team Account
    </a>
  </div>
</div> */
