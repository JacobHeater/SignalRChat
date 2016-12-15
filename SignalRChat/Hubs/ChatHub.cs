using Microsoft.AspNet.SignalR;
using SignalRChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public ChatHub()
        {
            
        }
        

        public void RegisterUser(string userName)
        {
            Clients.All.emitRegisterUser(new
            {
                userName = userName,
                uniqueId = Context.QueryString["unique-id"]
            });
        }

        public void ChatMessage(Message message)
        {
            message.SendTime = DateTime.Now.ToShortDateString();

            Clients.All.emitChatMessage(message);
        }

        public void IndicatePresence(string userName)
        {
            Clients.Others.emitRegisterUser(new
            {
                userName = userName,
                uniqueId = Context.QueryString["unique-id"]
            });
        }

        public void QueryUsers()
        {
            Clients.Others.updateRegistration();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Clients.All.emitUserDisconnect(Context.QueryString["unique-id"]);

            return base.OnDisconnected(stopCalled);
        }
    }
}