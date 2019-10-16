using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestTask.DAL;
using TestTask.DAL.Entities;
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
            try
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
                    CountOfPages = (int)Math.Ceiling((double)countOfItems / itemsShow),
                    Products = products
                };

                return Ok(model);
            }
            catch
            {
                return BadRequest("Failed to get data!!!");
            }
        }

        [HttpPost("product/Add")]
        public IActionResult AddProduct([FromBody]AddProductModel model)
        {
            try
            {
                var category = _context.Categories.SingleOrDefault(x => x.Name == model.CategoryName);
                if (category != null)
                {
                    _context.Products.Add(new Product
                    {
                        Name = model.ProductName,
                        CategoryID = category.Id
                    });
                }
                else
                {
                    category = new Category
                    {
                        Name = model.CategoryName
                    };
                    _context.Categories.Add(category);
                    _context.SaveChanges();

                    _context.Products.Add(new Product
                    {
                        Name = model.ProductName,
                        CategoryID = category.Id
                    });
                }
                _context.SaveChanges();

                return Ok();
            }
            catch
            {
                return BadRequest("Cannot add item!!!");
            }
        }

        [HttpDelete("product/delete/{productId}")]
        public IActionResult DeleteProduct(int productId)
        {
            _context.Products.Remove(new Product { Id = productId});
            _context.SaveChanges();
            return Ok();
        }
        [HttpPut("product/edit")]
        public IActionResult EditProduct([FromBody]ProductItemModel product)
        {
            var productItem = _context.Products.Single(x => x.Id == product.ProductID);
            var category = _context.Categories.SingleOrDefault(x=>x.Name==product.CategoryName);
            if (category != null)
            {
                productItem.Name = product.ProductName;
                productItem.CategoryID = category.Id;
            }
            else
            {
                category = new Category { Name = product.CategoryName };
                _context.Categories.Add(category);
                _context.SaveChanges();
                productItem.Name = product.ProductName;
                productItem.CategoryID = category.Id;

            }
            _context.SaveChanges();

            return Ok();
        }

    }
}