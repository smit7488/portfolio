import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Maintenance from "./pages/Maintenance";
import Services from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";
import usePageTracking from "./hooks/usePageTracking";
import { useFavicon } from "./hooks/useFavicon";


const IS_UNDER_MAINTENANCE = true; // toggle or use env variable

function App() {
 useFavicon("/favicon-light.svg", "/favicon-dark.svg");

  if (IS_UNDER_MAINTENANCE) {
    return <Maintenance />;
  }

return (
  <Router>
  <ScrollToTop />
  <PageTrackingWrapper>
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </PageTrackingWrapper>
</Router>

);

}

// Optional wrapper to keep hook separate
function PageTrackingWrapper({ children }: { children: React.ReactNode }) {
  usePageTracking();
  return <>{children}</>;
}
 
export default App;
 