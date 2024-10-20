import Request from "lib/Request";

class ChatbotRequest {
  static getChatbotResponse(message) {
    return new Promise((resolve, reject) => {
      Request.post("/chatbot", { message: message })
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
