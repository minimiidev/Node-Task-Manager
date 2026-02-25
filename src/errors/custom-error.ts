

export class CustomAPIError extends Error {

  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {
    super(message)
    this.statusCode = statusCode
  }
}

export const createCustomError = (msg: string, statusCode: number) => {
  return new CustomAPIError(msg, statusCode)
}

