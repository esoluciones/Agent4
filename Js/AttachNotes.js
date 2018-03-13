
var engIsWorking = false;

function OnLoad() {
    var readOnly = $get('hdnReadOnly');
    if ((readOnly != null) && (readOnly != undefined)) {
        if (readOnly.value == '1') {
            DisableAnchor($get('lnkAdd'));
        }
    }
}

function ValidateNoteToAdd() {
    if (engIsWorking == false) {
        engIsWorking = true;
        __doPostBack('lnkAceptar','');
        setTimeout('engIsWorking=false;', 5000);
    }
}