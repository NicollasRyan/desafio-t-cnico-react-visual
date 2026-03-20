export class AppError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AppError";
    this.status = status;
  }
}