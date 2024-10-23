import Request from "lib/Request";

class SubmitRequest {
  static login(loginData) {
    return new Promise((resolve, reject) => {
      Request.post("/user/login", { loginData: loginData })
        .then((res) => {
          resolve(res.data.accessToken);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static register(registerData) {
    return new Promise((resolve, reject) => {
      Request.post("/user/register", { registerData: registerData })
        .then((res) => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default SubmitRequest;
