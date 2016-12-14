using Microsoft.AspNet.SignalR;
using SignalRChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public ChatHub()
        {
            
        }

        public void RegisterUser(string userName)
        {
            Clients.All.emitRegisterUser(userName);
        }

        public void ChatMessage(Message message)
        {
            message.SendTime = DateTime.Now;

            Clients.All.emitChatMessage(message);
        }
    }
}