import { Link } from "react-router-dom";
import styles from "./SubmitPageTemplate.module.css";

function SubmitPageTemplate({ children, title, link, onSubmit }) {
  return (
    <div className={styles.submitPageTemplateContainer}>
      <div className={styles.submitPageTemplate}>
        <div className={styles.title}>{title}</div>
        <div className={styles.form}>{children}</div>
        <button className={styles.submitButton} onClick={onSubmit}>
          {title}
        </button>
      </div>
      <div className={styles.linkContainer}>
        <Link to={link.url} className={styles.link}>
          {link.text}
        </Link>
      </div>
    </div>
  );
}

export default SubmitPageTemplate;
