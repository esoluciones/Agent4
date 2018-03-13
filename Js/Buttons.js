
var engOldObj = null;
var engOldImgFile = null;

function actImg(imgFile) {
    engOldImgFile = imgFile;
    try {
        engOldObj = $get(imgFile);
    } catch (e) {
        engOldObj = null;
    }
    if (engOldObj != null) {
        engOldObj.src = engOldObj.src.replace(".gif", "2.gif")
    }
}

function chgImg(imgFile) {
    if (imgFile == engOldImgFile) {
        if (engOldObj != null) {
            engOldObj.src = engOldObj.src.replace("2.gif", ".gif");
        }
    }
}

function Continuar() {
    if (DisableButtonPosting()) {
        document.pantalla.action_name.value = "continue";
        SubmitActivityForm();
    }
}

function Cancelar() {
    if (DisableButtonPosting()) {
        document.pantalla.action_name.value = "cancel";
        SubmitActivityForm();
    }
}

function SaltoaEstructura(psResultCode) {
    if (DisableButtonPosting()) {
        document.pantalla.action_name.value = "salto";
        document.pantalla.ResultCode.value = psResultCode;
        SubmitActivityForm();
    }
}

function Terminar(psResultCode) {
    if (DisableButtonPosting()) {
        document.pantalla.action_name.value = "terminar";
        document.pantalla.ResultCode.value = psResultCode;
        SubmitActivityForm();
    }
}

function TerminarYGrabar(psResultCode) {
    if (DisableButtonPosting()) {
        document.pantalla.action_name.value = "terminarygrabar";
        document.pantalla.ResultCode.value = psResultCode;
        SubmitActivityForm();
    }
}

function Pendiente() {
    if (DisableButtonPosting()) {
        document.pantalla.action_name.value = "pendiente";
        document.pantalla.ResultCode.value = ' ';
        SubmitActivityForm();
    }
}

function Retener(psResultCode) {
    if (DisableButtonPosting()) {
        document.pantalla.action_name.value = "pendiente";
        document.pantalla.ResultCode.value = psResultCode;
        SubmitActivityForm();
    }
}

function RetenerSinGrabar(psResultCode) {
    if (DisableButtonPosting()) {
        document.pantalla.action_name.value = "pendientesingrabar";
        document.pantalla.ResultCode.value = psResultCode;
        SubmitActivityForm();
    }
}

function imprimir_ventana() {
    if (window.print) {
        var status = false;
        try {
            toogleButtons('h');
            status = true;
            window.print();
        } catch (e) {
            showRadAlert('Error: ' + e.message, 330, 100);
        } finally {
            if (status == true) {
                window.setTimeout("toogleButtons('s')", 3000);
            }
        }
    } else {
        showRadAlert('Error: No se puede imprimir. Revise la configuracion de su impresora.', 330, 100);
    }
}

function toogleButtons(action) {
    var divName = null;
    var divs = $get('divActivity').getElementsByTagName("DIV");
    for (var i = 0; i < divs.length; i++) {
        divName = divs[i].getAttribute('name');
        if (divName == 'buttonDiv' || divName == 'sqlButtonDiv' || divName == 'previewEmailDiv') {
            if (action == 'h') {
                hideElement(divs[i]);
            } else {
                showElement(divs[i]);
            }
        }
    }
}

function abrir_notas() {
    var myNotes = null;
    var lsTop = '10';
    var lsLeft = '10';
    var lsAncho = '990';
    var lsAlto = '510';
    myNotes = window.open('./AttachNotes.aspx?NoteOrigin=Process&ParentPkey=' + document.pantalla.todojobkey.value, 'Notas', 'toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
    myNotes.focus();
}

function abrir_adjuntos() {
    var myAttachments = null;
    var lsTop = '10';
    var lsLeft = '10';
    var lsAncho = '800';
    var lsAlto = '450';
    myAttachments = window.open('./AttachDocuments.aspx?AttachOrigin=Process&ParentPkey=' + document.pantalla.todojobkey.value, 'Adjuntos', 'toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
    myAttachments.focus()
}

function abrir_entidades(mdpkey, dpkey, text) {
    var targetFrame = window.parent.frames.$get('Entidades');
    if (!targetFrame) {
        showRadAlert('No se encuentra la solapa de Entidades.', 330, 100);
    } else {
        targetFrame.src = "./EntitiesBrowser.aspx?Action=EntityDetails&MetadataPkey=" + mdpkey + "&DataPkey=" + dpkey + "&Text=" + text;
    }
}

function iniciarPerfil(custPkey, prm) {
    var myNuevoTramite;
    var myHora = new Date();
    var lsTop = '10';
    var lsLeft = '10';
    var lsAncho = '1024';
    var lsAlto = '768';
    myNuevoTramite = window.open('../../MainPage.aspx?windowtype=popup&action_name=profile&start_params=' + prm + '&custPkey=' + custPkey, 'Perfil_' + String(myHora.getTime()), 'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
    myNuevoTramite.focus();
}

function nuevoTramite(jobTypeCode) {
    return IniciarNuevoProceso(jobTypeCode, document.pantalla.custpkey.value, '');
}

function nuevoTramiteOtroCustomer(jobTypeCode, custPkey, custTypeCode) {
    //custTypeCode se mantiene por compatibilidad hacia atrás, pero no se usa
    return IniciarNuevoProceso(jobTypeCode, custPkey, '');
}

function IniciarNuevoProceso(jobTypeCode, custPkey, prm) {
    var myNuevoTramite;
    var myHora = new Date();
    var lsTop = '10';
    var lsLeft = '10';
    var lsAncho = '1024';
    var lsAlto = '768';
    myNuevoTramite = window.open('../../MainPage.aspx?windowtype=popup&action_name=startactivity&start_params=' + prm + '&jobTypeCode=' + jobTypeCode + '&custPkey=' + custPkey + '&jobOriginPkey=' + document.pantalla.todojobkey.value, 'Actividad_' + String(myHora.getTime()), 'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
    myNuevoTramite.focus();
}

function IniciarProcesoEnIframe(iframeId, accionPrevia, jobTypeCode, custPkey, prm) {
    var targetFrame = window.frames.$get(iframeId);
    if (!targetFrame) {
        showRadAlert("No se encuentra el iframe '" + iframeId + "'.", 330, 100);
    } else {
        var url = '../../MainPage.aspx?windowtype=iframe&action_name=startactivity&start_params=' + prm + '&jobTypeCode=' + jobTypeCode + '&custPkey=' + custPkey + '&jobOriginPkey=' + document.pantalla.todojobkey.value;
        if (iframeContainsActiveProcess(targetFrame)) {
            if (accionPrevia != 'continuar' && accionPrevia != 'pendiente') {
                showRadAlert('Ya existe un proceso activo en el iframe y no se informó una acción previa válida.', 330, 100);
            } else {
                var internalFrame = null;
                try {
                    internalFrame = targetFrame.contentWindow.$get('Actividad').contentWindow;
                } catch (e) {
                    //Ignore
                }
                if (internalFrame) {
                    EjecutarAccionEnIframe(internalFrame, accionPrevia);
                    targetFrame.src = url;
                } else {
                    targetFrame.src = url;
                }
            }
        } else {
            targetFrame.src = url;
        }
    }
}

function ContinuarProcesoEnIframe(iframeId, accion) {
    var targetFrame = window.frames.$get(iframeId);
    if (!targetFrame) {
        showRadAlert("No se encuentra el iframe '" + iframeId + "'.", 330, 100);
    } else {
        if (iframeContainsActiveProcess(targetFrame)) {
            var internalFrame = null;
            try {
                internalFrame = targetFrame.contentWindow.$get('Actividad').contentWindow;
            } catch (e) {
                //Ignore
            }
            EjecutarAccionEnIframe(internalFrame, accion);
        }
    }
}

function retomaTramite(parameters) {
    //función compatible con retomar.asp V4
    //parameters: jobPkey|attPkey|nextAttPkey|start_params
    var lsParamArray = parameters.split('|');
    var lsJobPkey = lsParamArray[0];
    var lsAttPkey = lsParamArray[2];
    var lsPrm = lsParamArray[3];
    return RetomarProceso(lsJobPkey, lsAttPkey, lsPrm);
}

function retomarTramite(jobPkey, attPkey) {
    return RetomarProceso(jobPkey, attPkey, '');
}

function RetomarProceso(jobPkey, attPkey, prm) {
    var myRetomarTramite = null;
    var myHora = new Date();
    var lsTop = '10';
    var lsLeft = '10';
    var lsAncho = '1024';
    var lsAlto = '768';
    myRetomarTramite = window.open('../../MainPage.aspx?windowtype=popup&action_name=restartactivity&start_params=' + prm + '&jobPkey=' + jobPkey + '&attPkey=' + attPkey + '&jobOriginPkey=' + document.pantalla.todojobkey.value, 'Actividad_' + String(myHora.getTime()), 'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
    myRetomarTramite.focus();
}

function RetomarProcesoEnIframe(iframeId, accionPrevia, jobPkey, attPkey, prm) {
    var targetFrame = window.frames.$get(iframeId);
    if (!targetFrame) {
        showRadAlert("No se encuentra el iframe '" + iframeId + "'.", 330, 100);
    } else {
        var url = '../../MainPage.aspx?windowtype=iframe&action_name=restartactivity&start_params=' + prm + '&jobPkey=' + jobPkey + '&attPkey=' + attPkey + '&jobOriginPkey=' + document.pantalla.todojobkey.value;
        if (iframeContainsActiveProcess(targetFrame)) {
            if (accionPrevia != 'continuar' && accionPrevia != 'pendiente') {
                showRadAlert('Ya existe un proceso activo en el iframe y no se informó una acción previa válida.', 330, 100);
            } else {
                var internalFrame = null;
                try {
                    internalFrame = targetFrame.contentWindow.$get('Actividad').contentWindow;
                } catch (e) {
                    //Ignore
                }
                if (internalFrame) {
                    EjecutarAccionEnIframe(internalFrame, accionPrevia);
                    targetFrame.src = url;
                } else {
                    targetFrame.src = url;
                }
            }
        } else {
            targetFrame.src = url;
        }
    }
}

function EjecutarAccionEnIframe(internalFrame, accion) {
    if (internalFrame) {
        if (accion == 'continuar') {
            internalFrame.Continuar();
        } else {
            if (accion == 'pendiente') {
                internalFrame.Pendiente();
            }
        }
    }
}

function makeCall(phoneNumber, param1, param2, param3, param4, param5) {
    var myMakeCall = null;
    var myHora = new Date();
    var lsTop = '10';
    var lsLeft = '10';
    var lsAncho = '100';
    var lsAlto = '100';
    myMakeCall = window.open('../../MakeCall.aspx?PhoneNumber=' + phoneNumber + '&Param1=' + param1 + '&Param2=' + param2 + '&Param3=' + param3 + '&Param4=' + param4 + '&Param5=' + param5, 'MakeCall_' + String(myHora.getTime()), 'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
}

function Abrir_Argumentario_SubMotivo() {
    var i = 0;
    var input = null;
    var inputName = null;
    var cat_type = '';
    var submotivo = '';
    var motivo = '';
    var docElements = document.pantalla.elements;

    for (i = 0; i < docElements.length; i++) {
        input = docElements.item(i);
        inputName = input.name.split(':')[0];
        if (inputName == 'CALL.JOB_REASON_CODE') {
            motivo = input.value;
        } else {
            if (inputName == 'CALL.JOB_SUBREASON_CODE') {
                cat_type = input.id.split('ctl')[0];
                submotivo = input.value;
            }
        }
        if ((motivo != '') && (submotivo != '')) {
            break;
        }
    }

    if (submotivo == 'NO_APLICA') {
        Abrir_Argumentario_Motivo()
    } else {
        if (submotivo != '') {
            var myWindow = null;
            var lsTop = '118';
            var lsLeft = '690';
            var lsAncho = '450';
            var lsAlto = '687';
            submotivo = submotivo + '.htm';
            myWindow = window.open('./../asp/GetArguments.aspx?file=' + submotivo + '&motivo=' + motivo + '&cat_type=' + cat_type, 'Argumentario_Submotivo', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
            myWindow.focus();
        } else {
            showRadAlert('Por favor, seleccione un Sub Motivo', 330, 100);
        }
    }
}

function Abrir_Argumentario_Motivo() {
    var i = 0;
    var input = null;
    var inputName = null;
    var cat_type = '';
    var motivo = '';
    var docElements = document.pantalla.elements;

    for (i = 0; i < docElements.length; i++) {
        input = docElements.item(i);
        inputName = input.name.split(':')[0];
        if (inputName == 'CALL.JOB_REASON_CODE') {
            cat_type = input.id.split('ctl')[0];
            motivo = input.options[input.selectedIndex].value;
            break;
        }
    }

    if (motivo != '') {
        var myWindow = null;
        var lsTop = '118';
        var lsLeft = '690';
        var lsAncho = '450';
        var lsAlto = '687';
        motivo = motivo + '.htm';
        myWindow = window.open('./../asp/GetArguments.aspx?file=' + motivo + '&cat_type=' + cat_type, 'Argumentario_Motivo', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
        myWindow.focus();
    } else {
        showRadAlert("Por favor, seleccione un Motivo", 330, 100);
    }
}
