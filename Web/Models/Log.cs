namespace Web.Models
{
    public class Log
    {
        public required int Id { get; set; }
        public string? AssetTag { get; set; }
        public DateTime ActivityDate { get; set; }
        public string? ActivityBy { get; set; }
        public bool? Activity { get; set; }
    }
}
