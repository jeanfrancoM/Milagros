using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaEntidad;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace CapaDatos
{
   public class TCConceptosDetCD
    {
       public DataTable F_RUTA_LISTAR_COMBO()
       {
           DataTable dta_consulta = null;

           try
           {
               using (SqlConnection sql_conexion = new SqlConnection())
               {
                   sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                   sql_conexion.Open();

                   using (SqlCommand sql_comando = new SqlCommand())
                   {

                       sql_comando.Connection = sql_conexion;
                       sql_comando.CommandType = CommandType.StoredProcedure;
                       sql_comando.CommandText = "PA_RUTA_LISTAR_COMBO";

                       dta_consulta = new DataTable();

                       dta_consulta.Load(sql_comando.ExecuteReader());

                       return dta_consulta;
                   }
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
           finally
           { dta_consulta.Dispose(); }
       }
        public DataTable F_TCConceptos_Select(TCConceptosDetCE objEntidadBE)
        {

            DataTable dta_consulta = null;

            try
            {

                using (SqlConnection sql_conexion = new SqlConnection())
                {

                    sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                    sql_conexion.Open();

                    using (SqlCommand sql_comando = new SqlCommand())
                    {

                        sql_comando.Connection = sql_conexion;
                        sql_comando.CommandType = CommandType.StoredProcedure;
                        sql_comando.CommandText = "pa_TCConceptos_Selecct_ddl";

                       

                        sql_comando.Parameters.Add("@CodConcepto", SqlDbType.Int).Value = objEntidadBE.CodConcepto;

                        dta_consulta = new DataTable();

                        dta_consulta.Load(sql_comando.ExecuteReader());

                        return dta_consulta;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }

            finally
            { dta_consulta.Dispose(); }

        }

        public DataTable F_TCConceptosDet_LISTARFORMAPAGO(TCConceptosDetCE objEntidadBE)
        {

            DataTable dta_consulta = null;

            try
            {

                using (SqlConnection sql_conexion = new SqlConnection())
                {

                    sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                    sql_conexion.Open();

                    using (SqlCommand sql_comando = new SqlCommand())
                    {

                        sql_comando.Connection = sql_conexion;
                        sql_comando.CommandType = CommandType.StoredProcedure;
                        sql_comando.CommandText = "PA_TCConceptosDet_LISTARFORMAPAGO";


                        sql_comando.Parameters.Add("@CodPrincipal", SqlDbType.Int).Value = objEntidadBE.CodPrincipal;
                        sql_comando.Parameters.Add("@CodTipoDoc", SqlDbType.Int).Value = objEntidadBE.CodTipoDoc;

                        dta_consulta = new DataTable();

                        dta_consulta.Load(sql_comando.ExecuteReader());

                        return dta_consulta;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }

            finally
            { dta_consulta.Dispose(); }

        }



        public DataTable F_TCConceptosDet_ListarEstadoFactura(TCConceptosDetCE objEntidadBE)
        {

            DataTable dta_consulta = null;

            try
            {

                using (SqlConnection sql_conexion = new SqlConnection())
                {

                    sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                    sql_conexion.Open();

                    using (SqlCommand sql_comando = new SqlCommand())
                    {

                        sql_comando.Connection = sql_conexion;
                        sql_comando.CommandType = CommandType.StoredProcedure;
                        sql_comando.CommandText = "pa_TCConceptosDet_ListarEstadoFactura";

                        sql_comando.Parameters.Add("@Flag", SqlDbType.Int).Value = objEntidadBE.Flag;

                        dta_consulta = new DataTable();

                        dta_consulta.Load(sql_comando.ExecuteReader());

                        return dta_consulta;

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            { dta_consulta.Dispose(); }
        }



       //RUTA
        public DataTable F_TCRuta_Select(TCConceptosDetCE objEntidadBE)
        {

            DataTable dta_consulta = null;

            try
            {

                using (SqlConnection sql_conexion = new SqlConnection())
                {

                    sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                    sql_conexion.Open();

                    using (SqlCommand sql_comando = new SqlCommand())
                    {

                        sql_comando.Connection = sql_conexion;
                        sql_comando.CommandType = CommandType.StoredProcedure;
                        sql_comando.CommandText = "PA_Ruta";

                        if (objEntidadBE.CodConcepto != 40)
                        sql_comando.Parameters.Add("@CodConcepto", SqlDbType.Int).Value = objEntidadBE.CodConcepto;

                        dta_consulta = new DataTable();

                        dta_consulta.Load(sql_comando.ExecuteReader());

                        return dta_consulta;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }

            finally
            { dta_consulta.Dispose(); }

        }
    }
}
