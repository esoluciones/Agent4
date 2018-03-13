
function OnClientSubmitting(source, eventArgs) {
    ClearCounters();
    RefreshDivs('h');
}

function OnClientProgressUpdating(source, eventArgs) {
    var progressArea = $find('prgareaUpload');
    if (progressArea.cancelClicked) {
        progressArea.cancelRequest();
        Exit();
    }  
}

function OnClientProgressBarUpdating(source, eventArgs) {
    if (eventArgs.get_progressBarElementName() == "PrimaryProgressBar") {
        try {
            source.updateHorizontalProgressBar(eventArgs.get_progressBarElement(), eventArgs.get_progressValue());
        } catch (e) {
            //Ignore
        }
        eventArgs.set_cancel(true);
    }
    if (eventArgs.get_progressBarElementName() == "SecondaryProgressBar") {
        try {
            source.updateHorizontalProgressBar(eventArgs.get_progressBarElement(), eventArgs.get_progressValue());
        } catch (e) {
            //Ignore
        }
        eventArgs.set_cancel(true);
    }
}

function ClearCounters() {
    setTimeout('var progressData = {' +
               'PrimaryPercent : 0,' +
               'PrimaryTotal : "",' +
               'PrimaryValue : "",' +
               'SecondaryPercent : 0,' +
               'SecondaryTotal : "",' +
               'SecondaryValue : "",' +
               'CurrentOperationText : "",' +
               'TimeElapsed : "",' +
               'TimeEstimated : "",' +
               'TransferSpeed : ""};' +
               '$find("prgareaUpload").update(progressData)',1);
}

function RefreshDivs(action) {
    if (action == 'h') {
        $get('divUploadData').style.display='none';
        $get('divUploadProgress').style.display='block';
        setTimeout('$find("prgareaUpload").show()',1);
    } else {
        $get('divUploadProgress').style.display='none';
        $get('divUploadData').style.display='block';
        setTimeout('$find("prgareaUpload").hide()',1);
    }
}

function AttachmentValidation() {
    var upload = $find('rduAttach');
    var input = upload.getFileInputs();
    if (input[0].value == "") {
        showRadAlert('Debe ingresar la ruta del archivo a adjuntar.', 330, 100);
    } else {
        var txtdesc = $find('txtDescription').get_value();
        if (txtdesc == '') {
            showRadAlert('Debe ingresar una descripción del archivo a adjuntar.', 330, 100);
        } else {
            document.frmAttachment.submit();
        }            
    }
}

function ClearInputs() {
    var upload = $find('rduAttach');
    var txtdesc = $find('txtDescription');
    upload.clearFileInputAt(0);
    txtdesc.set_value('');
}

function Exit() {
    var target=window.parent;
    var wnd=target.$find('wndAttach');
    wnd.close();
}