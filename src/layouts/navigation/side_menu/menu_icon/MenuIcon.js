import { Link } from "react-router-dom";
import styles from "./MenuIcon.module.css";

function MenuIcon({ Icon, title, url }) {
  return (
    <Link to={url} className={styles.link}>
      <Icon className={styles.icon} />
      <div className={styles.title}>{title}</div>
    </Link>
  );
}

export default MenuIcon;
