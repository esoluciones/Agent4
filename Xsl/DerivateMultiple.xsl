<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" version="1.0" encoding="utf-8"/>

  <xsl:template match="/">
    <xsl:if test="./MultipleInstances = 'True'">
      <input type="Hidden">
        <xsl:attribute name="name">UnitsCount<xsl:value-of select="./AttNumber"/></xsl:attribute>
        <xsl:attribute name="id">UnitsCount<xsl:value-of select="./AttNumber"/></xsl:attribute>
        <xsl:attribute name="value"><xsl:value-of select="count(./Unit)"/></xsl:attribute>
      </input>
    </xsl:if>
    <input type="Hidden">
      <xsl:attribute name="name">MultipleInstances<xsl:value-of select="./AttNumber"/></xsl:attribute>
      <xsl:attribute name="id">MultipleInstances<xsl:value-of select="./AttNumber"/></xsl:attribute>
      <xsl:attribute name="value"><xsl:value-of select="./MultipleInstances"/></xsl:attribute>
    </input>
    <input type="Hidden" name="numero_atenciones" id="numero_atenciones">
      <xsl:attribute name="value"><xsl:value-of select="count(//Derivate/Att)"/></xsl:attribute>
    </input>
    <xsl:call-template name="addInputs"/>
    <div align="center">
      <table border="0" cellspacing="0" cellpadding="0" align="center" width="100">
        <tr>
          <td height="30"></td>
        </tr>
        <tr>
          <td>
            <table width="100%" cellspacing="0" align="center" cellpadding="0" >
              <tr>
                <td width="100%" colspan="2">
                  <xsl:call-template name="titles"/>
                </td>
              </tr>
              <tr>
                <td class="td_1" width="50%">
                  <xsl:call-template name="listAtt"/>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td height="50" align="center"  class="td_button" width="100%">
            <div align="center" style="width:100px; text-align:center;">
              <a id="lnkBuscar" runat="server" class="ovalbutton" onclick="derivar()" style="cursor:pointer; text-align:center;">
                <span>Continuar > </span>
              </a>
            </div>
          </td>
        </tr>
      </table>
      <input type="Hidden" name="Dummy" id="Dummy" value="Dummy"/>
    </div>
  </xsl:template>

  <xsl:template name="addInputs">
    <xsl:for-each select="//Inputs/input">
      <input type="hidden">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
        <xsl:attribute name="id"><xsl:value-of select="@name"/></xsl:attribute>
        <xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
      </input>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="titles">
    <table width="317px" border="0">
      <tr>
        <td class="titleCloseAtt">
          <b>
            Derivaci&#243;n del Proceso<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>(Nro. <xsl:value-of select="//Info/JobSeq"/>)
          </b>
        </td>
      </tr>
      <tr>
        <td class="titulo">
          <b>Nombre del cliente:</b>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
          <xsl:value-of select="//Info/CustName"/>
        </td>
      </tr>
    </table>
  </xsl:template>

  <xsl:template name="listAtt">
    <table border="0" align="center">
      <tr align="center">
        <td></td>
        <td class="letra_3">Unidad</td>
        <td class="letra_3">Agente</td>
        <td class="letra_3">Acci&#243;n</td>
        <td class="letra_3">Comentario</td>
        <td class="letra_3">Tel&#233;fono</td>
        <td class="letra_3">Fecha Prog.</td>
        <td class="letra_3">Hora Prog.</td>
      </tr>
      <xsl:for-each select="//Derivate/Att">
        <tr>
          <td class="letra_2">
            <b>Derivando a:</b>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
            <xsl:value-of select="./AttDesc"/>
          </td>
        </tr>
        <xsl:if test="./MultipleInstances = 'True'">
          <xsl:call-template name="MultipleInstances"/>
        </xsl:if>
        <xsl:if test="./MultipleInstances = 'False'">
          <xsl:call-template name="SingleInstance"/>
        </xsl:if>
      </xsl:for-each>
    </table>
  </xsl:template>

  <xsl:template name="MultipleInstances">
    <xsl:for-each select="./Unit">
      <xsl:variable name="attrName">
        <xsl:value-of select="./UnitAttNumber"/><xsl:value-of select="position()"/>
      </xsl:variable>
      <xsl:variable name="attrSuffix">
        <xsl:value-of select="./UnitAttCode"/><xsl:value-of select="$attrName"/>
      </xsl:variable>
      <tr>
        <td>
          <input type="Hidden">
            <xsl:attribute name="name">attCode<xsl:value-of select="$attrName"/></xsl:attribute>
            <xsl:attribute name="id">attCode<xsl:value-of select="$attrName"/></xsl:attribute>
            <xsl:attribute name="value"><xsl:value-of select="./UnitAttCode"/></xsl:attribute>
          </input>
          <input type="Checkbox" value="True">
            <xsl:attribute name="name">att<xsl:value-of select="$attrName"/></xsl:attribute>
            <xsl:attribute name="id">att<xsl:value-of select="$attrName"/></xsl:attribute>
          </input>
        </td>
        <td>
          <select type="Text" class="input_text">
            <xsl:attribute name="name">tGrupo<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">tGrupo<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="onchange">change('eng'+'<xsl:value-of select="./UnitAttCode"/>'+document.pantalla.tGrupo<xsl:value-of select="$attrSuffix"/>.value,document.pantalla.tAgente<xsl:value-of select="$attrSuffix"/>,document.pantalla)</xsl:attribute>
            <option value=""/>
            <option>
              <xsl:attribute name="value"><xsl:value-of select="./UnitCode"/></xsl:attribute>
              <xsl:value-of select="./UnitDesc"/>
            </option>
          </select>
        </td>
        <td>
          <select disabled="True" class="input_text">
            <xsl:attribute name="name">tAgente<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">tAgente<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          </select>
        </td>
        <td>
          <select class="input_text">
            <xsl:attribute name="name">tProg<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">tProg<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="onchange">selectAccion(this.value,document.pantalla.fecha<xsl:value-of select="$attrSuffix"/>,document.pantalla.fechaOld<xsl:value-of select="$attrSuffix"/>,document.pantalla.hora<xsl:value-of select="$attrSuffix"/>,document.pantalla.horaOld<xsl:value-of select="$attrSuffix"/>,'calendar<xsl:value-of select="$attrSuffix"/>')</xsl:attribute>
            <option value="AGENDADO">Agendar</option>
            <option value="SI">Programar</option>
          </select>
        </td>
        <td>
          <input type="Text" size="20" maxlength="150" class="input_text">
            <xsl:attribute name="name">comentario<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          </input>
        </td>
        <td>
          <input type="Text" size="8" class="input_text">
            <xsl:attribute name="name">phone<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">phone<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          </input>
        </td>
        <td>
          <input type="Hidden">
            <xsl:attribute name="name">fechaOld<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">fechaOld<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          </input>
          <input type="Text" size="11" readonly="true" class="input_text">
            <xsl:attribute name="name">fecha<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">fecha<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          </input>
          <a href="javascript:void(0)">
            <xsl:attribute name="onClick">if(self.gfPop)gfPop.fPopCalendar(document.pantalla.fecha<xsl:value-of select="$attrSuffix"/>);return false;</xsl:attribute>
            <img disabled="true" class="PopcalTrigger" align="absmiddle" src="./../../HTMLControls/images/calendar.gif" border="0" alt="">
              <xsl:attribute name="name">calendar<xsl:value-of select="$attrSuffix"/></xsl:attribute>
              <xsl:attribute name="id">calendar<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            </img>
          </a>
        </td>
        <td valign="middle">
          <input type="Hidden">
            <xsl:attribute name="name">horaOld<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">horaOld<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          </input>
          <input type="Text" size="8" readonly="true" class="input_text">
            <xsl:attribute name="name">hora<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">hora<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          </input>
        </td>
      </tr>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="SingleInstance">
    <xsl:variable name="attrName">
      <xsl:value-of select="./AttNumber"/>
    </xsl:variable>
    <xsl:variable name="attrSuffix">
      <xsl:value-of select="./AttCode"/><xsl:value-of select="$attrName"/>
    </xsl:variable>
    <tr>
      <td>
        <input type="Hidden">
          <xsl:attribute name="name">attCode<xsl:value-of select="$attrName"/></xsl:attribute>
          <xsl:attribute name="id">attCode<xsl:value-of select="$attrName"/></xsl:attribute>
          <xsl:attribute name="value"><xsl:value-of select="./AttCode"/></xsl:attribute>
        </input>
        <input type="Checkbox" value="True">
          <xsl:attribute name="name">att<xsl:value-of select="$attrName"/></xsl:attribute>
          <xsl:attribute name="id">att<xsl:value-of select="$attrName"/></xsl:attribute>
        </input>
      </td>
      <td>
        <select type="Text" class="input_text">
          <xsl:attribute name="name">tGrupo<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">tGrupo<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="onchange">change('eng'+'<xsl:value-of select="./AttCode"/>'+document.pantalla.tGrupo<xsl:value-of select="$attrSuffix"/>.value,document.pantalla.tAgente<xsl:value-of select="$attrSuffix"/>,document.pantalla)</xsl:attribute>
          <option value=""/>
          <xsl:for-each select="./Unit">
            <option>
              <xsl:attribute name="value"><xsl:value-of select="./UnitCode"/></xsl:attribute>
              <xsl:value-of select="./UnitDesc"/>
            </option>
          </xsl:for-each>
        </select>
      </td>
      <td>
        <select disabled="True" class="input_text">
          <xsl:attribute name="name">tAgente<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">tAgente<xsl:value-of select="$attrSuffix"/></xsl:attribute>
        </select>
      </td>
      <td>
        <select class="input_text">
          <xsl:attribute name="name">tProg<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">tProg<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="onchange">selectAccion(this.value,document.pantalla.fecha<xsl:value-of select="$attrSuffix"/>,document.pantalla.fechaOld<xsl:value-of select="$attrSuffix"/>,document.pantalla.hora<xsl:value-of select="$attrSuffix"/>,document.pantalla.horaOld<xsl:value-of select="$attrSuffix"/>,'calendar<xsl:value-of select="$attrSuffix"/>')</xsl:attribute>
          <option value="AGENDADO">Agendar</option>
          <option value="SI">Programar</option>
        </select>
      </td>
      <td>
        <input type="Text" size="20" maxlength="150" class="input_text">
          <xsl:attribute name="name">comentario<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">comentario<xsl:value-of select="$attrSuffix"/></xsl:attribute>
        </input>
      </td>
      <td>
        <input type="Text" size="8" class="input_text">
          <xsl:attribute name="name">phone<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">phone<xsl:value-of select="$attrSuffix"/></xsl:attribute>
        </input>
      </td>
      <td>
        <input type="Hidden">
          <xsl:attribute name="name">fechaOld<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">fechaOld<xsl:value-of select="$attrSuffix"/></xsl:attribute>
        </input>
        <input type="Text" size="11" readonly="true" class="input_text">
          <xsl:attribute name="name">fecha<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">fecha<xsl:value-of select="$attrSuffix"/></xsl:attribute>
        </input>
        <a href="javascript:void(0)">
          <xsl:attribute name="onClick">if(self.gfPop)gfPop.fPopCalendar(document.pantalla.fecha<xsl:value-of select="$attrSuffix"/>);return false;</xsl:attribute>
          <img disabled="true" class="PopcalTrigger" align="absmiddle" src="./../../HTMLControls/images/calendar.gif" width="34" height="22" border="0" alt="">
            <xsl:attribute name="name">calendar<xsl:value-of select="$attrSuffix"/></xsl:attribute>
            <xsl:attribute name="id">calendar<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          </img>
        </a>
      </td>
      <td valign="middle">
        <input type="Hidden">
          <xsl:attribute name="name">horaOld<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">horaOld<xsl:value-of select="$attrSuffix"/></xsl:attribute>
        </input>
        <input class="input_text" type="Text" size="8" readonly="true">
          <xsl:attribute name="name">hora<xsl:value-of select="$attrSuffix"/></xsl:attribute>
          <xsl:attribute name="id">hora<xsl:value-of select="$attrSuffix"/></xsl:attribute>
        </input>
      </td>
    </tr>
  </xsl:template>

</xsl:stylesheet>

