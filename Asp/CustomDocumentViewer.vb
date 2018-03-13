Imports EngageWebLibrary
Imports System.IO
Imports System.Web.UI

Public Class clsCustomDocumentViewer

    Inherits clsDocumentViewer

    Protected Overrides Sub OnError(e As System.EventArgs)
        CallErrorPage("CustomDocumentViewer", "Cerrar", "javascript:self.close();")
    End Sub

    Protected Overrides Sub OnLoad(e As System.EventArgs)
        Dim wAction As String = Request.QueryString("action")
        Dim wPkey As String = Request.QueryString("pKey")
        Dim wFileName As String = Request.QueryString("fileName")
        Dim wContentDisposition As String = "attachment"

        If Not (wAction Is Nothing) AndAlso wAction.Trim.Equals("view", StringComparison.CurrentCultureIgnoreCase) Then
            wContentDisposition = "inline"
        End If

        Dim wDocumentStream As Stream = GetEksClientInstance.GetAttach(GetTicket(), wPkey)

        With Response
            .Clear()
            .AddHeader("content-disposition", wContentDisposition & ";filename=""" & wFileName & """")
            If wFileName.EndsWith(".htm", StringComparison.CurrentCultureIgnoreCase) OrElse wFileName.EndsWith(".html", StringComparison.CurrentCultureIgnoreCase) Then
                .ContentType = "text/html"
            Else
                .ContentType = "application/octet-stream"
            End If
            .Buffer = True
        End With

        Dim wWriter As BinaryWriter = New BinaryWriter(Response.OutputStream)
        Dim wBuffer As Byte() = New Byte(4096) {}
        With New BinaryReader(wDocumentStream)
            Dim wBytes As Integer = .Read(wBuffer, 0, 4096)
            While wBytes > 0
                wWriter.Write(wBuffer, 0, wBytes)
                wBytes = .Read(wBuffer, 0, 4096)
            End While
            wWriter.Flush()
            wWriter.Close()
            .Close()
        End With
        wDocumentStream.Close()

        Response.Flush()
    End Sub

End Class
