import styles from "./PageTemplate.module.css";

function PageTemplate({ isFullScreen, children }) {
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
