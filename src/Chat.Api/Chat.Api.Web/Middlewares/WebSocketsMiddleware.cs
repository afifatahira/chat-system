using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Chat.Api.Web.Middlewares
{
    public class WebSocketsMiddleware
    {
        private readonly RequestDelegate _next;

        public WebSocketsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var request = httpContext.Request;

            if (request.Path.StartsWithSegments("/chatsocket", StringComparison.OrdinalIgnoreCase) &&
            request.Query.TryGetValue("userId", out var appUserId))
            {
                request.Headers.Add("x-user-id", appUserId);
            }

            await _next(httpContext);
        }
    }
}
