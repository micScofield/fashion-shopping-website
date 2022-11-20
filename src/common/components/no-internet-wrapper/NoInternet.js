import React, { useState, useEffect } from 'react';

const NoInternetWrapper = (props) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    window.addEventListener('online', () => {
      setOnline(true);
    });

    window.addEventListener('offline', () => {
      setOnline(false);
    });

    return () => {
      window.removeEventListener('online', () => {
        setOnline(true);
      });

      window.removeEventListener('offline', () => {
        setOnline(false);
      });
    };
  }, [navigator.onLine]);

  if (isOnline) {
    return props.children;
  } else {
    return <h1>No Internet Connection. Please try again later.</h1>;
  }
};

export default NoInternetWrapper;
