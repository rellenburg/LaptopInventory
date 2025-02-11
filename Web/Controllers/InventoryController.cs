// Controllers/InventoryController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string? _connectionString;

        public InventoryController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        [HttpPost("getLaptop")]
        public async Task<IActionResult> GetLaptop([FromBody] string AssetTag)
        {
            using var connection = new SqlConnection(_connectionString);
            const string sql = @"
                SELECT AssetTag, Manufacturer, ServiceTag, ComputerName 
                FROM PTC.LaptopInventory
                WHERE AssetTag = @AssetTag";

            var laptop = await connection.QueryFirstAsync<LaptopInventory>(sql, new { AssetTag });

            return Ok(new { laptop });
        }
    }
}