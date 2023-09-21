using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Web.Services;
using CapaNegocios;
using CapaEntidad;
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;
namespace SistemaInventario.Reportes
{
    public partial class Venta_UtilidadBruta : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {

        }

        protected void Page_Load(object sender, EventArgs e)
        {
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
        }

        [WebMethod(EnableSession = true)]
        public static List<LGFamiliasCE> F_Lineas_Listar_NET(string Descripcion)
        {
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();
            objEntidad.Descripcion = Descripcion;

            DataTable dtTabla = objOperacion.F_LINEA_AUTOCOMPLETE(objEntidad);

            List<LGFamiliasCE> lista = new List<LGFamiliasCE>();
            foreach (DataRow r in dtTabla.Rows)
            {
                LGFamiliasCE lin = new LGFamiliasCE();
                lin.IdFamilia = Convert.ToInt32(r["CodLinea"].ToString());
                lin.DscFamilia = r["Descripcion"].ToString();
                lista.Add(lin);
            }
            return lista;
        }

        [WebMethod(EnableSession = true)]
        public static List<LGFamiliasCE> F_Familias_Listar_NET(int pTodos)
        {
            return (new LGFamiliasCN()).F_Familias_Listar(pTodos);
        }

        [WebMethod(EnableSession = true)]
        public static List<TCAlmacenCE> F_Almacenes_Listar_NET(int pTodos)
        {
            return (new TCAlmacenCN()).F_TCAlmacen_Listar(3, pTodos);
        }

        [WebMethod(EnableSession = true)]
        public static List<MarcasCE> F_Marcas_Por_Familias_Listar_NET(string xml)
        {
            //xmldetalle
            String XmlDetalle = "";
            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(xml);

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " IdFamilia = '" + item.IdFamilia + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            return (new LGFamiliasCN()).F_Marcas_Por_Familias_Listar(XmlDetalle);
        }

    }
}