using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
    public class TCTasasCN
    {
        TCTasasCD obj = new TCTasasCD();

        public DataTable F_TCTasas_ListarXTipoTasa(TCTasasCE objEntidadBE)
        {
            try
            {
                return obj.F_TCTasas_ListarXTipoTasa(objEntidadBE);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public List<TCTasasCE> F_IGV_Listar(TCTasasCE objEntidadBE)
        {
            try
            {
                DataTable dtDatos = obj.F_TCTasas_ListarXTipoTasa(objEntidadBE);
                List<TCTasasCE> lDatos = new List<TCTasasCE>();


                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new TCTasasCE()
                    {
                        CodTasa = Convert.ToInt32(r["CodTasa"].ToString()),

                        Valor = Convert.ToDecimal(r["Valor"].ToString()),
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public List<TCTasasCE> F_IGV_Listar2(TCTasasCE objEntidadBE)
        {
            try
            {
                DataTable dtDatos = obj.F_TCTasas_ListarXTipoTasa2(objEntidadBE);
                List<TCTasasCE> lDatos = new List<TCTasasCE>();


                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new TCTasasCE()
                    {
                        CodTasa = Convert.ToInt32(r["CodTasa"].ToString()),

                        Valor = Convert.ToDecimal(r["Valor"].ToString()),
                    });
                }

                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}
