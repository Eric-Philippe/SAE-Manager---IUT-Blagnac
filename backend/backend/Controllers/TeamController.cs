﻿using System.Collections;
using System.Security.Claims;
using backend.ApiModels.Output;
using backend.Data;
using backend.Data.Models;
using backend.FormModels;
using backend.Services.Class;
using backend.Services.Interfaces;
using backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Template;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly ITeamService _teamService;
    private readonly IUserService _userService;

    public TeamController(ITeamService teamService, IUserService userService)
    {
        _teamService = teamService;
        _userService = userService;
    }

    [HttpGet]
    [Authorize(Roles = RoleAccesses.Student)]
    public ActionResult<List<Team>> GetTeams()
    {
        var user = _userService.GetCurrentUser(HttpContext);

        return _teamService.GetTeams(user.id);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> GetTeam(Guid id)
    {
        var team = _teamService.GetTeam(id);

        if (team == null)
        {
            return NotFound();
        }

        return team;
    }

    [HttpPost]
    [Authorize(Roles = RoleAccesses.Student)]
    public async Task<ActionResult<Team>> CreateTeam(TeamForm teamForm)
    {
        var user = _userService.GetCurrentUser(HttpContext);

        var teamItem = _teamService.CreateTeam(teamForm, user.id);

        return CreatedAtAction(
            nameof(GetTeam),
            new { id = teamItem.id },
            new
            {
                teamItem.id,
                teamItem.name,
                teamItem.color
            });
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<Team>> ModifyTeam(Guid id, TeamForm teamForm)
    {
        var user = _userService.GetCurrentUser(HttpContext);

        try
        {
            var team = _teamService.MoifyTeam(id, teamForm, user.id);
            if (team == null)
            {
                return NotFound();
            }
            return team;
        }
        catch (DbUpdateConcurrencyException)
        {
            return NotFound();
        }
    }
}