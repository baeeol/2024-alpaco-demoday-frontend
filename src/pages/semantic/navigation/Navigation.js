import styles from "./Navigation.module.css";

function Navigation({ children }) {
  return <div className={styles.navigation}>{children}</div>;
}

export default Navigation;
