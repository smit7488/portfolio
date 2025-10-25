import { useEffect } from "react";

export function useFavicon(lightSvg: string, darkSvg: string) {
  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ||
      document.createElement("link");

    link.rel = "icon";

    const setFavicon = (isDark: boolean) => {
      link.href = isDark ? darkSvg : lightSvg;
      if (!document.querySelector('link[rel="icon"]')) {
        document.head.appendChild(link);
      }
    };

    // Set initial favicon based on system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setFavicon(mediaQuery.matches);

    // Listen for changes in system theme
    const listener = (e: MediaQueryListEvent) => {
      setFavicon(e.matches);
    };
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, [lightSvg, darkSvg]);
}
 