import Request from "lib/Request";

class QuestionRequest {
  static findQuestionSummary(searchKeyword) {
    return new Promise((resolve, reject) => {
      Request.get(`/question?search=${searchKeyword}`)
        .then((res) => {
          resolve(res.data.questionList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static addQuestion(questionData) {
    return new Promise((resolve, reject) => {
      Request.post("/question", { questionData: questionData })
        .then((res) => {
          resolve(res.data.questionId);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static findQuestion(questionId) {
    return new Promise((resolve, reject) => {
      Request.get(`/question/${questionId}`)
        .then((res) => {
          resolve(res.data.question);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static addAnswer(questionId, answerData) {
    return new Promise((resolve, reject) => {
      Request.post(`/question/${questionId}`, { answerData: answerData })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default QuestionRequest;
