
function OnLoad() {
    var lnkFrom = $get('lnkFrom');
    if (lnkFrom) {
        DisableAnchor(lnkFrom);
    }
    var lknSubject = $get('lknSubject');
    if (lknSubject) {
        DisableAnchor(lknSubject);
    }
}

function Discard() {
    if (window.opener != null) {
        window.close();
    } else {
        if (window.parent != null) {
            window.location.href = 'about:blank';
        }
    }
}

function Exit() {
    var callbackFunction = $get('hdnCallbackFunction').value;
    if (window.opener != null) {
        if (callbackFunction) {
            try {
                window.opener.setTimeout(callbackFunction, 1);
            } catch (e) {
                // Ignore;
            }
        }
        window.close();
    } else {
        if (window.parent != null) {
            if (callbackFunction) {
                try {
                    window.parent.setTimeout(callbackFunction, 1);
                } catch (e) {
                    // Ignore;
                }
            }
            window.location.href = 'about:blank';
        }
    }
}

function openMailsTo(sender, args) {
    setMails('txtMailTo', 'wndMailsTo_C_cmbMailTo');
}

function openMailsCC(sender, args) {
    setMails('txtMailCC', 'wndMailsCC_C_cmbCCTo');
}

function setMails(txtId, listId) {
    var currentMail = "";
    var lstPreviousMails = [];
    var previousMails = document.getElementById(txtId).value;
    var listBox = $find(listId);

    if (previousMails) {
        lstPreviousMails = previousMails.split(";");
        for (var i = 0; i < listBox.get_items().get_count(); i++) {
            currentMail = listBox.getItem(i).get_value();
            if (isInArray(lstPreviousMails, currentMail)) {
                listBox.getItem(i).set_checked(true);
            } else {
                listBox.getItem(i).set_checked(false);
            }
        }
    }
}

function addMailsTo() {
    addMails('txtMailTo', 'wndMailsTo_C_cmbMailTo');
    closeMailsTo();
}

function closeMailsTo() {
    closeMails('wndMailsTo');
}

function addMailsCC() {
    addMails('txtMailCC', 'wndMailsCC_C_cmbCCTo');
    closeMailsCC();
}

function closeMailsCC() {
    closeMails('wndMailsCC');
}

function closeMails(wndId) {
    var oWindow = $find(wndId);
    oWindow.close();
}

function addMails(txtId, listId) {
    var finalMails = "";
    var lstPreviousMails = [];
    var lstAlternativeMails = [];
    var previousMails = document.getElementById(txtId).value;
    var listBox = $find(listId);

    if (previousMails) {
        lstPreviousMails = previousMails.split(";");
    }

    for (var i = 0; i < listBox.get_items().get_count(); i++) {
        if (listBox.getItem(i).get_checked()) {
            finalMails += listBox.getItem(i).get_value() + ";";
        }
        lstAlternativeMails[i] = listBox.getItem(i).get_value();
    }

    for (var i = 0; i < lstPreviousMails.length; i++) {
        var currentMail = lstPreviousMails[i];
        if (!isInArray(lstAlternativeMails, currentMail) && finalMails.indexOf(currentMail) == -1) {
            finalMails += currentMail + ";";
        }
    }

    var txt = $find(txtId);
    txt.set_value(finalMails);
}

function isInArray(array, item) {
    return array.indexOf(item) > -1;
}

function OnMailMessageSplitterLoad(sender, args) {
    var pane = $find('paneMailMessage');
    SetEditorSize(pane.get_width(), pane.get_height());
}

function OnMailMessagePaneResized(sender, Args) {
    SetEditorSize(sender.get_width(), sender.get_height());
}

function OnMailMessageEditorLoad(editor) {
    $get('rdeMailMessageCenter').style.height = '100%';
}

function SetEditorSize(newWidth, newHeight) {
    $find('rdeMailMessage').setSize(newWidth, newHeight);
} 