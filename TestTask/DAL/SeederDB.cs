using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestTask.DAL.Entities;

namespace TestTask.DAL
{
    public class SeederDB
    {
        public static void SeedCategories(ApplicationDbContext context)
        {
            string[] categories =
            {
                "Mobile", "Laptop", "Pen", "Software"
            };
            foreach (var name in categories)
            {
                var dbCat = context.Categories.SingleOrDefault(c => c.Name == name);
                if (dbCat == null)
                {
                    Category category = new Category()
                    {
                        Name = name
                    };
                    context.Categories.Add(category);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedProducts (ApplicationDbContext context)
        {
            int penId = context.Categories.Single(x => x.Name == "Pen").Id;
            int laptopId = context.Categories.Single(x => x.Name == "Laptop").Id;
            int mobileId = context.Categories.Single(x => x.Name == "Mobile").Id;
            int softwareId = context.Categories.Single(x => x.Name == "Software").Id;
            Product[] products =
            {
                new Product
                {
                    CategoryID = penId,
                    Name = "Green pen"
                },
                new Product
                {
                    CategoryID = penId,
                    Name = "Red pen"
                },
                new Product
                {
                    CategoryID = mobileId,
                    Name = "IPhone X"
                },
                new Product
                {
                    CategoryID = mobileId,
                    Name = "IPhone 8"
                },
                new Product
                {
                    CategoryID = laptopId,
                    Name = "Dell xps"
                },
                new Product
                {
                    CategoryID = laptopId,
                    Name = "HP Zbook"
                },
                new Product
                {
                    CategoryID = laptopId,
                    Name = "Asus ZenBook"
                },
                new Product
                {
                    CategoryID = softwareId,
                    Name="Windows 10"
                },
                new Product
                {
                    CategoryID = softwareId,
                    Name="Android"
                },
                new Product
                {
                    CategoryID = softwareId,
                    Name="IOS"
                },
                new Product
                {
                    CategoryID = softwareId,
                    Name="Linux"
                }
            };
            foreach (var item in products)
            {
                var dbProd = context.Products.SingleOrDefault(c => c.Name == item.Name);
                if (dbProd == null)
                {
                    Product product = new Product()
                    {
                        Name = item.Name,
                        CategoryID = item.CategoryID
                    };
                    context.Products.Add(product);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedData(IServiceProvider services, IHostingEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                SeederDB.SeedCategories(context);
                SeederDB.SeedProducts(context);
            }
        }
    }
}

