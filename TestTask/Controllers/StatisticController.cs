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
    [Route("api/statistic")]
    public class StatisticController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatisticController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("get/{page}")]
        public IActionResult GetStatistic(int page)
        {
            int itemsShow = 3;
            var statistic = _context.Categories.AsQueryable();
            int countOfItems = statistic.Count();
              statistic = statistic.Include(x=>x.Products)
                .Skip((page - 1) * itemsShow)
                .Take(itemsShow);
            var statisticList = new List<StatisticItemModel>();
            foreach(var item in statistic)
            {
                statisticList.Add(new StatisticItemModel
                {
                    CategoryName = item.Name,
                    Count = item.Products.Count,
                    CategoryID = item.Id
                });
            }
            var model = new GetStatisticModel
            {
                CountOfPages = (int)Math.Ceiling((double)countOfItems / itemsShow),
                CurrentPage = page,
                StatisticItems = statisticList,
       
            };


            return Ok(model);
        }
    }
}