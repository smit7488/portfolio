import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import usePageTracking from "./hooks/usePageTracking";

const IS_UNDER_MAINTENANCE = false; // toggle or use env variable

function App() {
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
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/project/:slug" element={<ProjectPage />} />
              {/* fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PageTrackingWrapper>
    </Router>
  );
}

// keeps analytics tracking separate
function PageTrackingWrapper({ children }: { children: React.ReactNode }) {
  usePageTracking();
  return <>{children}</>;
}

export default App;
