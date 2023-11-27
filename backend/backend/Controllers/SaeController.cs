﻿using backend.ApiModels.Output;
using backend.Data.Models;
using backend.FormModels;
using backend.Services.Class;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaeController : ControllerBase
    {
        private readonly ISaeService _saeService;
        private readonly ITeamService _teamService;
        private readonly IUserService _userService;

        public SaeController(ISaeService saeService, ITeamService teamService, IUserService userService)
        {
            _saeService = saeService;
            _teamService = teamService;
            _userService = userService;
        }

        [HttpPost]
        [Authorize]
        public ActionResult AddSae(SaeForm saeForm)
        {
            try
            {
                _saeService.CreateSae(saeForm);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("user/{id}")]
        [Authorize]
        public ActionResult<List<Sae>> GetSaesByUserId(Guid id)
        {
            var saes = _saeService.GetSaeByUserId(id);

            if (saes == null)
            {
                return NotFound();
            }

            return saes;
        }

        [HttpGet("admin/{id}")]
        [Authorize]
        public ActionResult<List<SaeAdminResponse>> GetSaesAdminByUserId(Guid id)
        {
            var saesNbGroups = _saeService.GetSaeAdminNbGroup(id);
            
            if (saesNbGroups == null)
            {
                return NotFound();
            }

            var saesNbCharacter = _saeService.GetSaeAdminNbStudent(id);

            if (saesNbCharacter == null)
            {
                return NotFound();
            }

            foreach (var sae in saesNbGroups)
            {
                var saesChar = saesNbCharacter.Find(s => s.id == sae.id);

                if (saesChar == null)
                {
                    sae.total_student = 0;
                }
                else
                {
                    sae.total_student = saesChar.total_student;
                }
            }

            return saesNbGroups;
        }

        [HttpGet("teams/{id}")]
        [Authorize]
        public async Task<ActionResult<OutputGetTeamsBySaeId>> GetTeamsBySaeId(Guid id)
        {
            OutputGetTeamsBySaeId output = new() { teams = new() };

            var teams = _teamService.GetTeamsBySaeId(id);

            foreach (var team in teams)
            {
                var teamComposition = new TeamComposition
                {
                    idTeam = team.id,
                    nameTeam = team.name,
                    colorTeam = team.color,
                    idUsers = new List<Guid>()
                };

                List<User> users = _userService.GetUsersByTeamId(team.id);

                foreach (var user in users)
                {
                    teamComposition.idUsers.Add(user.id);
                }

                output.teams.Add(teamComposition);
            }

            return output;
        }
    }
}
