using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace P4.JWT
{
    public class AuthOptions
    {
        public const string ISSUER = "P4Server"; 
        public const string AUDIENCE = "P4Client"; 
        const string KEY = "B4msasd.7da#OIT4sd!Q";  
        public const int LIFETIME = 60; 
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
