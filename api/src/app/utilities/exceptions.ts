export class NotFoundException extends Error {
  public status = 404;
  public message = "Not found";
}
