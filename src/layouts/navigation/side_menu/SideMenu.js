import { Drawer, Box } from "@mui/material";
import MenuIcon from "./menu_icon/MenuIcon";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatIcon from "@mui/icons-material/Chat";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SideMenu.module.css";

function SideMenu({ isOpen, onClose }) {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location]);

  return (
    <Drawer anchor="top" open={isOpen} onClose={onClose}>
      <div className={styles.menuIconContainer}>
        <Box className={styles.menuIconList}>
          <MenuIcon Icon={SmartToyIcon} title="챗봇" url={"/"} />
          <MenuIcon Icon={ChatIcon} title="채팅방" url={"/group-chat"} />
          <MenuIcon Icon={HelpCenterIcon} title="Q&A" url={"/question"} />
        </Box>
      </div>
    </Drawer>
  );
}

export default SideMenu;
