import { useState, useEffect } from "react";
import MobileNavigation from "./MobileNavigation";
import LargeScreenNav from "./LargeScreenNav";

export default function ResponsiveNavigation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile ? <MobileNavigation /> : <LargeScreenNav />;
}
