using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestTask.Models
{
    public class AddProductModel
    {
        [Required(ErrorMessage = "Can't be empty!")]
        public string ProductName { get; set; }
        [Required(ErrorMessage = "Can't be empty!")]
        public string CategoryName { get; set; }
    }

    public class ProductItemModel
    { 
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string CategoryName { get; set; }
    }
   
    public class GetProductModel
    {
        public int CurrentPage { get; set; }
        public int CountOfPages { get; set; }
        public ICollection<ProductItemModel> Products { get; set; }
    }

    public class GetStatisticModel
    {
        public int CurrentPage { get; set; }
        public int CountOfPages { get; set; }
        public ICollection<StatisticItemModel> StatisticItems { get; set; }
    }

    public class StatisticItemModel
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int Count { get; set; }
    }

}
