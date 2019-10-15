using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestTask.DAL;
using TestTask.Models;

namespace TestTask.Controllers
{
    [Produces("application/json")]
    [Route("api/item")]
    public class ItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("products/{page}")]
        public IActionResult GetProducts(int page)
        {
            int itemsShow = 4;
            var listProducts = _context.Products.AsQueryable();

            int countOfItems = listProducts.Count();

            listProducts = listProducts.Include(x => x.Category)
                 .Skip((page - 1) * itemsShow)
                 .Take(itemsShow);
            var products = new List<ProductItemModel>();
            foreach (var item in listProducts)
            {
                products.Add(new ProductItemModel
                {
                    CategoryName = item.Category.Name,
                    ProductName = item.Name,
                    ProductID = item.Id
                });
            }

            var model = new GetProductModel
            {
                CurrentPage = page,
                CountOfPages = (int)Math.Ceiling((double)countOfItems/itemsShow),
                Products = products
            };

            return Ok(model);
        }
    }
}