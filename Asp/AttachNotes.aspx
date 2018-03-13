<%@ Page Language="VB" AutoEventWireup="false" Inherits="EngageWebLibrary.clsAttachNotes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script language="javascript" type="text/javascript" src="../../Global.js"></script>
    <script language="javascript" type="text/javascript" src="../js/SharedFunctions.js"></script>
    <script language="javascript" type="text/javascript" src="../js/AttachNotes.js"></script>
    <link href="../../HTMLControls/images/LogoEngageBlanco.ico" rel="SHORTCUT ICON" />
    <link href="../../HTMLControls/telerik/Skins/Default/Grid.Default.css" rel="stylesheet" type="text/css" />
    <link href="../css/ModalPopups.css" rel="stylesheet" type="text/css" />
</head>
<body style="height: 100%; margin: 0px; background-color: #ffffff" onload="OnLoad();">
    <form id="frmNotes" runat="server">
    <div style="width: 100%; height: 100%;">
        <asp:ScriptManager ID="smNotes" runat="server" />
        <telerik:RadWindowManager ID="AttachNotesAlerts" runat="server" EnableShadow="true"></telerik:RadWindowManager>
        <telerik:RadToolBar ID="tbNotes" Runat="server" style="display: none;" />
        <script type="text/javascript" language="javascript">
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
        </script>
        <telerik:RadAjaxManager ID="amAttachNotes" runat="server">
            <AjaxSettings>
                <telerik:AjaxSetting AjaxControlID="lnkAceptar">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="grdNotes" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
                <telerik:AjaxSetting AjaxControlID="lnkCancelar">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="pnlEditor" />
                        <telerik:AjaxUpdatedControl ControlID="rdeNotes" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
                <telerik:AjaxSetting AjaxControlID="grdNotes">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="grdNotes" LoadingPanelID="ralpFilter" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
            </AjaxSettings>
        </telerik:RadAjaxManager>
        <telerik:RadAjaxLoadingPanel ID="ralpFilter" Transparency="20" BackColor="#E0E0E0" runat="server" EnableTheming="false" EnableViewState="false">
            <div class="LoadingImage"></div>
        </telerik:RadAjaxLoadingPanel>
        <asp:ObjectDataSource ID="odsNotes" runat="server" SelectMethod="GetNotes" TypeName="EKSClientLibrary.Ecl.clsEclKernelClient" EnablePaging="False">
            <SelectParameters>
                <asp:Parameter Name="Ticket" Type="String" DefaultValue="" />
                <asp:Parameter Name="NoteOrigin" Type="Object" DefaultValue="Process" />
                <asp:Parameter Name="ParentPkey" Type="String" DefaultValue="" />
                <asp:Parameter Name="Title" Type="String" DefaultValue="" Direction="InputOutput" />
            </SelectParameters>
        </asp:ObjectDataSource>
        <asp:HiddenField runat="server" id="hdnReadOnly" Value="False" />
        <table width="935px" align="left" cellpadding="0" cellspacing="0">
            <tr>
                <td align="left" style="width: 100%">
                    <div class="it_headertexto_ma" style="position:relative;">
                        <asp:Label ID="lblAsociation" runat="server"></asp:Label>
                    </div>
                    <div style="clear: both; float: left; margin: 0px 0px 10px 0px; position: relative; left: 20px; width: 100%;">
                        <div class="RadToolBar RadToolBar_Horizontal RadToolBar_Default RadToolBar_Default_Horizontal" style="z-index: 9000;">
                            <div class="rtbOuter">
                                <div class="rtbMiddle">
                                    <div class="rtbInner">
                                        <ul class="rtbUL">
                                            <li class="rtbItem">
											    <a id="lnkAdd" runat="server" style="width: 70px; text-align: center;" class="ovalbutton"><span>Agregar</span></a>
										    </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="GridContainer">
                        <telerik:RadGrid ID="grdNotes" DataSourceID="odsNotes" runat="server" EnableViewState="False"
                            Width="930px" SkinID="Activities" CellPadding="4" EnableEmbeddedSkins="False" GridLines="Vertical"
                            AllowSorting="False" AllowPaging="True" PageSize="20">
                            <ClientSettings EnablePostBackOnRowClick="false">
                                <Selecting AllowRowSelect="True" />
                            </ClientSettings>
                            <SortingSettings SortToolTip="Click para ordenar" SortedAscToolTip="" SortedDescToolTip="" />
                            <HierarchySettings ExpandTooltip="Ver detalles" CollapseTooltip="Ocultar detalles" />
                            <GroupingSettings ExpandTooltip="Ver detalles" CollapseTooltip="Ocultar detalles" 
                            GroupSplitDisplayFormat="Mostrando ítem {0} de {1}." GroupContinuesFormatString=" Continúa en la página siguiente" GroupContinuedFormatString="Continuación de la página previa. " />
                            <StatusBarSettings ReadyText = "Listo" LoadingText = "Cargando"/>
                            <MasterTableView TableLayout="Fixed" ItemStyle-Wrap="true" DataSourceID="odsNotes" AutoGenerateColumns="False" EnableViewState="True"
                                NoDetailRecordsText="Sin datos relacionados." NoMasterRecordsText="Sin datos.">
                                <PagerStyle Mode="NextPrevAndNumeric" PageSizeLabelText="Tamaño Página" PagerTextFormat="Cambiar página: {4} &amp;nbsp;|&amp;nbsp; Mostrando página {0} de {1}, items {2} a {3} de {5}."
                                NextPageToolTip="Página siguiente" PrevPageToolTip="Página previa" />
                                <RowIndicatorColumn Visible="False">
                                    <HeaderStyle Width="20px"></HeaderStyle>
                                </RowIndicatorColumn>
                                <ExpandCollapseColumn Visible="False" Resizable="False">
                                    <HeaderStyle Width="20px"></HeaderStyle>
                                </ExpandCollapseColumn>
                                <Columns>
                                    <telerik:GridBoundColumn DataField="Key" UniqueName="Key" Display="false">
                                    </telerik:GridBoundColumn>
                                    <telerik:GridBoundColumn DataField="Usuario" HeaderText="Usuario" UniqueName="Usuario">
                                        <ItemStyle HorizontalAlign="Left" Wrap="false"></ItemStyle>
                                        <HeaderStyle Wrap="false" Width="60px" />
                                    </telerik:GridBoundColumn>
                                    <telerik:GridBoundColumn DataField="Fecha" HeaderText="Fecha" UniqueName="Fecha">
                                        <ItemStyle HorizontalAlign="Left" Wrap="false"></ItemStyle>
                                        <HeaderStyle Width="80px" />
                                    </telerik:GridBoundColumn>
                                    <telerik:GridBoundColumn DataField="Nota" HeaderText="Nota" UniqueName="Nota" ItemStyle-HorizontalAlign="Left">
                                        <ItemStyle HorizontalAlign="Left" Wrap="true"></ItemStyle>
                                        <HeaderStyle Width="520px" />
                                    </telerik:GridBoundColumn>
                                </Columns>
                            </MasterTableView>
                        </telerik:RadGrid>
                    </div>
                    <asp:Panel ID="pnlEditor" runat="server" CssClass="ModalPopUp" Style="position: absolute; left: 70px; top: 70px; height: 375px; width: 850px; display: none;" EnableViewState="False">
                        <table width="100%">
                            <tr>
                                <td colspan="2">
                                    <telerik:RadEditor runat="server" ID="rdeNotes" Height="350px" Width="850px" EditModes="Design" EnableViewState="False" StripFormattingOptions="All">
                                        <Content></Content>
                                    </telerik:RadEditor>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 80%">&nbsp;</td>
                                <td>
                                    <div style="clear: both; float: left; margin: 0px; margin-left: 10px; margin-bottom: 10px;">
                                        <div class="RadToolBar RadToolBar_Horizontal RadToolBar_Default RadToolBar_Default_Horizontal" style="z-index: 9000;">
                                            <div class="rtbOuter">
                                                <div class="rtbMiddle">
                                                    <div class="rtbInner">
                                                        <ul class="rtbUL">
                                                            <li class="rtbItem">
                                                                <a id="lnkValidar" href="javascript:ValidateNoteToAdd();" style="width: 60px; text-align: center;" class="ovalbutton" name="lnkValidar"><span>Aceptar</span></a>
                                                                <a id="lnkAceptar" runat="server" style="display: none;" name="lnkAceptar"></a>
										                    </li>
                                                            <li class="rtbItem">
                                                                <a id="lnkCancelar" runat="server" style="width: 70px; text-align: center;" class="ovalbutton"><span>Cancelar</span></a>
										                    </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
							    </td>
                            </tr>
                        </table>
                    </asp:Panel>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
