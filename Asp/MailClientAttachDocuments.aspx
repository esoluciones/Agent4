<%@ Page Language="VB" AutoEventWireup="false" Inherits="EngageWebLibrary.clsMailClientAttachDocuments" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script language="javascript" type="text/javascript" src="../../Global.js"></script>
    <script language="javascript" type="text/javascript" src="../js/SharedFunctions.js"></script>
    <script language="javascript" type="text/javascript" src="../js/MailClientAttachDocuments.js"></script>
    <link href="../../HTMLControls/images/LogoEngageBlanco.ico" rel="SHORTCUT ICON" />
    <link href="../../HTMLControls/telerik/Skins/Default/Grid.Default.css" rel="stylesheet" type="text/css" />
</head>
<body style="height: 100%; margin: 0px; background-color: #ffffff" onload="OnLoad();">
    <form id="frmMailClientAttachments" runat="server">
    <div style="width: 100%; height: 100%;">
        <asp:ScriptManager ID="smMailClientAttachments" runat="server" />
        <telerik:RadWindowManager ID="MailClientAttachDocumentsAlerts" runat="server">
            <windows>
                <telerik:RadWindow ID="wndMailClientAttach" Runat="server" 
                 NavigateUrl="" Behaviors="None" Width="560px" Height="345px" EnableEmbeddedSkins="True" DestroyOnClose="False"
                 KeepInScreenBounds="True" Modal="True" VisibleStatusbar="False" OpenerElementID="lnkAdd" EnableViewState="False" 
                 OnClientClose="OnClientClose">
                </telerik:RadWindow>
            </windows>
        </telerik:RadWindowManager>
        <telerik:RadToolBar ID="tbMailClientAttachments" Runat="server" style="display: none;" />
        <script type="text/javascript" language="javascript">
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
        </script>
        <telerik:RadAjaxManager runat="server" ID="ramMailClientAttachments">
            <AjaxSettings>
                <telerik:AjaxSetting AjaxControlID="grdMailClientAttachments">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="grdMailClientAttachments" LoadingPanelID="ralpMailClientAttachments" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
                <telerik:AjaxSetting AjaxControlID="lnkEmpty">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="grdMailClientAttachments" LoadingPanelID="ralpMailClientAttachments" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
            </AjaxSettings>
        </telerik:RadAjaxManager>
        <telerik:RadAjaxLoadingPanel ID="ralpMailClientAttachments" Transparency="20" BackColor="#E0E0E0" runat="server" EnableTheming="false" EnableViewState="false">
            <div class="LoadingImage"></div>
        </telerik:RadAjaxLoadingPanel> 
        <asp:ObjectDataSource ID="odsMailClientAttachments" runat="server" SelectMethod="GetAttachments"
            TypeName="EKSClientLibrary.Ecl.clsEclKernelClient" EnablePaging="False">
            <SelectParameters>
                <asp:Parameter Name="Ticket" Type="String" DefaultValue="" />
                <asp:Parameter Name="AttachOrigin" Type="Object" DefaultValue="Process" />
                <asp:Parameter Name="ParentPkey" Type="String" DefaultValue="" />
                <asp:Parameter Name="Title" Type="String" DefaultValue="" Direction="InputOutput" />
            </SelectParameters>
        </asp:ObjectDataSource>
        <asp:HiddenField runat="server" id="hdnReadOnly" Value="False" />
        <iframe id="iframeSaveDocument" width="0" height="0" frameborder="0"></iframe>
        <table width="745px" align="left" cellpadding="0" cellspacing="0">
            <tr>
                <td align="left" style="width: 100%">
                    <div class="it_headertexto_ma" style="position:relative;">
                        <asp:label ID="lblAsociation" runat="server"></asp:label>
                    </div>
                    <div id="divUploadActions" style="clear: both; float: left; margin: 0px 0px 10px 0px; position: relative; left: 20px; width: 100%;">
                        <div class="RadToolBar RadToolBar_Horizontal RadToolBar_Default RadToolBar_Default_Horizontal" style="z-index: 9000;">
                            <div class="rtbOuter">
                                <div class="rtbMiddle">
                                    <div class="rtbInner">
                                        <ul class="rtbUL">
                                            <li class="rtbItem">
                                                <a id="lnkAdd" class="ovalbutton" runat="server" href="javascript:return true;">
                                                    <span>Agregar</span>
                                                </a>
                                                <a id="lnkView" class="ovalbutton" runat="server" href="javascript:OpenMailClientAttachment();">
                                                    <span>Ver</span>
                                                </a>
                                                <a id="lnkSave" class="ovalbutton" runat="server" href="javascript:SaveMailClientAttachment();">
                                                    <span>Descargar</span>
                                                </a>
                                                <a id="lnkDelete" class="ovalbutton" runat="server" href="javascript:DeleteMailClientAttachment();">
                                                    <span>Eliminar</span>
                                                </a>
                                                <a id="lnkSaveQuit" class="ovalbutton" runat="server" href="javascript:Exit();">
                                                    <span>Salir</span>
                                                </a>
                                                <div style="display: none;">
                                                    <a id="lnkEmpty" runat="server"></a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="divUploadedFiles" class="GridContainer">
                        <telerik:RadGrid ID="grdMailClientAttachments" DataSourceID="odsMailClientAttachments" runat="server" AllowPaging="True" 
                            SkinID="MailClientAttachDocuments" CellPadding="4" EnableEmbeddedSkins="False" GridLines="Vertical"
                            Width="740px" EnableViewState="False" AllowSorting="False" PageSize="16">
                            <ClientSettings>
                                <Selecting AllowRowSelect="True" />
                                <Resizing AllowColumnResize="True" ResizeGridOnColumnResize="true" />
                            </ClientSettings>
                            <SortingSettings SortToolTip="Click para ordenar" SortedAscToolTip="" SortedDescToolTip="" />
                            <HierarchySettings ExpandTooltip="Ver detalles" CollapseTooltip="Ocultar detalles" />
                            <GroupingSettings ExpandTooltip="Ver detalles" CollapseTooltip="Ocultar detalles" 
                            GroupSplitDisplayFormat="Mostrando ítem {0} de {1}." GroupContinuesFormatString="Continúa en la página siguiente" GroupContinuedFormatString="Continuación de la página previa. " />
                            <HeaderContextMenu EnableEmbeddedSkins="False" EnableTheming="True" 
                                CollapseDelay="0" ExpandDelay="0">
                                <ExpandAnimation Type="None" Duration="0" />
                                <CollapseAnimation Type="None" Duration="0" />
                            </HeaderContextMenu>
                            <StatusBarSettings ReadyText = "Listo" LoadingText = "Cargando"/>
                            <MasterTableView DataSourceID="odsMailClientAttachments" AutoGenerateColumns="False" EnableViewState="True" 
                                NoDetailRecordsText="Sin datos relacionados." NoMasterRecordsText="Sin datos.">
                                <PagerStyle Mode="NextPrevAndNumeric" PageSizeLabelText="Tamaño Página" PagerTextFormat="Cambiar página: {4} &amp;nbsp;|&amp;nbsp; Mostrando página {0} de {1}, items {2} a {3} de {5}."
                                NextPageToolTip="Página siguiente" PrevPageToolTip="Página previa" />
                                <RowIndicatorColumn Visible="False">
                                    <HeaderStyle Width="15px"></HeaderStyle>
                                </RowIndicatorColumn>
                                <ExpandCollapseColumn Visible="False" Resizable="False">
                                    <HeaderStyle Width="15px"></HeaderStyle>
                                </ExpandCollapseColumn>
                                <Columns>
                                    <telerik:GridBoundColumn DataField="Key" UniqueName="Key" Display="false">
                                    </telerik:GridBoundColumn>
                                    <telerik:GridBoundColumn DataField="FileName" UniqueName="FileName" Display="false">
                                    </telerik:GridBoundColumn>
                                    <telerik:GridBoundColumn DataField="FileName" HeaderText="Archivo" UniqueName="FileName">
                                        <ItemStyle HorizontalAlign="Left"></ItemStyle>
                                    </telerik:GridBoundColumn>
                                    <telerik:GridBoundColumn DataField="AttachedMessage" HeaderText="Descripción" UniqueName="AttachedMessage">
                                        <ItemStyle HorizontalAlign="Left"></ItemStyle>
                                    </telerik:GridBoundColumn>
                                    <telerik:GridBoundColumn DataField="UserName" HeaderText="Usuario" UniqueName="UserName" DataType="System.String">
                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemStyle Wrap="false" />
                                    </telerik:GridBoundColumn>
                                    <telerik:GridBoundColumn DataField="CreationDate" HeaderText="Fecha de creación" UniqueName="CreationDate" DataType="System.DateTime">
                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemStyle Wrap="false" />
                                    </telerik:GridBoundColumn>
                                </Columns>
                            </MasterTableView>
                        </telerik:RadGrid>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
