using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA_Data;
using OA_Repo;
using OA_Service.DTOs;
using OA_Service.Interface;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly RoleManager<AppRole> _roleManager;

        // private readonly IEmailSender _emailSender;

        public AccountController(UserManager<AppUser> userManager,
                                RoleManager<AppRole> roleManager,
                                SignInManager<AppUser> signInManager,
                                ITokenService tokenService,
                                IMapper mapper,
                                ApplicationContext context

            )
        {
            _roleManager = roleManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _context = context;

        }

        //[HttpPost("register")]
        //public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        //{
        //    if (!ModelState.IsValid) return BadRequest();

        //    //check Email
        //    var res = await CheckUser(registerDto.Email);
        //    if (res) return Ok("username is already taken");


        //    // if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

        //    // var user = new AppUser();

        //    // user.UserName = registerDto.Username;
        //    var user = _mapper.Map<RegisterDto, AppUser>(registerDto);

        //    var result = await _userManager.CreateAsync(user, registerDto.Password);

        //    if (!result.Succeeded) return BadRequest(result.Errors);

        //    try
        //    {
        //        await _mailer.SendEmailAsync(registerDto.Email, "Exceptionssword", registerDto.Password);

        //    }
        //    catch (Exception)
        //    {

        //    }

        //    // var message = new MimeMessage();
        //    // MailboxAddress from = new MailboxAddress("Admin",
        //    // "e.magdy@excp.sa");
        //    // message.From.Add(from);

        //    // MailboxAddress to = new MailboxAddress("Esam",
        //    // "dev.esam2014@gmail.com");
        //    // message.To.Add(to);

        //    // message.Subject = "Your Password Is " + registerDto.Password;
        //    // using (var client=new SmtpClient())
        //    // {
        //    //     await client.ConnectAsync("smtp.gmail.com", 587, true);
        //    //     await client.AuthenticateAsync("dev.esam2014@gmail.com","Dev.Esam*@#2651");
        //    //     await client.SendAsync(message);
        //    //     await client.DisconnectAsync(true);
        //    // }

        //    // await _emailSender.SendEmailAsync(user.Email,
        //    //                                     "Your Password",
        //    //                                     registerDto.Password);

        //    // var emailSender = new EmailSender(null)
        //    //                     .SendEmailAsync(user.Email,
        //    //                                     "Your Password",
        //    //                                     registerDto.Password);

        //    return new UserDto
        //    {
        //        Username = user.UserName,
        //        Email = user.Email,
        //        Token = await _tokenService.CreateToken(user),
        //        IsActive = user.IsActive
        //    };
        //}

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) // password Esam*123456
        {
            var user = await _userManager.Users
                                    .Where(x => x.Email == loginDto.Email)
                                    .FirstOrDefaultAsync();

            if (user == null) return Unauthorized("من فضلك تاكد من البريد الالكترونى");

            var result = await _signInManager
                          .CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized("من فضلك تاكد من الرقم السرى");

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        private async Task<bool> CheckUser(string Email)
        {
            var user = await _context.Users.Where(x => x.UserName == Email).ToListAsync();
            return user.Count() > 0;
        }
    }
}