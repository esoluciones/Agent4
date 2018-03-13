<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" version="1.0" encoding="utf-8"/>

  <xsl:template match="/">
    <xsl:call-template name="addInputs"/>
    <div align="center">
      <table border="0" cellspacing="0" cellpadding="0" align="center" width="650">
        <tr>
          <td height="30"></td>
        </tr>
        <tr>
          <td>
            <table border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td>
                  <xsl:call-template name="cierre_atencion"/>
                </td>
              </tr>
              <tr>
                <td>
                  <xsl:call-template name="prog_atencion"/>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td height="50" align="center" class="td_button" width="100%">
            <div align="center" style="width:100px; text-align:center;">
              <a id="lnkBuscar" runat="server" class="ovalbutton" onclick="env_closeAtt()" style="cursor:pointer; text-align:center;">
                <span>Aceptar > </span>
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

  <xsl:template name="cierre_atencion">
    <table width="100%" border="0" cellspacing="0" height="0" cellpadding="5">
      <tr>
        <td class="titleCloseAtt" colspan="2">
          <b>
            Cierre de la Actividad <xsl:value-of select="//Info/CallTypeDesc"/><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>(Nro. <xsl:value-of select="//Info/JobSeq"/>)
          </b>
        </td>
      </tr>
      <tr>
        <td class="titulo" colspan="2">
          <b>Nombre del Cliente:</b>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
          <xsl:value-of select="//Info/CustName"/>
        </td>
      </tr>
      <tr valign="middle">
        <td width="50%" align="left">
          <xsl:if test="not(//OpenedStates/OpenedState)">
            <xsl:attribute name="style">visibility:hidden;</xsl:attribute>
          </xsl:if>
          <input type="radio" name="opcion" value="opened" onClick="habilitar('opened');chgOpenCombo()"/>
          <font class="titulo">
            <b>Abierto</b>
          </font>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
          <select name="openedCombo" size="1" disabled="disabled">
            <option value=""></option>
            <xsl:for-each select="//OpenedStates/OpenedState">
              <xsl:sort select="./OStateDesc" />
              <option>
                <xsl:attribute name="value"><xsl:value-of select="./OStateCode"/></xsl:attribute>
                <xsl:value-of select="./OStateDesc"/>
              </option>
            </xsl:for-each>
          </select>
        </td>
        <td width="50%" align="right">
          <xsl:if test="not(//ClosedStates/ClosedState)">
            <xsl:attribute name="style">visibility:hidden;</xsl:attribute>
          </xsl:if>
          <input type="radio" name="opcion" value="closed" onClick="habilitar('closed')"/>
          <font class="titulo">
            <b>Cerrado</b>
          </font>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
          <select name="closedCombo" size="1" disabled="disabled" onchange="chgClosedCombo()">
            <option value=""></option>
            <xsl:for-each select="//ClosedStates/ClosedState">
              <xsl:sort select="./CStateDesc" />
              <option>
                <xsl:attribute name="value"><xsl:value-of select="./CStateCode"/></xsl:attribute>
                <xsl:value-of select="./CStateDesc"/>
              </option>
            </xsl:for-each>
          </select>
        </td>
      </tr>
      <tr valign="middle" height="32px">
        <td width="50%" ></td>
        <td width="50%" align="right">
          <div id="causa" style="display: none;">
            <font class="titulo">
              <b>Causa</b>
            </font>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;</xsl:text>
            <select name="causeNoContact" size="1" disabled="disabled">
              <option value=""></option>
              <xsl:for-each select="//NotContactReasons/NotContactReason">
                <option>
                  <xsl:attribute name="value"><xsl:value-of select="./NCCode"/></xsl:attribute>
                  <xsl:value-of select="./NCDesc"/>
                </option>
              </xsl:for-each>
            </select>
          </div>
        </td>
      </tr>
      <tr>
        <td bgcolor="#EEEEEE" height="140" align="center" colspan="2">
          <table>
            <tr>
              <td width="100" class="td_titulo" valign="top">
                <font class="titulo">
                  <b>
                    Comentarios:<br/>
                  </b>
                </font>
                <br/>
              </td>
              <td>
                <textarea cols="80" rows="6" name="comentario" class="areaTexto" onKeyDown="return cancelEnter();"></textarea>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </xsl:template>
  
  <xsl:template name="prog_atencion">
    <div id="prog_atencion" style="display:none;">
      <table width="100%" border="0" cellspacing="0" cellpadding="2" class="td_1">
        <tr valign="middle">
          <td width="10%" align="left">
          </td>
          <td align="center">
            <font class="letra_1">
              Tel&#233;fono:
              <input type="text" id="telefono" name="telefono" size="50" style="width:150px;">
                <xsl:attribute name="value"><xsl:value-of select="//Info/CustPhone"/></xsl:attribute>
              </input>
              <xsl:if test="(//Info/catPkey != '') and (//Info/spCode != '')">
                <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                <img src="./../../HTMLControls/images/search.gif" style="cursor:hand;">
                  <xsl:attribute name="onclick">
                    showCat('procedure','<xsl:value-of select="//Info/catPkey" />','','<xsl:value-of select="//Info/spCode"/>','','telefono',false);
                  </xsl:attribute>
                </img>
              </xsl:if>
            </font>
          </td>
          <td id="Fecha" align="center" style="width:120px;">
            <font class="letra_1">
              Fecha:
              <input type="Text" name="fec_prog" id="fec_prog" size="8" maxlength="10" readonly="readonly">
                <xsl:attribute name="value">
                  <xsl:value-of select="format-number(//DatosTiempo/Fecha/Dia,'00')"/>/<xsl:value-of select="format-number(//DatosTiempo/Fecha/Mes,'00')"/>/<xsl:value-of select="//DatosTiempo/Fecha/Ano"/>
                </xsl:attribute>
              </input>
            </font>
          </td>
          <td id="Calendario">
            <a href="javascript:void(0)" onclick="if(self.gfPop)gfPop.fPopCalendar(document.pantalla.fec_prog);return false;">
              <img class="PopcalTrigger" align="middle" src="./../../HTMLControls/images/calendar.gif" border="0" alt=""></img>
            </a>
          </td>
          <td id="Hora" align="center">
            <font class="letra_1">
              Hora:
              <input type="Text" name="hora_prog" id="hora_prog" maxlength="5" size="4" style="text-align:center;">
                <xsl:attribute name="value"><xsl:value-of select="//DatosTiempo/Hora"/></xsl:attribute>
              </input>
            </font>
          </td>
          <td width="15%" align="right">
          </td>
        </tr>
      </table>
      <table width="100%" border="0" cellspacing="0" cellpadding="5" class="td_1">
        <tr>
          <td width="49%" height="16">
            <input type="radio" name="tipoProg" value="PROGRAMAR" checked="checked" onclick="dis_prg_agent();asignarTipo('PROGRAMAR');toggleT('Fecha','s');toggleT('Calendario','s');toggleT('Hora','s');"/>
            <font class="letra_2">
              Programar
            </font>
          </td>
        </tr>
        <tr>
          <td width="49%" height="16">
            <input type="radio" name="tipoProg" value="AGENDAR" onclick="dis_prg_agent();asignarTipo('NOPROGRAMAR');toggleT('Fecha','h');toggleT('Calendario','h');toggleT('Hora','h');"/>
            <font class="letra_2">
              No Programar
            </font>
          </td>
        </tr>
        <tr>
          <td width="49%" height="16">
            <input type="radio" name="tipoProg" value="PROGRAMARGRUPO" onclick="dis_prg_agent();asignarTipo('PROGRAMARGRUPO');toggleT('Fecha','s');toggleT('Calendario','s');toggleT('Hora','s');"/>
            <font class="letra_2">
              Programar a la Unidad
            </font>
          </td>
        </tr>
        <tr>
          <td width="49%" height="16">
            <input type="radio" name="tipoProg" value="PROGRAMAROTRO" onclick="en_prg_agent();asignarTipo('PROGRAMARAGENTE');toggleT('Fecha','s');toggleT('Hora','s');"/>
            <font class="letra_2">
              Programar a Otro Usuario
            </font>
            <select name="agentes" size="1" disabled="disabled">
              <option value=""/>
              <xsl:for-each select="//Agentes/Agente">
                <option>
                  <xsl:attribute name="value"><xsl:value-of select="./USER_ID"/></xsl:attribute>
                  <xsl:value-of select="./USER_NAME"/>
                </option>
              </xsl:for-each>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <br/>
          </td>
        </tr>
      </table>
    </div>
  </xsl:template>

</xsl:stylesheet>

