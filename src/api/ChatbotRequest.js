import Request from "lib/Request";

class ChatbotRequest {
  static getChatbotResponse(message, history) {
    return new Promise((resolve, reject) => {
      Request.post("/chatbot", { message: message, history: history })
        .then((res) => {
          resolve(res.data.message);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default ChatbotRequest;
