
function OnLoad() {
    __doPostBack('lnkPostBack', 'initialize');
}

function EndRequestHandler(sender, args) {
    var error = args.get_error();
    if (error) {
        var displayError = ParseAjaxErrorMessage(error.message);
        args.set_errorHandled(true);
        if (IsFirstAjaxPostBack(args.get_response().get_webRequest().get_body())) {
            showRadAlertWithCallBack(displayError, 330, 110, 'Engage', AlertCallback);
        } else {
            showRadAlert(displayError, 330, 100);
        }
    } else {
        document.title = $get("hdnPageTitle").value;
    }
}

function AlertCallback(arg) {
    window.close();
}

function IsFirstAjaxPostBack(params) {
    if ($get('hdnIsFirstAjaxPostBack').value == '1') {
        return true;
    } else {
        var isEventTarget = false;
        var isEventArgument = false;
        var paramItem = null;
        var paramArray = decodeURIComponent(params).split('&');
        for (var i = 0; i < paramArray.length; i++) {
            paramItem = paramArray[i].split('=');
            if ((paramItem[0] == '__EVENTTARGET') && (paramItem[1] == 'lnkPostBack')) {
                isEventTarget = true;
            } else {
                if ((paramItem[0] == '__EVENTARGUMENT') && (paramItem[1] == 'initialize')) {
                    isEventArgument = true;
                }
            }
            if (isEventTarget && isEventArgument) {
                return true;
            }
        }
        return false;
    }
}

function changePage(psDesde, psCantidad) {
	myForm = document.pantalla;
	myForm.desde.value = psDesde;
	myForm.cantidad.value = psCantidad;
	__doPostBack('lnkPostBack', 'changePage');
}

function imprimirSql() {
    modifyButtons('h')
	window.print();				
	window.setTimeout("modifyButtons('s');", 3000);
}

function agregarEntidad() {
    __doPostBack('lnkPostBack', 'agregarEntidad');
}

function modifyButtons(action) {
    if ($get('agregar')) {
        toggleT('agregar', action);
    }
	toggleT('imprimir', action);
	toggleT('cerrar', action);
}
