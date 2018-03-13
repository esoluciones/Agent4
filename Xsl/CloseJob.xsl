<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" version="1.0" encoding="utf-8"/>

  <xsl:template match="/">
    <xsl:call-template name="addInputs"/>
    <div align="center">
      <table border="0" cellspacing="0" cellpadding="0" align="center" width="500">
        <tr>
          <td height="30"></td>
        </tr>
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0" width="100%" align="center" >
              <tr>
                <td>
                  <xsl:call-template name="cierre_proceso"/>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td height="50" align="center"  class="td_button" width="100%">
            <div align="center" style="width:100px; text-align:center;">
              <a id="lnkBuscar" runat="server" class="ovalbutton" onclick="CloseJob()" style="cursor:pointer; text-align:center;">
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
      <input type="hidden" >
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
        <xsl:attribute name="id"><xsl:value-of select="@name"/></xsl:attribute>
        <xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
      </input>
    </xsl:for-each>
  </xsl:template>
  
  <xsl:template name="cierre_proceso">
    <table width="100%" border="0" cellspacing="0" align="center" height="0" cellpadding="5">
      <tr bgcolor="#EEEEEE">
        <td align="left" class="titleCloseAtt">
          <b>
            Cierre del Proceso <br /><xsl:value-of select="//Info/JobTypeDesc"/><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>(Nro. <xsl:value-of select="//Info/JobSeq"/>)
          </b>
        </td>
      </tr>
      <tr bgcolor="#EEEEEE">
        <td class="letra_2">
          <b>
            <xsl:value-of select="//Info/CustName"/>
          </b>
        </td>
      </tr>
      <tr bgcolor="#EEEEEE">
        <td align="center" class="letra_2">
          <span style="padding-right:10px">Estado</span>
          <select name="estado" size="1" style="width:170px">
            <option value=""></option>
            <xsl:for-each select="//ResultCode">
              <option>
                <xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute>
                <xsl:value-of select="."/>
              </option>
            </xsl:for-each>
          </select>
        </td>
      </tr>
    </table>
  </xsl:template>

</xsl:stylesheet>

