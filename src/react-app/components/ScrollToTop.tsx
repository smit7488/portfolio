import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: "auto" });

    if (hash) {
      // Wait a tick to allow the element to render
      setTimeout(() => {
        const element = document.querySelector<HTMLElement>(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
