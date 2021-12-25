namespace OA_Service.DTOs
{
    public class ResponseModel<T>
    {
        public T Data { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
    }
}