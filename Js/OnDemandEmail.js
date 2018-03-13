
var engIsWorking = false;

function OnLoad() {
    var target=window.parent;
    setElementSize(target, target.$get('Email'));
}

function Clear() {
    window.document.getElementById("EmailType").options[0].selected = true;
    ClearWithoutFormat();
}

function ClearWithoutFormat() {
    var wIndex
    var wAttachmentsToSend = window.document.getElementById("AttachmentsToSend");
    for (wIndex = (wAttachmentsToSend.length - 1); wAttachmentsToSend.length > 0; wIndex--) {
        wAttachmentsToSend.options[wIndex] = null;
    }
    var wAditionalAttachments = window.document.getElementById("AditionalAttachments");
    for (wIndex = (wAditionalAttachments.length - 1); wAditionalAttachments.length > 0; wIndex--) {
        wAditionalAttachments.options[wIndex] = null;
    }
    window.document.getElementById("Subject").value = "";
    window.document.getElementById("TextMessage").value = "";
}

function EmailType_onChange() {
    var wTypeEmail = window.document.getElementById("EmailType");
    var wIndex = wTypeEmail.selectedIndex;
    if (wIndex != 0) {
        ClearWithoutFormat();
        var wSubject = window.document.getElementById("Subject");
        wSubject.value = subjects[wIndex-1];
        var wFormatCode = window.document.getElementById("FormatCode");
        wFormatCode.value = formats[wIndex - 1];
        var wAttachmentsToSend = window.document.getElementById("AttachmentsToSend");
        for (var x = 0; x <= (attachments[wIndex - 1].length - 1); x++) {
            if (attachments[wIndex - 1][x][0] != '') {
                wAttachmentsToSend.options[x] = new Option(attachments[wIndex - 1][x][1], attachments[wIndex - 1][x][0]);
                wAttachmentsToSend.options[x].selected = true;
            }
        }
        var wAditionalAttachments = window.document.getElementById("AditionalAttachments");
        for (var i = 0; i <= (aditionalAttachments.length - 1); i++) {
            wAditionalAttachments.options[i] = new Option(aditionalAttachments[i][1],aditionalAttachments[i][0]);
        }
    } else {
        Clear();
    }
}

function AttachmentsToSend_onClick() {
    var wAttachmentsToSend = window.document.getElementById("AttachmentsToSend");
    for (var i = 0; i <= (wAttachmentsToSend.length - 1); i++) {
        wAttachmentsToSend.options[i].selected = true;
    }
}

function ValidateDataToSend() {
    if (engIsWorking == false) {
        engIsWorking = true;
        var activityStarted = false;
        var wTypeEmail = window.document.getElementById("EmailType");
        if (wTypeEmail.selectedIndex == 0) {
            showRadAlert('Debe seleccionar un tipo de correo electrónico', 330, 100);
        } else {
            var wSendTo = window.document.getElementById("SendTo");
            if (wSendTo.value == "") {
                showRadAlert('Debe ingresar un destinatario de correo', 330, 100);
            } else {
                var wSubject = window.document.getElementById("Subject");
                if (wSubject.value == "") {
                    showRadAlert('Debe ingresar el asunto del correo', 330, 100);
                } else {
                    var wTextMessage = window.document.getElementById("TextMessage");
                    if (wTextMessage.value == "") {
                        showRadAlert('Debe ingresar un mensaje a enviar', 330, 100);
                    } else {
                        __doPostBack('lnkEnviar','');
                        activityStarted = true;
                    }
                }
            }
        }
        if (!activityStarted) {
            engIsWorking = false;
        } else {
            setTimeout('engIsWorking=false;', 5000);
        }
    }
}
