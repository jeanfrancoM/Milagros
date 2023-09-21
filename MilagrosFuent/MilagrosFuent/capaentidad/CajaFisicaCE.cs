using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class CajaFisicaCE
{
	public int CodCajaFisica {get ;set ; }
	public string Descripcion {get ;set ; }
    public int CodEstado { get; set; }
    public DateTime FechaRegistro { get; set; }
    public string IPRegistro { get; set; }


    public string XmlDetalle { get; set; }

    public int CodEmpresa { get; set; }

    public int CodAlmacen { get; set; }

    public int CodUsuario { get; set; }

    public int CodCuentaSoles { get; set; }

    public string NroSoles { get; set; }

    public decimal TotalSoles { get; set; }

    public int CodCuentaDolares { get; set; }

    public string NroDolares { get; set; }

    public decimal TotalDolares { get; set; }

    public DateTime FechaLiquidacion { get; set; }

    public string Observacion { get; set; }

    public string MsgError { get; set; }

    public int CodEmpleado { get; set; }


}




