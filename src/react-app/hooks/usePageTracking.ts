import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview } from '../analytics/gtag';

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);
}
