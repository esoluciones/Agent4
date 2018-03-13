
function OnRowClick(sender, eventArgs) {
    PutCategoryValue(sender, eventArgs, false);
}

function OnRowDblClick(sender, eventArgs) {
    PutCategoryValue(sender, eventArgs, true);
}

function PutCategoryValue(sender, eventArgs, close) {
    var target=window.parent;
    var masterTable = sender.get_masterTableView();
    var row = masterTable.get_dataItems()[eventArgs.get_itemIndexHierarchical()];
    var code = masterTable.getCellByColumnUniqueName(row, "Code").innerHTML;
    var htmlObjectId = target.$get('hdnHtmlObjectId').value;
    var htmlObject = target.opener.$get(htmlObjectId);
    if (IsCombo(htmlObject)) {
        var desc = masterTable.getCellByColumnUniqueName(row, "Description").innerHTML;
        RemoveComboOptions(target, htmlObject);
        AddComboOptions(target, htmlObject, code, desc);
        var buildAjaxCombo = target.$get('hdnBuildAjaxCombo').value;
        if (buildAjaxCombo.toUpperCase() == 'TRUE') {
            target.opener.FireOnChangeEvent(htmlObjectId);
        }
    } else {
        htmlObject.value = code;
    }
    if (close) {
        target.close();
    }
}

function IsCombo(htmlObject) {
    if (htmlObject.tagName.toUpperCase() == 'SELECT') {
        return true;
    } else {
        return false;
    }
}

function RemoveComboOptions(target, htmlObject) {
	var i = 0;
	var top = (htmlObject.length - 1);
	for (var i=top;i>=0;i--) {
	    htmlObject.remove(i);
	}
	return;
}

function AddComboOptions(target, htmlObject, code, desc, selected) {
	var newOption = target.opener.document.createElement('OPTION');
    htmlObject.options.add(newOption);
    newOption = target.opener.document.createElement('OPTION');
    newOption.value = code;
	newOption.text = desc;
    newOption.selected = true;
    htmlObject.options.add(newOption);
}

function ShortAccess(sender, eventArgs){
    var wKeyCode = eventArgs.get_keyCode();
    if (wKeyCode == 13 ) {
        eventArgs.set_cancel(true);
        __doPostBack('lnkBuscar','');
    }
}