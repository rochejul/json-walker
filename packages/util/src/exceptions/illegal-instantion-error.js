export class IllegalInstantationError extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this, IllegalInstantationError);
  }
}
