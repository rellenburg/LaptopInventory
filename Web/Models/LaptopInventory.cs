namespace Web.Models
{
    public class LaptopInventory
    {
        public required string AssetTag { get; set; }
        public string? Manufacturer { get; set; }
        public string? ServiceTag { get; set; }
        public string? ComputerName { get; set; }
    }
}
