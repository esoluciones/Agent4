<%@ OutputCache Location="None" NoStore="true" %>
<%@ Page ContentType="text/plain; charset=utf-8" Language="VB" AutoEventWireup="false" StylesheetTheme="" Theme="" EnableViewState="false" EnableTheming="false" %>
<%=Val(Request.QueryString("value")).ToString(Request.QueryString("mask"))%>