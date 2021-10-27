using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using P4.BLL;
using P4.DAL;
using P4.JWT;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("LocalDatabase");
            services.AddDbContext<AppDBContext>(options =>
                options.UseSqlServer(connection));

            services.AddScoped<UserBLL>();
            services.AddScoped<PhotoBLL>();
            services.AddScoped<PhotoCommentBLL>();
            services.AddScoped<PhotoReviewBLL>();

            services.AddScoped<IRepository<User>, UserRepository>();
            services.AddScoped<IRepository<Photo>, PhotoRepository>();
            services.AddScoped<IRepository<PhotoComment>, PhotoCommentRepository>();
            services.AddScoped<IRepository<PhotoReview>, PhotoReviewRepository>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // validating issuer
                            ValidateIssuer = true,
                            // setting issuer
                            ValidIssuer = AuthOptions.ISSUER,

                            // validating token audience
                            ValidateAudience = true,
                            // setting audience for token
                            ValidAudience = AuthOptions.AUDIENCE,
                            // validating lifetime
                            ValidateLifetime = true,

                            // setting security key
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            // validation
                            ValidateIssuerSigningKey = true,
                        };
                    });

            services.AddControllersWithViews();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "My API V1");
            });
        }
    }
}
