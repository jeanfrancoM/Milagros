using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaInventario.Servicios
{
    public class Response
    {
        public String response { get; set; }
        public int total { get; set; }
        public dynamic data { get; set; }
    }
}