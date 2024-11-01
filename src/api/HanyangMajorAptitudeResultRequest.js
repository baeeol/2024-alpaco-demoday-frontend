import Request from "lib/Request";

class HanyangMajorAptitudeResultRequest {
  static updateResult(result) {
    return new Promise((resolve, reject) => {
      Request.post("/user/examination/hanyang-major-aptitude", { result })
        .then((res) => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static findResult(result) {
    return new Promise((resolve, reject) => {
      Request.get("/user/examination/hanyang-major-aptitude")
        .then((res) => {
          resolve(res.data.result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default HanyangMajorAptitudeResultRequest;
