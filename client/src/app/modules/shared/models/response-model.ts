export interface ResponseModel<T> {
  data: T;
  code: string;
  message: string;
}
