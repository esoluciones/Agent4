
function toggleT(elementId,action) {
    var element = document.getElementById(elementId);
    if (element) {
        if (action == 'h') {
            hideElement(element);
        } else {
            showElement(element);
        }
    }
}

function showRadAlert(message, w, h) {
    showRadAlertWithCallBack(message, w, h, 'Engage', null);
}

function showRadAlertWithCallBack(message, w, h, title, callbackFunction) {
    var currentWindow = window;
    var parentWindow = currentWindow.parent;
    var windowType = currentWindow.document.getElementById('hdnWindowType');
    while (windowType == null) {
        if ((parentWindow != null) && (parentWindow != currentWindow)) {
            currentWindow = parentWindow;
            windowType = currentWindow.document.getElementById('hdnWindowType');
            parentWindow = currentWindow.parent;
        } else {
            break;
        }
    }
    try {
        currentWindow.radalert(message, w, h, title, callbackFunction);
    } catch (e) {
        alert(message);
        if (callbackFunction != null) {
            setTimeout(callbackFunction, 1);
        }
    }
}

function showElement(element) {
    if (element) {
        if (element.getAttribute("style")) {
            element.style.display = 'block';
        } else {
            element.setAttribute("style", 'display: block;');
        }
    }
}

function hideElement(element) {
    if (element) {
        if (element.getAttribute("style")) {
            element.style.display = 'none';
        } else {
            element.setAttribute("style", 'display: none;');
        }
    }
}

function IsValidTime(timeStr) {
	// Checks if time is in HH:MM:SS AM/PM format.
	// The seconds and AM/PM are optional.

	var timePat = /^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm|p.m.|a.m.))?$/;
	var matchArray = timeStr.match(timePat);

	if (matchArray == null) {
	    showRadAlert("La hora no tiene un formato válido", 330, 100);
		return false;
	}

	var hour = matchArray[1];
	var minute = matchArray[2];
	var second = matchArray[4];
	var ampm = matchArray[6];

	if (second=="") {
	    second = null;
	}
	if (ampm=="") {
	    ampm = null ;
	}
	if (hour < 0  || hour > 23) {
	    showRadAlert("La hora debe ser un número de 0 a 23", 330, 100);
		return false;
	}
	if (minute<0 || minute > 59) {
	    showRadAlert("Los minutos deben ir de 0 a 59.", 330, 100);
		return false;
	}
	if (second != null && (second < 0 || second > 59)) {
	    showRadAlert("Los segundos no tienen un valor válido", 330, 100);
		return false;
	}
	
	return true;
}

function editNumericValue(pInputControl, pNumericMask) {
    if (pNumericMask) {
        pInputControl.value = document.getElementsByName(pInputControl.name + ':unmasked')[0].value;
    }
}

function validateNumericValue(pInputControl, pEnteros, pDecimales, pNumericMask) {
    if (isFormatOk(pInputControl.value, null, pEnteros, pDecimales)) {
        if (pNumericMask) {
            var masked = document.getElementsByName(pInputControl.name + ':masked')[0]
            var unmasked = document.getElementsByName(pInputControl.name + ':unmasked')[0]
            if (pInputControl.value == unmasked.value) {
                pInputControl.value = masked.value;
            } else {
                var urlBase = null;
                if (window.location.href.indexOf('Activity.aspx') >= 0) {
                    urlBase = '.';
                } else {
                    if (window.location.href.indexOf('EntitiesBrowser.aspx') >= 0) {
                        urlBase = './Agent4/Asp';
                    }
                }
                if (urlBase) {
                    var request = new Sys.Net.WebRequest();
                    request.set_url(urlBase + '/ApplyNumericMask.aspx?value=' + pInputControl.value + '&mask=' + pNumericMask);
                    request.set_httpVerb('GET');
                    request.set_body(null);
                    request.get_headers()['Content-Length'] = 0;
                    request.get_headers()['Content-Type'] = 'text/plain; charset=utf-8';
                    request.add_completed(function OnApplyNumericMaskCompleted(executor, eventArgs) {
                        if (executor.get_responseAvailable()) {
                            unmasked.value = pInputControl.value;
                            masked.value = executor.get_responseData();
                            pInputControl.value = masked.value;
                        } else {
                            if (executor.get_timedOut()) {
                                unmasked.value = pInputControl.value;
                                masked.value = pInputControl.value;
                            } else {
                                if (executor.get_aborted()) {
                                    unmasked.value = pInputControl.value;
                                    masked.value = pInputControl.value;
                                }
                            }
                        }
                    });
                    request.invoke();
                } else {
                    unmasked.value = pInputControl.value;
                    masked.value = pInputControl.value;
                }
            }
        }
    }
}

// pInputControl no se usa, pero igual se deja por compatibilidad.
function isFormatOk(pValue, pInputControl, pEnteros, pDecimales) {
    if (isNumeric(pValue)) {
        var array = pValue.split(".");
        var enteros = '';
        var decimales = '';
        if (array[0].length > 1) {
            enteros = array[0];
        }
        if (array.length > 1) {
            decimales = array[1];
        }
        if (enteros.length > pEnteros) {
            showRadAlert('La cantidad de enteros no debe ser mayor a ' + pEnteros + '.', 330, 100);
            return false;
        } else {
            if (decimales.length > pDecimales) {
                showRadAlert('La cantidad de decimales no debe ser mayor a ' + pDecimales + '.', 330, 100);
                return false;
            } else {
                return true;
            }
        }
    } else {
        return false;
    }
}

function isNumeric(pValue) {
    if (!isNaN(parseFloat(pValue)) && isFinite(pValue)) {
        return true;
    } else {
        showRadAlert('Por favor, ingrese un número.', 330, 100);
        return false;
    }
}

function textCounter(field, maxlimit) {
    if (field.value.length > maxlimit) {
        field.value = field.value.substring(0, maxlimit);
        showRadAlert('Alcanzó el tamaño máximo permitido de ' + maxlimit + ' caracteres para este campo.', 330, 100);
        return false;
    } else {
        return true;
    }
}

function ejecutaSql(lsql, que, entidadkey) {
    if (que == 'SQL') {
        showRadAlert('El modo SQL no está implementado.', 330, 100);
    } else {
        var myWindow = null;
        var screen = document.pantalla;
        if (lsql.substr(0, 4) == 'LINK') {
            myWindow = window.open('./../asp/sql.aspx?que=' + que + '&key=' + lsql + '&entidadkey=' + entidadkey + '&todojobkey=' + screen.todojobkey.value + '&attkey=' + screen.attkey.value + '&phykey=' + screen.phykey.value + '&phystepkey=' + screen.phystepkey.value + '&laststep=' + screen.laststep.value + '&lastcnv=' + screen.lastcnv.value, '_self');
        } else {
            var sTop = '95';
            var sLeft = '95';
            var ancho = '800';
            var alto = '500';
            if (que == 'SQL') {
                showRadAlert('El modo SQL no está implementado.', 330, 100);
            } else {
                myWindow = window.open('./../asp/sql.aspx?que=' + que + '&key=' + lsql + '&entidadkey=' + entidadkey + '&todojobkey=' + screen.todojobkey.value + '&attkey=' + screen.attkey.value, 'Sql', 'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=' + ancho + ',height=' + alto + ',top=' + sTop + ',left=' + sLeft);
                myWindow.focus();
            }
        }
    }
}

function almacenarSeleccion(campoNombre, valor){
    almacenarSeleccionBase(campoNombre, valor, window, "CALL");
}

function almacenarSeleccionPadre(campoNombre, valor){
    almacenarSeleccionBase(campoNombre, valor, window.parent.opener, "CALL");
}

function almacenarSeleccionCustomer(campoNombre, valor){
    almacenarSeleccionBase(campoNombre, valor, window, "CUSTOMER");
}

function almacenarSeleccionCustomerPadre(campoNombre, valor) {
    almacenarSeleccionBase(campoNombre, valor, window.parent.opener, "CUSTOMER");
}

function almacenarSeleccionMultiple(tablaId, campoNombre, fieldType) {
    var valores = "";
    var tabla = document.getElementById(tablaId);
    if (tabla) {
        var inputs = tabla.getElementsByTagName("INPUT");
        var item = null;
        var isDisabled = null;
        var isChecked = null;
        for (var i = 0; i < inputs.length; i++) {
            item = inputs[i];
            try {
                isDisabled = item.disabled;
            } catch (e) {
                isDisabled = false;
            }
            if (isDisabled == false) {
                try {
                    isChecked = item.checked;
                } catch (e) {
                    isChecked = false;
                }
                if (isChecked) {
                    if (valores == '') {
                        valores = item.value;
                    } else {
                        valores = valores + "|" + item.value;
                    }
                }
            }
        }
    }
    almacenarSeleccionBase(campoNombre, tablaId + ":" + valores, window, fieldType);
}

function almacenarSeleccionBase(campoNombre, valor, source, fieldType) {
    // var inputs = source.document.pantalla.getElementsByTagName("INPUT");
    var inputs = source.document.pantalla.elements;
    var item = null;
    var isDisabled = null;
    for (var i = 0; i < inputs.length; i++) {
        item = inputs[i];
        try {
            isDisabled = item.disabled;
        } catch (e) {
            isDisabled = false;
        }
        if (isDisabled == false) {
            if (item.name) {
                if (item.name.indexOf(fieldType + "." + campoNombre + ":", 0) == 0) {
                    item.value = valor;
                    break;
                }
            }
        }
    }
}

function AddFunctionToButton(buttonCaption, functionText) {
    var inputs = document.getElementsByTagName('A');
    var item = null;
    for (var i = 0; i < inputs.length; i++) {
        item = inputs[i];
        if (item.innerHTML == '<span>' + buttonCaption + '</span>') {
            item.href = 'javascript:' + functionText + ';' + item.href;
            break;
        }
    }
}

function GetAgentVersion() {
    return GetServerData('AgentVersion');
}

function GetAppVersion() {
    return GetServerData('AppVersion');
}

function GetDBVersion() {
    return GetServerData('DBVersion');
}

function GetServerData(field) {
    var lsUrl = './Agent4/Asp/GetServerData.aspx';
    var lsParameters = 'field=' + field;
    var lsResponse = null;
    var request = new Sys.Net.WebRequest();
    request.set_url(lsUrl);
    request.set_httpVerb('POST');
    request.set_body(lsParameters);
    request.get_headers()['Content-Length'] = lsParameters.length;
    request.add_completed(function OnGetServerDataCompleted(executor, eventArgs) {
        if (executor.get_responseAvailable()) {
            lsResponse = executor.get_responseData();
            // Asignar lsResponse al contenido de un control html
        }
    });
    request.invoke();
}

function GetServerDataCustom(method, url, parameters) {
    // El parámetro method se mantiene por compatibilidad, pero se usa GET por decreto.
    // Si se necesita usar POST, entonces hay que reformar la función.
    var request = new Sys.Net.WebRequest();
    request.set_url(url + '?' + parameters);
    request.set_httpVerb('GET');
    request.set_body(null);
    request.get_headers()['Content-Length'] = 0;
    request.add_completed(function OnGetServerDataCustomCompleted(executor, eventArgs) {
        // Si se necesita devolver la respuesta de la invocación Ajax, o el estado en que finalizó,
        // entonces response y status se deben guardar en un control del html.
        var response = null;
        var status = true;
        if (executor.get_responseAvailable()) {
            response = executor.get_responseData();
        } else {
            if (executor.get_timedOut()) {
                status = false;
            } else {
                if (executor.get_aborted()) {
                    status = false;
                }
            }
        }
    });
    request.invoke();
    return true;
}

function GetRemoteAddr(inputObj) {
    var request = new Sys.Net.WebRequest();
    request.set_url('./GetRemoteAddr.aspx');
    request.set_httpVerb('GET');
    request.set_body(null);
    request.get_headers()['Content-Length'] = 0;
    request.add_completed(function OnGetRemoteAddrCompleted(executor, eventArgs) {
        if (executor.get_responseAvailable()) {
            inputObj.value = executor.get_responseData();
        } else {
            if (executor.get_timedOut()) {
                inputObj.value = '';
            } else {
                if (executor.get_aborted()) {
                    inputObj.value = '';
                }
            }
        }
    });
    request.invoke();
}

function GetTicketData(inputObj, field) {
    var request = new Sys.Net.WebRequest();
    var url = './Agent4/Asp/GetTicketData.aspx?field=';
    if (field) {
        url = url + field;
    }
    request.set_url(url);
    request.set_httpVerb('GET');
    request.set_body(null);
    request.get_headers()['Content-Length'] = 0;
    request.add_completed(function OnGetRemoteAddrCompleted(executor, eventArgs) {
        if (executor.get_responseAvailable()) {
            if (inputObj) {
                inputObj.value = executor.get_responseData();
            } else {
                alert(executor.get_responseData());
            }
        } else {
            if (executor.get_timedOut()) {
                if (inputObj) {
                    inputObj.value = '';
                }
            } else {
                if (executor.get_aborted()) {
                    if (inputObj) {
                        inputObj.value = '';
                    }
                }
            }
        }
    });
    request.invoke();
}

function CancelEvent(e) {
    if ((e != null) && (e != undefined)) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
}

function OpenNotes(pPkey, pNoteOrigin, pReadOnly) {
    var wNotes = null;
    var wTop = '10';
    var wLeft = '10';
    var wAncho = '990';
    var wAlto = '510';
    wNotes = window.open('./Agent4/Asp/AttachNotes.aspx?ReadOnly=' + pReadOnly + '&NoteOrigin='+ pNoteOrigin +'&ParentPkey=' + pPkey, 'Notas', 'toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=' + wAncho + ',height=' + wAlto + ',top=' + wTop + ',left=' + wLeft);
    wNotes.focus();
}

function OpenAttachedDocuments(pPkey, pAttachOrigin, pReadOnly) {
    var wAttachments = null;
    var wTop = '10';
    var wLeft = '10';
    var wAncho = '800';
    var wAlto = '450';
    wAttachments = window.open('./Agent4/Asp/AttachDocuments.aspx?ReadOnly=' + pReadOnly + '&AttachOrigin=' + pAttachOrigin + '&ParentPkey=' + pPkey, 'Adjuntos', 'toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=' + wAncho + ',height=' + wAlto + ',top=' + wTop + ',left=' + wLeft);
    wAttachments.focus()
}

function DisableAnchor(anchorObj){
    var anchorHref = anchorObj.getAttribute('href');
    var anchorColor = anchorObj.style.color;
    anchorObj.setAttribute('href', 'javascript:void(0);');
    anchorObj.style.color='gray';
    return [anchorObj, anchorHref, anchorColor];
}

function EnableAnchor(anchorData){
    anchorData[0].setAttribute('href', anchorData[1]);
    anchorData[0].style.color=anchorData[2];
}

function hide1x1Elements() {
    var inputs = document.pantalla.getElementsByTagName("INPUT");
    var item = null;
    var isDisabled = null;
    for (var i = 0; i < inputs.length; i++) {
        item = inputs[i];
        try {
            isDisabled = item.disabled;
        } catch (e) {
            isDisabled = false;
        }
        if (isDisabled == false) {
            if (item.style.width == '1px' && item.style.height == '1px') {
                hideElement(item);
            }
        }
    }
}
