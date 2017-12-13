using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FakeServices.Controllers
{
    [Route("api/[controller]")]
    public class ForgottenPasswordController : Controller
    {
        public const string MailHost = "mailhost";
        public const int MailPort = 1025;
        // POST api/<controller>
        [HttpPost]
        public async void Post([FromQuery]string email)
        {
            var message = new MimeMessage();
            message.From.Add( new MailboxAddress("FakeSite","garry@fakesite.com") );
            message.To.Add(new MailboxAddress("Recipient", email));
            message.Subject = "You requested a password reset";
            message.Body = new TextPart()
            {
                Text = "You requested a link to reset your password \r\n " +
                       "You can do this by following this link: \r\n" +
                       "www.garrysfakesite.com/passwordreset \r\n" +
                       "If you have trouble doing this please contact the fakesite support team\r\n\r\n" +
                       "Best regards, \r\n" +
                       "the fakesite support team."

            };
            using (var mailClient = new SmtpClient() )
            {
               await mailClient.ConnectAsync(MailHost,MailPort, SecureSocketOptions.None);
               await mailClient.SendAsync(message);
               await mailClient.DisconnectAsync(true);
            }
        }

        // GET api/values
        [HttpGet]
        public string Get()
        {
            return "Hello";
        }
    }
}
