﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat.Models
{
    public class Message
    {
        public string UserName { get; set; }
        public string Content { get; set; }
        public string SendTime { get; set; }
    }
}