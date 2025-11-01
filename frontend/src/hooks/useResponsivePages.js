// hooks/useResponsivePages.js
import { useEffect, useState } from "react";

const useResponsivePages = () => {
  const [visiblePages, setVisiblePages] = useState(5);

  useEffect(() => {
    const updatePages = () => {
      if (window.innerWidth < 640) setVisiblePages(2);
      else if (window.innerWidth < 1024) setVisiblePages(5);
      else setVisiblePages(10);
    };

    updatePages();
    window.addEventListener("resize", updatePages);
    return () => window.removeEventListener("resize", updatePages);
  }, []);

  return visiblePages;
};

export default useResponsivePages;
