import React, { useState } from 'react';
import Iframe from 'react-iframe';
import Loader from "../components/Loader"; // Import the Loader component

const Aiamsrbot = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    // Once iframe content is loaded, set isLoading to false
    setIsLoading(false);
  };

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {isLoading && <Loader />} {/* Show loader if isLoading is true */}
      <Iframe
        url="https://amsrbot.netlify.app/"
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

export default Aiamsrbot;
