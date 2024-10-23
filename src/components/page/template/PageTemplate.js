import { getCookie } from "lib/Cookie";
import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import styles from "./PageTemplate.module.css";

function PageTemplate({ isFullScreen, children }) {
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      const accessToken = getCookie("access-token");
      if (!accessToken) {
        window.location.href = "/login";
      }
    }
  }, [location, params, searchParams]);

  return (
    <div className={styles.pageTemplateContainer}>
      <div
        className={styles.pageTemplate}
        style={{ maxWidth: `${isFullScreen ? "100%" : "750px"}` }}
      >
        {children}
      </div>
    </div>
  );
}

export default PageTemplate;
