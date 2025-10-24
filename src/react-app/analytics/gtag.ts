declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-4JJ1V8DTJT";

export const pageview = (url: string) => {
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
