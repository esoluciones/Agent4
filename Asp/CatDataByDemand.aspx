<%@ Page Language="VB" AutoEventWireup="false" Inherits="EngageWebLibrary.clsCatDataByDemand" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Engage WebAgent</title>
    <script language="javascript" type="text/javascript" src="../../Global.js"></script>
    <script language="javascript" type="text/javascript" src="../js/SharedFunctions.js"></script>
    <script language="javascript" type="text/javascript" src="../js/CatDataByDemand.js"></script>
    <link href="../../HTMLControls/images/LogoEngageBlanco.ico" rel="SHORTCUT ICON" />
    <link href="../../HTMLControls/telerik/Skins/Default/Grid.Default.css" rel="stylesheet" type="text/css" />
</head>
<body style="height: 100%; margin: 0px; background-color: #ffffff">
    <form id="frmCatDataByDemand" runat="server">
    <div style="width: 100%; height: 100%; background-color: #ffffff">
        <asp:ScriptManager ID="smCatDataByDemand" runat="server" />
        <telerik:RadWindowManager ID="CatDataByDemandAlerts" runat="server"></telerik:RadWindowManager>
        <script type="text/javascript" language="javascript">
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
        </script>
        <telerik:RadAjaxManager runat="server" ID="ramCatDataByDemand">
            <AjaxSettings>
                <telerik:AjaxSetting AjaxControlID="grdCatDataByDemand">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="grdCatDataByDemand" />
                        <telerik:AjaxUpdatedControl ControlID="divAjaxHiddenFields" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
                <telerik:AjaxSetting AjaxControlID="lnkClear">
                    <UpdatedControls>
                        <telerik:AjaxUpdatedControl ControlID="txtBuscar" />
                        <telerik:AjaxUpdatedControl ControlID="grdCatDataByDemand" />
                        <telerik:AjaxUpdatedControl ControlID="divAjaxHiddenFields" />
                    </UpdatedControls>
                </telerik:AjaxSetting>
            </AjaxSettings>
        </telerik:RadAjaxManager>
        <asp:ObjectDataSource ID="odsCatDataByDemand" runat="server" SelectMethod="GetCategoryRows"
            TypeName="EKSClientLibrary.Ecl.clsEclKernelClient" EnablePaging="True" MaximumRowsParameterName="RowCount"
            SelectCountMethod="GetCategoryRowsCount" StartRowIndexParameterName="StartingRow"
            SortParameterName="OrderClause">
            <SelectParameters>
                <asp:Parameter Name="Ticket" Type="String" DefaultValue="" />
                <asp:Parameter Name="StartingRow" Type="Int32" DefaultValue="1" />
                <asp:Parameter Name="RowCount" Type="Int32" DefaultValue="25" />
                <asp:Parameter Name="CalledFrom" Type="Object" DefaultValue="ProcessForm" />
                <asp:Parameter Name="WhereClause" Type="String" DefaultValue="" />
                <asp:Parameter Name="JobPkey" Type="String" DefaultValue="" />
                <asp:Parameter Name="CustPkey" Type="String" DefaultValue="" />
                <asp:Parameter Name="AttPkey" Type="String" DefaultValue="" />
                <asp:Parameter Name="CallPkey" Type="String" DefaultValue="" />
                <asp:Parameter Name="LastConv" Type="String" DefaultValue="" />
                <asp:Parameter Name="LastStep" Type="String" DefaultValue="" />
                <asp:Parameter Name="CategorySource" Type="Object" DefaultValue="Internal" />
                <asp:Parameter Name="CatPkey" Type="String" DefaultValue="" />
                <asp:Parameter Name="CatParKey" Type="String" DefaultValue="" />
                <asp:Parameter Name="CatCode" Type="String" DefaultValue="" />
                <asp:Parameter Name="ParentCatDataCode" Type="String" DefaultValue="" />
                <asp:Parameter Name="OrderClause" Type="String" DefaultValue="" Direction="InputOutput" />
            </SelectParameters>
        </asp:ObjectDataSource>
        <asp:HiddenField runat="server" id="hdnHtmlObjectId" Value="" />
        <asp:HiddenField runat="server" id="hdnBuildAjaxCombo" Value="" />
        <div id="divAjaxHiddenFields" runat="server" style="display: none;">
            <asp:HiddenField runat="server" id="hdnOrderClause" Value="" />
        </div>
        <table width="100%" align="center" cellpadding="0" cellspacing="0">
            <tr>
                <td align="left" style="width: 100%">
                    <div class="it_headertexto_ma">
                        Selección de elementos
                    </div>
                    <div id="divFiltro" runat="server" style="background-color: #efefef; width: 500px; text-align: left; margin-left: 20px; margin-bottom: 20px; height: 65px; ">
                        <div id="busqueda" class="busquedaclass" align="left" style="padding-left: 20px">
                            <div style="width: 450px; display: block; clear: both; float: left; margin-top: 6px; font-size: 11px;">
                                <div style="display: inline; float: left; width: 140px;">Buscar Descripción:</div>
                                <telerik:RadTextBox ID="txtBuscar" runat="server" EnableEmbeddedSkins="false" Width="280px" CssClass="riTextBox_bs" EnableViewState="true">
                                <ClientEvents OnKeyPress="ShortAccess" />
                                </telerik:RadTextBox>
                            </div>
                            <div style="width: 70px; float: left; display: block; margin: 10px 4px 10px 146px;">
                                <asp:CheckBox ID="chkExacta" runat="server" Text="Exacta" EnableViewState="true" />
                            </div>
                            <div style="width: 60px; float: left; display: inline; margin: 5px 4px 10px 15px;">
                                <a id="lnkBuscar" runat="server" style="width: 60px; text-align: center;" class="ovalbutton"><span>Buscar</span></a>
                            </div>
                            <div style="width: 60px; float: left; display: inline; margin: 5px 4px 10px 4px;">
                                <a id="lnkClear" runat="server" style="width: 60px; text-align: center;" class="ovalbutton"><span>Limpiar</span></a>
                            </div>
                            <div style="width: 60px; float: left; display: inline; margin: 5px 4px 10px 4px;">
                                <a id="lnkCerrar" style="width: 60px; text-align: center;" class="ovalbutton" href="javascript:self.close();"><span>Cerrar</span></a>
                            </div>
                        </div>
                    </div>
                    <div align="left" style="margin-left: 20px; display: block; clear: both; float: left;">
                        <telerik:RadGrid ID="grdCatDataByDemand" runat="server" DataSourceID="odsCatDataByDemand" 
                            AllowPaging="True" SkinID="Activities" CellPadding="4" Width="500px" EnableEmbeddedSkins="False"
                            GridLines="Vertical" PageSize="25">
                            <ClientSettings EnablePostBackOnRowClick="true">
                                <Selecting AllowRowSelect="True" />
                                <ClientEvents OnRowClick="OnRowClick" OnRowDblClick="OnRowDblClick" />
                                <Resizing AllowColumnResize="True" ResizeGridOnColumnResize="true" />
                            </ClientSettings>
                            <SortingSettings SortToolTip="Click para ordenar" SortedAscToolTip="" SortedDescToolTip="" />
                            <HierarchySettings ExpandTooltip="Ver detalles" CollapseTooltip="Ocultar detalles" />
                            <GroupingSettings ExpandTooltip="Ver detalles" CollapseTooltip="Ocultar detalles" 
                                GroupSplitDisplayFormat="Mostrando ítem {0} de {1}." GroupContinuesFormatString=" Continúa en la página siguiente" GroupContinuedFormatString="Continuación de la página previa. " />
                            <HeaderContextMenu EnableEmbeddedSkins="False" EnableTheming="True" CollapseDelay="0" ExpandDelay="0">
                                <ExpandAnimation Type="None" Duration="0" />
                                <CollapseAnimation Type="None" Duration="0" />
                            </HeaderContextMenu>
                            <StatusBarSettings ReadyText = "Listo" LoadingText = "Cargando"/>
                            <MasterTableView DataSourceID="odsCatDataByDemand" AutoGenerateColumns="False" EnableViewState="True"
                                UseAllDataFields="true" NoDetailRecordsText="Sin datos relacionados." NoMasterRecordsText="Sin datos."
                                AllowSorting="True" AllowNaturalSort="False" AllowMultiColumnSorting="False">
                                <PagerStyle Mode="NextPrevAndNumeric" PageSizeLabelText="Tamaño Página" PagerTextFormat="Cambiar página: {4} &amp;nbsp;|&amp;nbsp; Mostrando página {0} de {1}, items {2} a {3} de {5}."
                                    NextPageToolTip="Página siguiente" PrevPageToolTip="Página previa" />
                                <RowIndicatorColumn Visible="False">
                                    <HeaderStyle Width="20px"></HeaderStyle>
                                </RowIndicatorColumn>
                                <ExpandCollapseColumn Visible="False" Resizable="False">
                                    <HeaderStyle Width="20px"></HeaderStyle>
                                </ExpandCollapseColumn>
                                <Columns>
                                    <telerik:GridBoundColumn DataField="Code" HeaderText="Código" SortExpression="CAT_DATA_CODE" UniqueName="Code" />
                                    <telerik:GridBoundColumn DataField="Description" HeaderText="Descripción" SortExpression="CAT_DATA_DESC" UniqueName="Description" />
                                </Columns>
                            </MasterTableView>
                            <FilterMenu EnableEmbeddedSkins="False" EnableTheming="True"
                                CollapseDelay="0" ExpandDelay="0">
                                <ExpandAnimation Type="None" Duration="0" />
                                <CollapseAnimation Type="None" Duration="0" />
                            </FilterMenu>
                        </telerik:RadGrid>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
