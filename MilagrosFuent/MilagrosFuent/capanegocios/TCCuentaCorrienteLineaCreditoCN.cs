using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using CapaEntidad;
using System.Data;

namespace CapaNegocios
{

    public class TCCuentaCorrienteLineaCreditoCN
    {
        TCCuentaCorrienteLineaCreditoCD obj = new TCCuentaCorrienteLineaCreditoCD();

        public TCCuentaCorrienteCE F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public TCCuentaCorrienteCE Async_F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(TCCuentaCorrienteCE objEntidadBE)
        {

            try
            {

                return obj.Async_F_TCCuentaCorriente_LineaCredito_Actualizar_Saldos(objEntidadBE);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}
