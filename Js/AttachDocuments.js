
function OnLoad() {
    var readOnly = $get('hdnReadOnly');
    if ((readOnly != null) && (readOnly != undefined)) {
        if (readOnly.value == '1') {
            DisableAnchor($get('lnkAdd'));
            DisableAnchor($get('lnkDelete'));
        }
    }
}

function OnClientClose(sender, eventArgs) {
    window.location.reload();
}

function OpenAttachment() {
    var parameters = GetParameters();
    if (parameters == null) {
        showRadAlert('Debe seleccionar un adjunto de la lista.', 330, 100); 
    } else {
        var myArchivo = null;
	    var lsTop='10';
	    var lsLeft='10';
	    var lsAncho ='990';
	    var lsAlto ='450';
	    myArchivo = window.open('./DocumentViewer.aspx?action=view&pKey=' + parameters[0] + '&fileName=' + parameters[1], 'Adjunto', 'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
	    myArchivo.focus();
	}
}

function SaveAttachment() {
    var parameters = GetParameters();
    if (parameters == null) {
        showRadAlert('Debe seleccionar un adjunto de la lista.', 330, 100); 
    } else {
    	$get('iframeSaveDocument').contentWindow.location.href = './DocumentViewer.aspx?action=save&pKey=' + parameters[0] + '&fileName=' + parameters[1];
	}
}

function DeleteAttachment() {
    var parameters = GetParameters();
    if (parameters == null) {
        showRadAlert('Debe seleccionar un adjunto de la lista.', 330, 100);
    } else {
        radconfirm('Está seguro que desea eliminar el archivo "' + parameters[1] + '"?', DeleteCallBackFn, 330, 100);
	}
}

function DeleteCallBackFn(arg) {
    if (arg) {
        __doPostBack('lnkEmpty','');
    }
}
                        
function GetParameters() {
    var masterTable = $find('grdAttachments').get_masterTableView();
    var row = masterTable.get_selectedItems()[0];
    if (row != null) {
        var key = masterTable.getCellByColumnUniqueName(row, 'Key').innerHTML;
        var fileName = masterTable.getCellByColumnUniqueName(row, 'FileName').innerHTML;
        return [key, fileName];
    } else {
        return null;
    }
}
