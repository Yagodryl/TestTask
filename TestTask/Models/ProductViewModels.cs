using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestTask.Models
{
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

}
