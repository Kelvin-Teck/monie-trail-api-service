

const sendError = (message, code) => {
  return {
    status: "ERROR",
    code,
    message,
  };
};

const sendSuccess = (message, data) => {
  return {
    status: "SUCCESS",
    code: 200,
    message,
    data,
  };
};

// class CustomError extends Error {
//   status: number;

//   constructor(message: string, status: number) {
//     super(message);
//     this.status = status;
//     Object.setPrototypeOf(this, new.target.prototype);
//   }
// }

// utils/CustomError.ts
class CustomError extends Error {
   code;

  constructor(message, code) {
    super(message);
    this.name = "CustomError";
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}


const newError = (message, code) => {
  throw new CustomError(message, code);
  // return {
  //   error: true,
  //   message,
  //   code,
  // };
};

export { sendError, sendSuccess, newError, CustomError };
