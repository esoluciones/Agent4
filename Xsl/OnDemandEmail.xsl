<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="utf-8" />
  <xsl:template match="/">
    <script type="text/javascript">
      var formats = ["<xsl:value-of select="data/formatcodes/element/code"/>"]; 
    </script>
    <script type="text/javascript">
      var subjects = ["<xsl:value-of select="data/subjects/element/data"/>"];
    </script>
    <script type="text/javascript">
      var attachments = [<xsl:value-of select="data/attachments/element/data"/>];
    </script>
    <script type="text/javascript">
      var aditionalAttachments = [<xsl:value-of select="data/aditionalattachments/element/data"/>];
    </script>
    <div class="it_divgeneral" style="margin-top:0px;"></div>
    <div class="it_headertexto_ma" style="margin:20px 0px 0px 0px">
      Envio de información por Correo Electrónico del Cliente:
      <span>
        <xsl:value-of select="./data/info/CustomerName"/>
      </span>
    </div>
    <div>
      <input type="hidden" name="CustomerKey" id="CustomerKey" hidden="true">
        <xsl:attribute name="value">
          <xsl:value-of select="./data/info/CustomerKey"/>
        </xsl:attribute>
      </input>
    </div>
    <div>
      <input type="hidden" name="ProcessKey" id="ProcessKey" hidden="true">
        <xsl:attribute name="value">
          <xsl:value-of select="./data/info/ProcessKey"/>
        </xsl:attribute>
      </input>
    </div>
    <div>
      <input type="hidden" name="FormatCode" id="FormatCode" hidden="true"></input>
    </div>
    <div style="background-color: #efefef; width: 750px; height: 420px; text-align: left; margin: 10px 20px 10px 20px; padding-left:20px; padding-bottom:10px;" class="busquedaclass">
      <div style="clear:both; float:left; width:180px; margin:10px 0px 0px 0px;">Tipo de correos disponibles:</div>
      <div style="display: inline; float: left; width: 550px;">
        <select name="EmailType" id="EmailType" onChange="javascript:EmailType_onChange();" class="Combo_mp3" style="width:100%; margin:10px 0px 0px 0px;">
          <option value=""/>
          <xsl:for-each select="./data/formattypes/element">
            <option>
              <xsl:attribute name="value">
                <xsl:value-of select="./pkey"/>
              </xsl:attribute>
              <xsl:value-of select="./formatdescription"/>
            </option>
          </xsl:for-each>
        </select>
      </div>
      <div style="clear:both; float: left; width:180px; margin:10px 0px 0px 0px;">
        Adjuntos a enviar:
      </div>
      <div style="display: inline; float: left; width:550px;height:60px;">
        <select name="AttachmentsToSend" id="AttachmentsToSend" multiple="multiple" onClick="javascript:AttachmentsToSend_onClick();" class="Combo_mp3" size="3" scrolling="auto" style="width:100%; margin:10px 0px 0px 0px;">
        </select>
      </div>
      <div style="clear:both; float:left; width:180px; margin:10px 0px 0px 0px;">
        Adjuntos adicionales a enviar<br/>(Ctrl + Click para selección múltiple)
      </div>
      <div style="display:inline; float:left; width:550px;height:60px;">
        <select name="AditionalAttachments" id="AditionalAttachments" multiple="multiple" class="Combo_mp3" size="3" scrolling="auto" style="overflow:hidden; width:100%; margin:10px 0px 0px 0px;">
        </select>
      </div>
      <div style="clear:both;float:left;width:100%;">
        <hr style="color:red;height:0.5px;width:100%; margin:10px 20px 0px 0px;"></hr>
      </div>
      <div style="clear:both; float: left; width: 180px; margin:10px 0px 0px 0px;">
        Para:
      </div>
      <div style="display:inline; float:left; width:550px;">
        <input name="SendTo" type="text" id="SendTo" class="riTextBox_bs" style="width:100%; margin:10px 0px 0px 0px;">
          <xsl:attribute name="value">
            <xsl:value-of select="./data/info/CustomerEmail"/>
          </xsl:attribute>
        </input>
      </div>
      <div style="clear:both; float: left; width: 180px; margin:10px 0px 0px 0px;">
        Asunto:
      </div>
      <div style="display: inline; float: left; width: 550px;">
        <input name="Subject" type="text" id="Subject" class="riTextBox_bs" style="width:100%; margin:10px 0px 0px 0px;">
        </input>
      </div>
      <div style="clear:both; float: left; width: 180px; margin:10px 0px 0px 0px;">
        Texto del mensaje:
      </div>
      <div style="display: inline; float: left; width: 550px; height:190px;">
        <textarea name="TextMessage" wrap="hard" id="TextMessage" cols="5" rows="11" class="riTextBox_bs" style="width:100%; height:100%; margin:10px 0px 0px 0px;"></textarea>
      </div>
    </div>
  </xsl:template>
</xsl:stylesheet>