export function serializeError(error: Error) {
  if (!(error instanceof Error)) {
    return {
      message: "Unexpected: caught response is not an instance of Error",
      name: "No instance of Error",
    }
  }
  return {
    cause: error.cause,
    message: error.message,
    name: error.name,
    stack: error.stack,
  }
}
