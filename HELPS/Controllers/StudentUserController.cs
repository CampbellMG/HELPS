using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;

namespace HELPS.Controllers
{
    public abstract class StudentUserController : ControllerBase
    {
        protected readonly HelpsContext Context;
        protected readonly Lazy<User> StudentUser;
        protected readonly Lazy<IEnumerable<Workshop>> StudentWorkshops;
        protected readonly Lazy<IEnumerable<Session>> StudentSessions;
        protected readonly Lazy<IEnumerable<Room>> StudentRooms;
        protected readonly Lazy<IEnumerable<Advisor>> StudentAdvisors;
        protected readonly Lazy<Student> Student;

        protected StudentUserController(HelpsContext context)
        {
            Context = context;
            StudentUser = new Lazy<User>(GetStudentUser);
            StudentWorkshops = new Lazy<IEnumerable<Workshop>>(GetStudentWorkshops);
            StudentSessions = new Lazy<IEnumerable<Session>>(GetStudentSessions);
            StudentRooms = new Lazy<IEnumerable<Room>>(GetStudentRooms);
            StudentAdvisors = new Lazy<IEnumerable<Advisor>>(GetStudentAdvisors);
        }

        private User GetStudentUser()
        {
            try
            {
                var userId = User.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
                var parsedUserId = Int32.Parse(userId);
                return Context.Users.Find(parsedUserId);
            }
            catch (Exception)
            {
                throw new UnauthorizedAccessException();
            }
        }

        private IEnumerable<Workshop> GetStudentWorkshops()
        {
            return Context.Workshops.Where(workshop =>
                workshop.StudentIds.Contains(StudentUser.Value.Id));
        }

        private IEnumerable<Session> GetStudentSessions()
        {
            return Context.Sessions.Where(session => session.StudentId == StudentUser.Value.Id);
        }

        private IEnumerable<Room> GetStudentRooms()
        {
            var sessionRoomIds = StudentSessions.Value.Select(session => session.RoomId);
            var workshopRoomIds = StudentWorkshops.Value.Select(workshop => workshop.RoomId);

            return Context.Rooms.Where(room =>
                sessionRoomIds.Contains(room.Id) || workshopRoomIds.Contains(room.Id));
        }

        private IEnumerable<Advisor> GetStudentAdvisors()
        {
            var sessionAdvisorIds = StudentSessions.Value.Select(session => session.AdvisorId);
            var workshopAdvisorIds = StudentWorkshops.Value.Select(workshop => workshop.AdvisorId);

            return Context.Advisors.Where(advisor =>
                sessionAdvisorIds.Contains(advisor.Id) || workshopAdvisorIds.Contains(advisor.Id));
        }

        private Student GetStudent()
        {
            return Context.Students.Find(StudentUser.Value.Id);
        }

        protected bool IsAdmin()
        {
            try
            {
                return StudentUser.Value.isAdmin;
            }
            catch (UnauthorizedAccessException)
            {
                return false;
            }
        }
    }
}