export class ObjectRequiredError extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this, ObjectRequiredError);
  }
}
