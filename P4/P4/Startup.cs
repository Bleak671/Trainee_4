using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
using P4.Utility;

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
                options.UseInMemoryDatabase("InMemory"), ServiceLifetime.Transient, ServiceLifetime.Transient);
                //options.UseSqlServer(connection, sqlServerOptions => sqlServerOptions.CommandTimeout(180)), ServiceLifetime.Transient);

            services.AddTransient<AuthUtility>();

            services.AddTransient<UserBLL>();
            services.AddTransient<PhotoBLL>();
            services.AddTransient<PhotoCommentBLL>();
            services.AddTransient<PhotoReviewBLL>();
            services.AddTransient<TagBLL>();
            services.AddTransient<PhotoTagBLL>();
            services.AddTransient<UserMessageBLL>();

            services.AddTransient<IRepository<User>, UserRepository>();
            services.AddTransient<IRepository<Photo>, PhotoRepository>();
            services.AddTransient<IRepository<PhotoComment>, PhotoCommentRepository>();
            services.AddTransient<IRepository<PhotoReview>, PhotoReviewRepository>();
            services.AddTransient<IRepository<Tag>, TagRepository>();
            services.AddTransient<IRepository<Photo_m2m_Tag>, PhotoTagRepository>();
            services.AddTransient<IRepository<UserMessage>, UserMessageRepository>();

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

            services.AddMemoryCache();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("SomePolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "My API V1");
            });

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("SomePolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
