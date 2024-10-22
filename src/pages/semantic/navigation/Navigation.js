import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { SideMenu } from "layouts/navigation";
import styles from "./Navigation.module.css";

function Navigation() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.navigation}>
        <button
          className={styles.menuButton}
          onClick={() => {
            setIsSideMenuOpen(true);
          }}
        >
          <MenuIcon className={styles.menuIcon} />
        </button>
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => {
            setIsSideMenuOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default Navigation;
