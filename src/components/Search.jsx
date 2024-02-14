import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form
      className="mx-auto flex max-w-[90%] items-center sm:max-w-[50%]"
      onSubmit={handleSubmit}
    >
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          value={searchTerm}
          onChange={handleInputChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-2 pl-10 text-sm text-gray-900 shadow-xl focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:py-3"
          placeholder="Search article"
          required
        />
      </div>
      <button
        type="submit"
        className="ml-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-xs text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:px-6 sm:py-3 sm:text-sm sm:font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
