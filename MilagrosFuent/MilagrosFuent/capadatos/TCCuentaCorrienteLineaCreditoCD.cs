
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
    public class TCCuentaCorrienteLineaCreditoCD
    {
        public TCCuentaCorrienteCE F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(TCCuentaCorrienteCE objEntidadBE)
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
                        sql_comando.CommandText = "pa_TCCuentaCorriente_LineaCredito_Actualizar_Saldos";

                        sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;

                        SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                        MsgError.Direction = ParameterDirection.Output;

                        sql_comando.ExecuteNonQuery();

                        objEntidadBE.MsgError = MsgError.Value.ToString();


                        return objEntidadBE;

                    }

                }



            }
            catch (Exception ex)
            {

                throw ex;

            }
        }



        /// <summary>
        /// Actualizacion de Stocks Asincronos (producto por producto)
        /// </summary>
        /// <param name="objEntidadBE"></param>
        public TCCuentaCorrienteCE Async_F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(TCCuentaCorrienteCE objEntidadBE)
        {
            csAsync_F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos pAsync = new csAsync_F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos();
            pAsync.F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(objEntidadBE);
            return null;
        }
        private class csAsync_F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos
        {
            /// <summary>
            /// proceso de Actualizacion de stocks (producto por lotes)
            /// </summary>
            /// <param name="objEntidadBE"></param>
            public void F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(TCCuentaCorrienteCE objEntidadBE)
            {
                System.Threading.Thread thread = new System.Threading.Thread(() => F_TCCuentaCorriente_LineaCredito_Actualizar_Cliente_Local(objEntidadBE));
                thread.Start();
            }
            private void F_TCCuentaCorriente_LineaCredito_Actualizar_Cliente_Local(TCCuentaCorrienteCE objEntidadBE)
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
                            sql_comando.CommandText = "pa_TCCuentaCorriente_LineaCredito_Actualizar_Saldos";

                            sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;

                            SqlParameter MsgError = sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000);
                            MsgError.Direction = ParameterDirection.Output;

                            sql_comando.ExecuteNonQuery();

                            objEntidadBE.MsgError = MsgError.Value.ToString();
                        }
                    }

                    //si se ejecutó con normalidad
                    if (objEntidadBE.MsgError == "")
                    {
                        F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos_Azure(objEntidadBE);
                    }

                }
                catch (Exception ex)
                {

                }
            }

            private void F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos_Azure(TCCuentaCorrienteCE objEntidadBE)
            {
                string Etiqueta = ""; string MsgPers = "";
                try
                {
                    DataTable dtLineaCredito = pa_TCClientes_Actualizar_Saldos_Azure(objEntidadBE);
                    if (dtLineaCredito.Rows.Count > 0)
                    {
                        bool Conectado = false;
                        using (SqlConnection sql_conexion = new SqlConnection())
                        {
                            sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["AZURE"].ConnectionString;
                            try
                            {
                                sql_conexion.Open();
                                Conectado = true;
                            }
                            catch (Exception exc)
                            {
                                Etiqueta = "1"; MsgPers = "Conectandose: " + ConfigurationManager.ConnectionStrings["AZURE"].ConnectionString;
                                F_LGStockAlmacen_Logs_Sincronizaciones_Azure_insert("TCCuentaCorrienteLinaCreditoCD.pa_LineaCreditoClientes_Actualizar Etiqueta:" + Etiqueta + " " + MsgPers, "", exc.Message.ToString());
                            }

                            if (Conectado == true)
                                try
                                {
                                    using (SqlCommand sql_comando = new SqlCommand())
                                    {

                                        sql_comando.Connection = sql_conexion;
                                        sql_comando.CommandType = CommandType.StoredProcedure;
                                        sql_comando.CommandText = "pa_LineaCreditoClientes_Actualizar";

                                        SqlParameter myDataTable = sql_comando.Parameters.AddWithValue("@Clientes", dtLineaCredito);
                                        sql_comando.ExecuteNonQuery();

                                        //F_LGStockAlmacen_ActualizarFlag_Lotes(dtLineaCredito, 0);
                                    }
                                }
                                catch (Exception exx)
                                {
                                    Etiqueta = "4"; MsgPers = "";
                                    F_LGStockAlmacen_Logs_Sincronizaciones_Azure_insert("TCCuentaCorrienteLinaCreditoCD.pa_LineaCreditoClientes_Actualizar Etiqueta:" + Etiqueta + " " + MsgPers, "", exx.Message.ToString());
                                }
                        }
                    }

                }
                catch (Exception ex)
                {
                    Etiqueta = "5"; MsgPers = "";
                    F_LGStockAlmacen_Logs_Sincronizaciones_Azure_insert("TCCuentaCorrienteLinaCreditoCD.pa_LineaCreditoClientes_Actualizar Etiqueta:" + Etiqueta + " " + MsgPers, "", ex.Message.ToString());
                }
            }
            private DataTable pa_TCClientes_Actualizar_Saldos_Azure(TCCuentaCorrienteCE objEntidadBE)
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
                            sql_comando.CommandText = "pa_TCClientes_Actualizar_Saldos_Azure";

                            if (objEntidadBE.CodCtaCte > 0)
                                sql_comando.Parameters.Add("@CodCtaCte", SqlDbType.Int).Value = objEntidadBE.CodCtaCte;

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
            #region "oculto bloqueado"
            //private void F_LGStockAlmacen_ActualizarFlag_Lotes(DataTable dtStocks, int Flag)
            //{
            //    string Etiqueta = ""; string MsgPers = "";
            //    try
            //    {
            //        using (SqlConnection sql_conexion = new SqlConnection())
            //        {
            //            sql_conexion.ConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
            //            sql_conexion.Open();

            //            using (SqlCommand sql_comando = new SqlCommand())
            //            {

            //                sql_comando.Connection = sql_conexion;
            //                sql_comando.CommandType = CommandType.StoredProcedure;
            //                sql_comando.CommandText = "pa_LGStockAlmacen_ActualizarFlag_Lotes";

            //                SqlParameter myDataTable = sql_comando.Parameters.AddWithValue("@Stocks", dtStocks);
            //                sql_comando.Parameters.Add("@Flag", SqlDbType.Int).Value = Flag;

            //                sql_comando.ExecuteNonQuery();

            //            }
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        Etiqueta = "6"; MsgPers = "";
            //        F_LGStockAlmacen_Logs_Sincronizaciones_Azure_insert("TCCuentaCorrienteLinaCreditoCD.F_LGStockAlmacen_ActualizarFlag_Lotes Etiqueta:" + Etiqueta + " " + MsgPers, "", ex.Message.ToString());
            //    }
            //}
            #endregion

            private void F_LGStockAlmacen_Logs_Sincronizaciones_Azure_insert(string Procedimiento, string NroError, string MsgError)
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
                            sql_comando.CommandText = "pa_LGStockAlmacen_Logs_Sincronizaciones_Azure_insert";

                            sql_comando.Parameters.Add("@Procedimiento", SqlDbType.VarChar, 200).Value = Procedimiento;
                            sql_comando.Parameters.Add("@NroError", SqlDbType.VarChar, 200).Value = NroError;
                            sql_comando.Parameters.Add("@MsgError", SqlDbType.VarChar, 1000).Value = MsgError;

                            sql_comando.ExecuteNonQuery();

                        }
                    }
                }
                catch (Exception ex)
                {
                }
            }

        }


    }
}
