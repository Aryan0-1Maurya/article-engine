import React, { useState } from 'react';
import Iframe from 'react-iframe';
import Loader from "../components/Loader"; // Import the Loader component

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    // Once iframe content is loaded, set isLoading to false
    setIsLoading(false);
  };

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'white', position: 'relative' }}>
      {isLoading && <Loader />} {/* Show loader if isLoading is true */}
      <Iframe
        url="https://amsr-web-engine.vercel.app"
        width="100%"
        height="100%"
        display="initial"
        position="relative"
        style={{ border: 'none' }}
        onLoad={handleLoad} // Call handleLoad function when iframe content is loaded
      />
    </div>
  );
};

export default Search;
