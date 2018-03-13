<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" version="1.0" encoding="utf-8" />

  <xsl:template match="/">
    <xsl:if test="$entidad='SI'">
      <input type="hidden" name="entidadkey">
        <xsl:attribute name="value"><xsl:value-of select="$entidadkey"/></xsl:attribute>
      </input>
    </xsl:if>
    <input type="hidden" name="numerocampos">
      <xsl:attribute name="value"><xsl:value-of select="count(//columna)"/></xsl:attribute>
    </input>
    <input type="hidden" name="numerofilas">
      <xsl:attribute name="value"><xsl:value-of select="count(datos/filas/fila)"/></xsl:attribute>
    </input>
    <input type="hidden" name="desde" value=""/>
    <input type="hidden" name="cantidad" value=""/>
    <div style="position: relative; top: 5px; left: 5px; width: 99%; height: 390px; overflow: auto;">
      <table class="scrollTableContainer" border="0" cellspacing="0" cellpadding="0" width="100%" align="center">
        <xsl:call-template name="columnas"/>
        <xsl:call-template name="filas"/>
      </table>
    </div>
    <br/>
    <center>
      <xsl:call-template name="links"/>
      <br/>
      <table>
        <tr>
          <xsl:if test="$entidad='SI'">
            <td>
              <a id="agregar" class="ovalbutton" href="javascript:agregarEntidad();">
                <span>Agregar</span>
              </a>
            </td>
          </xsl:if>
          <td>
            <a id="imprimir" class="ovalbutton" href="javascript:imprimirSql();">
              <span>Imprimir</span>
            </a>
          </td>
          <td>
            <a id="cerrar" class="ovalbutton" href="javascript:self.close();">
              <span>Cerrar</span>
            </a>
          </td>
        </tr>
      </table>
    </center>
  </xsl:template>

  <xsl:template name="columnas">
    <tr height="23">
      <xsl:if test="$entidad='SI'">
        <td width="10%" height="23" class="td_header_html">
          <font face="Verdana, Arial, Helvetica, sans-serif" size="1" color="#000000">
            <b>Agregar</b>
          </font>
        </td>
      </xsl:if>
      <xsl:for-each select="//columna">
        <td height="23" class="td_header_html">
          <xsl:if test="$entidad='SI'">
            <input type="hidden">
              <xsl:attribute name="name">Campo<xsl:value-of select="position()"/></xsl:attribute>
              <xsl:attribute name="value"><xsl:value-of select="campo"/></xsl:attribute>
            </input>
          </xsl:if>
          <b>
            <font face="Verdana, Arial, Helvetica, sans-serif" size="1" color="#000000">
              <xsl:value-of disable-output-escaping="yes" select="header"/>
            </font>
          </b>
        </td>
      </xsl:for-each>
    </tr>
  </xsl:template>

  <xsl:template name="filas">
    <xsl:for-each select="datos/filas/fila">
      <xsl:variable name="positionX">
        <xsl:value-of select="position()"/>
      </xsl:variable>
      <tr>
        <xsl:if test="$entidad='SI'">
          <td class="cells_html">
            <input type="Checkbox" value="SI" >
              <xsl:attribute name="name">Opcion<xsl:value-of select="position()"/></xsl:attribute>
            </input>
          </td>
        </xsl:if>
        <xsl:for-each select="./*">
          <td valign="middle" class="cells_html" height="20">
            <font face="Verdana, Arial, Helvetica, sans-serif" size="1" color="#000000">
              <xsl:choose>
                <xsl:when test="normalize-space(concat(name(./*),.))!=''">
                  <valor><xsl:value-of disable-output-escaping="yes" select="."/></valor>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                </xsl:otherwise>
              </xsl:choose>
            </font>
            <input type="hidden">
              <xsl:attribute name="name">Fila<xsl:value-of select="$positionX"/>-<xsl:value-of select="position()"/></xsl:attribute>
              <xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute>
            </input>
          </td>
        </xsl:for-each>
      </tr>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="links">
    <xsl:if test="count(//datos/links/link)>1">
      <xsl:variable name="pos_activo">
        <xsl:value-of select="//datos/links/posicion"/>
      </xsl:variable>
      <xsl:variable name="cantidad">
        <xsl:value-of select="//datos/links/link/@cantidad[1]"/>
      </xsl:variable>
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <a id="firstPage" class="ovalbutton">
              <xsl:attribute name="href">javascript:changePage(pantalla.cmbPage.options[0].value,'<xsl:value-of select="$cantidad"/>')</xsl:attribute>
              <span>&lt;&lt;</span>
            </a>
          </td>
          <td>
            <a id="previousPage" class="ovalbutton">
              <xsl:attribute name="href">javascript:changePage(pantalla.cmbPage.options[(pantalla.cmbPage.selectedIndex &gt; 0)?pantalla.cmbPage.selectedIndex - 1:0].value,'<xsl:value-of select="$cantidad"/>')</xsl:attribute>
              <span>&lt;</span>
            </a>
          </td>
          <td>
            <select id="cmbPage">
              <xsl:attribute name="onchange">changePage(pantalla.cmbPage.value,'<xsl:value-of select="$cantidad"/>')</xsl:attribute>
              <xsl:for-each select="//datos/links/link">
                <option>
                  <xsl:variable name="pos">
                    <xsl:value-of select="."/>
                  </xsl:variable>
                  <xsl:if test="$pos_activo=$pos">
                    <xsl:attribute name="selected">selected</xsl:attribute>
                  </xsl:if>
                  <xsl:attribute name="value"><xsl:value-of select="./@desde"/></xsl:attribute>
                  <xsl:value-of select="."/>
                </option>
              </xsl:for-each>
            </select>
          </td>
          <td style="padding-left: 4px;">
            <a id="nextPage" class="ovalbutton">
              <xsl:attribute name="href">javascript:changePage(pantalla.cmbPage.options[(pantalla.cmbPage.selectedIndex &lt; (pantalla.cmbPage.options.length -1))?pantalla.cmbPage.selectedIndex + 1:pantalla.cmbPage.options.length - 1].value,'<xsl:value-of select="$cantidad"/>')</xsl:attribute>
              <span>&gt;</span>
            </a>
          </td>
          <td>
            <a id="lastPage" class="ovalbutton">
              <xsl:attribute name="href">javascript:changePage(pantalla.cmbPage.options[pantalla.cmbPage.options.length - 1].value,'<xsl:value-of select="$cantidad"/>')</xsl:attribute>
              <span>&gt;&gt;</span>
            </a>
          </td>
        </tr>
      </table>
    </xsl:if>
  </xsl:template>

  <xsl:variable name="entidad"/>
  <xsl:variable name="entidadkey"/>

</xsl:stylesheet>
