import { useEffect, useState } from 'react';

interface ResizeOptions {
  maxWidth: number;
}

const useHandleResize = ({ maxWidth }: ResizeOptions) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < maxWidth);

  const handleResize = () => {
    setIsMobile(window.innerWidth < maxWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [maxWidth]);

  return isMobile;
};

export default useHandleResize;
