import { useEffect } from "react";
import { captureUTMParams, storeUTMParams } from "@/lib/utm";

/**
 * Component to capture and store UTM parameters on page load
 * Place this component at the app level to capture UTM params from landing URLs
 */
const UTMTracker = () => {
  useEffect(() => {
    const params = captureUTMParams();
    if (Object.keys(params).length > 0) {
      storeUTMParams(params);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default UTMTracker;
