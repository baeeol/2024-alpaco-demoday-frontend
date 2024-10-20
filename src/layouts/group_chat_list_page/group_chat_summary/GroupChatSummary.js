import TranslateIcon from "@mui/icons-material/Translate";
// import CalculateIcon from "@mui/icons-material/Calculate";
// import ScienceIcon from "@mui/icons-material/Science";
// import SportsCricketIcon from "@mui/icons-material/SportsCricket";
// import PaidIcon from "@mui/icons-material/Paid";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import ColorLensIcon from "@mui/icons-material/ColorLens";
// import MedicationIcon from "@mui/icons-material/Medication";
import { Link } from "react-router-dom";
import styles from "./GroupChatSummary.module.css";

function GroupChatSummary({ id, name, tag }) {
  return (
    <Link className={styles.groupChatSummary} to={`/group-chat/${id}?name=${name}`}>
      <div className={styles.groupChatDescription}>
        <div className={styles.title}>{name}</div>
        <div className={styles.tag}>{tag.replaceAll(",", " ")}</div>
      </div>
      {getRandomChatIcon()}
    </Link>
  );
}

function getRandomChatIcon() {
  const iconList = [
    TranslateIcon,
    // CalculateIcon,
    // ScienceIcon,
    // SportsCricketIcon,
    // PaidIcon,
    // ApartmentIcon,
    // ColorLensIcon,
    // MedicationIcon,
  ];
  const [RandomIcon] = iconList.sort(() => 0.5 - Math.random());

  return <RandomIcon className={styles.groupChatIcon} />;
}

export default GroupChatSummary;
