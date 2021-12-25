export interface ResponseModel<T> {
  status: number;
  data: T;
  code: string;
  message: string;
}
