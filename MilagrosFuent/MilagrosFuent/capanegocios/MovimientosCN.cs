using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;
namespace CapaNegocios
{
  public  class MovimientosCN
    {
      MovimientosCD obj = new MovimientosCD();

      public DataTable F_Movimientos_Kardex(MovimientosCE objEntidadBE)
        {

            try
            {

                return obj.F_Movimientos_Kardex(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }








      public DataTable F_Movimientos_Kardex_Auditoria_Salcedo(MovimientosCE objEntidadBE)
      {
          try
          {
              return obj.F_Movimientos_Kardex_Auditoria(objEntidadBE);
          }
          catch (Exception ex)
          {
              throw ex;
          }

      }







      public List<MovimientosCE> F_Movimientos_Kardex_List_Tabulador(MovimientosCE objEntidadBE)
      {
          List<MovimientosCE> lista = new List<MovimientosCE>();
          try
          {
              DataTable data_result = obj.F_Movimientos_Kardex_List_Tabulador(objEntidadBE);
              foreach (DataRow row in data_result.Rows)
              {
                  MovimientosCE item = GlobalUtils.Datos.CreateItemFromRow<MovimientosCE>(row);
                  lista.Add(item);
              }
              return lista;
          }
          catch (Exception ex)
          {

              throw ex;
          }
      }
    
  
  }
}
