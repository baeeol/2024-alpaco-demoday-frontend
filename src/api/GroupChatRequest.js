import Request from "lib/Request";

class GroupChatRequest {
  static addGroupChat(groupChatData) {
    return new Promise((resolve, reject) => {
      Request.post("/group-chat", { groupChatData: groupChatData })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static findGroupChat(searchKeyword) {
    return new Promise((resolve, reject) => {
      Request.get(`/group-chat?search=${searchKeyword}`)
        .then((res) => {
          resolve(res.data.groupChatList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static findGroupChatMessage(groupChatId) {
    return new Promise((resolve, reject) => {
      Request.get(`/group-chat/${groupChatId}`)
        .then((res) => {
          resolve(res.data.groupChatMessageList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static addGroupChatMessage(groupChatId, message) {
    return new Promise((resolve, reject) => {
      Request.post(`/group-chat/${groupChatId}`, {
        groupChatMessage: { message: message },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default GroupChatRequest;
