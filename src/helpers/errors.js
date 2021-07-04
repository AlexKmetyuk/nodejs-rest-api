class CustomError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongContactIdError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  WrongContactIdError,
  NotAuthorizedError,
  CustomError,
};
