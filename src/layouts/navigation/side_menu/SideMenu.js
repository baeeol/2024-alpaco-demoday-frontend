import { Drawer, Box } from "@mui/material";
import MenuIcon from "./menu_icon/MenuIcon";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatIcon from "@mui/icons-material/Chat";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SideMenu.module.css";
import { getCookie, setCookie } from "lib/Cookie";

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
          <button
            style={{ border: "none", background: "none", outline: "none" }}
            onClick={() => {
              setCookie("access-token", null);
              window.location.reload();
            }}
          >
            <MenuIcon Icon={LogoutIcon} title="로그아웃" />
          </button>
        </Box>
      </div>
    </Drawer>
  );
}

export default SideMenu;
