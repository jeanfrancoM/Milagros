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
    public class CajaFisicaCD
    {

        public CajaFisicaCE F_Liquidacion_Insert(CajaFisicaCE objEntidad)
        {
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
                        sql_comando.CommandText = "pa_Liquidacion_Insert";

                        sql_comando.Parameters.Add("@XmlDetalle", SqlDbType.Text).Value = objEntidad.XmlDetalle;
                        sql_comando.Parameters.Add("@CodUsuario", SqlDbType.Int).Value = objEntidad.CodUsuario;
                        sql_comando.Parameters.Add("@CodCuentaSoles", SqlDbType.Int).Value = objEntidad.CodCuentaSoles;
                        sql_comando.Parameters.Add("@NroSoles", SqlDbType.VarChar, 18).Value = objEntidad.NroSoles;
                        sql_comando.Parameters.Add("@TotalSoles", SqlDbType.Decimal).Value = objEntidad.TotalSoles;
                        sql_comando.Parameters.Add("@CodCuentaDolares", SqlDbType.Int).Value = objEntidad.CodCuentaDolares;
                        sql_comando.Parameters.Add("@CodEmpleado", SqlDbType.Int).Value = objEntidad.CodEmpleado;
                        sql_comando.Parameters.Add("@NroDolares", SqlDbType.VarChar, 18).Value = objEntidad.NroDolares;
                        sql_comando.Parameters.Add("@TotalDolares", SqlDbType.Decimal).Value = objEntidad.TotalDolares;
                        sql_comando.Parameters.Add("@Observacion", SqlDbType.VarChar, 1000).Value = objEntidad.Observacion;
                        sql_comando.Parameters.Add("@FechaLiquidacion", SqlDbType.DateTime).Value = objEntidad.FechaLiquidacion;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidad.MsgError = MsgError.Value.ToString();

                        return objEntidad;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataTable F_CajaFisica_Listar(int CodEstado, int CodAlmacen, int CodEmpresa)
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
                        sql_comando.CommandText = "pa_CajaFisica_Listar";

                        if (CodEstado > 0)
                            sql_comando.Parameters.Add("@CodEstado", SqlDbType.Int).Value = CodEstado;

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

            finally { dta_consulta.Dispose(); }

        }

    }
}
