import PageTemplate from "components/page/PageTemplate";
import { GroupChatSummary, AddingModal } from "layouts/group_chat_list_page";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { SendingInput } from "components";
import Navigation from "pages/semantic/navigation/Navigation";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import GroupChatRequest from "api/GroupChatRequest";
import styles from "./GroupChatListPage.module.css";

const sendingInputStyle = {
  button: { background: "none", padding: "0.1rem" },
  sendIcon: { color: "#f95454", fontSize: "2rem" },
};

function GroupChatListPage() {
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [addingGroupChatData, setAddingGroupChatData] = useState({ name: "", tag: "" });
  const [groupChatList, setGroupChatList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    loadGroupChatList(searchKeyword, setGroupChatList);
  }, [searchParams]);

  useEffect(() => {
    setAddingGroupChatData((prev) => {
      return { name: "", tag: "" };
    });
  }, [isAddingModalOpen]);

  const addingGroupChatSetValueHandler = {
    setName: (value) => {
      setAddingGroupChatData((prev) => {
        return { ...prev, name: value };
      });
    },
    setTag: (value) => {
      setAddingGroupChatData((prev) => {
        return { ...prev, tag: value };
      });
    },
  };

  return (
    <PageTemplate isFullScreen={true}>
      <Navigation>
        <div className={styles.gotoChatbotContainer}>
          <Link to="/" className={styles.gotoChatbotNav}>
            <SmartToyIcon className={styles.gotoChatbotIcon} />
          </Link>
        </div>
      </Navigation>
      <AddingModal
        isOpen={isAddingModalOpen}
        onCloseHandler={() => setIsAddingModalOpen(false)}
        value={addingGroupChatData}
        setValue={addingGroupChatSetValueHandler}
        onSubmitHandler={() => {
          addGroupChat(addingGroupChatData);
        }}
      />
      <div className={styles.groupChatListPage}>
        <SendingInput
          placeholder={"관심있는 주제가 있으신가요?"}
          SendIcon={SearchIcon}
          style={sendingInputStyle}
          value={searchKeyword}
          onChangeHandler={(e) => {
            setSearchKeyword(e.target.value);
          }}
          onSendHandler={() => {
            setSearchParams({ search: searchKeyword });
          }}
          options={{ isAllowEmptyMessage: true }}
        />
        <div className={styles.addGroupChatContainer}>
          <button
            className={styles.addGroupChat}
            onClick={() => {
              setIsAddingModalOpen(true);
            }}
          >
            채팅방 만들기
          </button>
        </div>
        <div className={styles.groupChatSummaryContainer}>
          <div className={styles.groupChatSummaryList}>
            {groupChatList.map((groupChat, idx) => {
              const { id, name, tag } = groupChat;
              return <GroupChatSummary key={idx} id={id} name={name} tag={tag} />;
            })}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

async function loadGroupChatList(searchKeyword, setGroupChatList) {
  const groupChatList = await GroupChatRequest.findGroupChat(searchKeyword);
  setGroupChatList((prev) => {
    return groupChatList;
  });
}

async function addGroupChat(addingGroupChatData) {
  if (!addingGroupChatData || !addingGroupChatData.name || !addingGroupChatData.tag) {
    alert("꼼꼼하게 적성해주세요!");
    return;
  }

  window.location.reload();
}

export default GroupChatListPage;
