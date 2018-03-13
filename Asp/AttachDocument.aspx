<%@ Page Language="VB" AutoEventWireup="false" Inherits="EngageWebLibrary.clsAttachDocument" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script language="javascript" type="text/javascript" src="../../Global.js"></script>
    <script language="javascript" type="text/javascript" src="../js/SharedFunctions.js"></script>
    <script language="javascript" type="text/javascript" src="../Js/AttachDocument.js"></script>
    <link href="../../HTMLControls/images/LogoEngageBlanco.ico" rel="SHORTCUT ICON" />
    <link href="../../HTMLControls/telerik/Skins/Default/Upload.Default.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .RadUpload_Default .ruFakeInput
        {
	        padding: 0px;
	        background: #fff;
	        color: #000;
	        font-family: Tahoma, Helvetica, Sans-Serif;
	        font-size: 13px;
       		border: solid 1px #c0c0c0;
	        text-align: left;
	        float: left;
	        display: inline;
	        clear: right;
	        margin-left: 0px;
        	height: 19px;
        	width: 210px;
        }
        .RadUpload_Default .ruFakeInput:hover
        {
	        border-color: #b93737;
        }
        .RadUpload_Default .ruButton
        {
	        font-family: Tahoma, Helvetica, Sans-Serif;
	        font-size: 13px;
        	margin-left : 10px;
            height: 19px;
            width: 80px;
        }
    </style> 
</head>
<body style="background-color: #ffffff">
    <form id="frmAttachment" runat="server">
    <asp:ScriptManager ID="smAttachment" runat="server" />
    <telerik:RadWindowManager ID="AttachDocumentAlerts" runat="server"></telerik:RadWindowManager>
    <script type="text/javascript" language="javascript">
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
    </script>
    <telerik:RadProgressManager id="prgmgrUpload" runat="server" 
        SkinID="AttachDocuments" EnableViewState="False" 
        EnableEmbeddedBaseStylesheet="False" EnableEmbeddedSkins="False"
        OnClientSubmitting="OnClientSubmitting"
        OnClientProgressUpdating="OnClientProgressUpdating" />
    <div id="divUploadData" class="FilterMenu" style="height: 90px; width: 510px; margin-top:15px;">
        <div class="busquedaclass" align="left" style="padding-left: 20px">
            <div class="FilterElement" style="height:20px;">
                <div class="FilterElementTitle">Documento a Adjuntar:</div>    
                <telerik:RadUpload ID="rduAttach" runat="server" MaxFileInputsCount="1" style="float:left;"
                    ControlObjectsVisibility="None" EnableEmbeddedSkins="False" Width="320px"
                    EnableViewState="False" InputSize="50" Height="19px" ReadOnlyFileInputs="True" >
                    <Localization Select="Examinar ..." />
                </telerik:RadUpload>            
            </div>
            <div class="FilterElement" style="margin-top:10px;">
                <div class="FilterElementTitle">Descripción:</div>       
                <telerik:RadTextBox ID="txtDescription" runat="server" EnableEmbeddedSkins="false" Width="315px" CssClass="riTextBox_bs" EnableViewState="False" style="margin-left:0px;">
                </telerik:RadTextBox>  
            </div>
            <div class="FilterElement">
                <div class="FilterElementTitle"></div> 
                <a id="lnkAdd" style="width: 70px; text-align: center;" class="ovalbutton" href="javascript:AttachmentValidation();"><span>Agregar</span></a>
                <a id="lnkClear" style="width: 60px; text-align: center;" class="ovalbutton" href="javascript:ClearInputs();"><span>Limpiar</span></a>
                <a id="lnkExit" style="width: 50px; text-align: center;" class="ovalbutton" href="javascript:Exit();"><span>Salir</span></a>
            </div> 
        </div>
    </div>
    <div id="divUploadProgress" style="display: none; width: 510px; height: 100%; margin-left: 20px; margin-top:30px; margin-bottom: 20px; text-align: center;">
        <div style="width: 100%; display: block;">
            <telerik:RadProgressArea id="prgareaUpload" runat="server"
                SkinID="AttachDocuments" DisplayCancelButton="True" 
                EnableEmbeddedSkins="False" EnableViewState="False" BorderStyle="None"
                ProgressIndicators="TotalProgressBar, TotalProgress, TotalProgressPercent, RequestSize, FilesCountBar, FilesCount, FilesCountPercent, CurrentFileName, TimeElapsed"
                onclientprogressbarupdating="OnClientProgressBarUpdating">
                <Localization Uploaded="Enviando: " Cancel="Cancelar" 
                    CurrentFileName="Procesando archivo: " ElapsedTime="Tiempo utilizado: " 
                    EstimatedTime="Tiempo estimado: " TransferSpeed="Velocidad: "
                    UploadedFiles="Guardando: " Total="Total: " TotalFiles="Total: ">
                </Localization>
            </telerik:RadProgressArea>
        </div>
    </div>
    </form>
</body>
</html>
