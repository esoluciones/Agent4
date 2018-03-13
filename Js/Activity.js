
var engAjaxControlInnerHtml = null;
var engAjaxOnChangeAttribute = null;
var engAjaxControlObject = null;

function OnPostLoad() {
    //Aquí va todo el código javascript que se necesita 
    //ejecutar en el onload de todas las actividades.
}

function OnLoad() {
    var processType = null;
    var parentFrame = window.frameElement;
    var parentFrameId = null;
    if (parentFrame != null) {
        parentFrameId = parentFrame.id;
        if (parentFrameId == 'Actividad') {
            processType = 'ACTIVITY';
        } else {
            if (parentFrameId == 'Perfil') {
                processType = 'PROFILE';
            } else {
                if (parentFrameId == 'Inicio') {
                    processType = 'HOME';
                } else {
                    if (parentFrameId == 'Supervisor') {
                        processType = 'SUPER';
                    }
                }
            }
        }
    }
    if (!processType) {
        showRadAlert('No se encuentra el iframe destino.', 330, 100);
    } else {
        var target = window.parent;
        var windowType = target.$get('hdnWindowType').value;
        var caller = '';
        if (windowType != 'popup') {
            var callerElement = window.$get('hdnCaller');
            if (callerElement) {
                caller = callerElement.value;
            }
        }
        var tabStrip = findTabStrip(target);
        if (!tabStrip) {
            showRadAlert('No se encuentran las solapas.', 330, 100);
        } else {
            if (processType == 'ACTIVITY') {
                var activityTab = tabStrip.findTabByText('Actividad');
                if (caller != '') {
                    setTabCaller(activityTab, caller)
                }
                setSelectedTab(target, parentFrameId, activityTab, 'set');
            } else {
                if (processType == 'PROFILE') {
                    var profileTab = tabStrip.findTabByText('Perfil');
                    if (caller != '') {
                        setTabCaller(profileTab, caller)
                    }
                    setSelectedTab(target, parentFrameId, profileTab, 'set');
                } else {
                    if ((processType == 'HOME') || (processType == 'SUPER')) {
                        setElementSize(target, target.$get(parentFrameId));
                    }
                }
            }
            __doPostBack('lnkPostBack', 'initialize');
        }
    }
}

function AjaxRequestStart(sender, args) {
    var loadingPanel = $get("ralpActivity");
    var domElement = $get("divActivity");
    var pageHeight = domElement.scrollHeight;
    var viewportHeight = domElement.clientHeight;
    if (pageHeight > viewportHeight) {
        loadingPanel.style.height = pageHeight + "px";
    }
    var pageWidth = domElement.scrollWidth;
    var viewportWidth = domElement.clientWidth;
    if (pageWidth > viewportWidth) {
        loadingPanel.style.width = pageWidth + "px";
    }
}

function EndActivityHandler(sender, args) {
    var error = args.get_error();
    if (error) {
        EnableButtonPosting();
        var displayError = ParseAjaxErrorMessage(error.message);
        args.set_errorHandled(true);
        if (IsFirstAjaxPostBack(args.get_response().get_webRequest().get_body())) {
            showRadAlertWithCallBack(displayError, 330, 110, 'Engage', AlertCallback);
        } else {
            showRadAlert(displayError, 330, 100);
        }
    } else {
        AdjustTablesStyle();
        OnPostLoad();
    }
}

function AlertCallback(arg) {
    window.location.href = './BlankPage.aspx';
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

function EnableOnBeforeUnload() {
    window.parent.EnableOnBeforeUnload();
}

function DisableOnBeforeUnload() {
    window.parent.DisableOnBeforeUnload();
}

function SetOnBeforeUnload(onBeforeUnloadFn, message) {
    window.parent.SetOnBeforeUnload(onBeforeUnloadFn, message);
}

function ResetOnBeforeUnload() {
    window.parent.SetOnBeforeUnload(null, null);
}

function EnableButtonPosting() {
    $get('hdnButtonPostingEnabled').value = '1';
}

function DisableButtonPosting() {
    var buttonPostingCtrl = $get('hdnButtonPostingEnabled');
    if (buttonPostingCtrl) {
        if (buttonPostingCtrl.value != '0') {
            buttonPostingCtrl.value = '0';
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function BuildAjaxTable(fieldCode, ctlName, spCode, adjustW, minW, maxW, fitParent) {
    var alternateSpCode = '';
    var gridHeaderId = 'TABLE.' + fieldCode + ':ctl_' + ctlName;
    engAjaxControlObject = $get(gridHeaderId).parentNode;
    engAjaxOnChangeAttribute = null;
    engAjaxControlInnerHtml = engAjaxControlObject.innerHTML;
    engAjaxControlObject.innerHTML = '<span id="' + gridHeaderId + '" class="loading">Cargando ...</span>';
    if (spCode) {
        alternateSpCode = spCode
    }
    var params = 'TABLE|' + gridHeaderId + '|' + BuildGridAdjustParams(adjustW, minW, maxW, fitParent);
    CallServer('BuildAjaxGrid,SP,' + fieldCode + ',' + ctlName + ',' + alternateSpCode, params);
}

function BuildAjaxGrid(fieldCode, ctlName, spCode, adjustW, minW, maxW, fitParent) {
    var alternateSpCode = '';
    var gridHeaderId = 'GRID.HEADER.' + fieldCode + ':ctl_' + ctlName;
    engAjaxControlObject = $get(gridHeaderId).parentNode.parentNode;
    engAjaxOnChangeAttribute = null;
    engAjaxControlInnerHtml = engAjaxControlObject.innerHTML;
    engAjaxControlObject.innerHTML = '<div><span id="' + gridHeaderId + '" class="loading">Cargando ...</span></div>';
    if (spCode) {
        alternateSpCode = spCode
    }
    var params = 'GRID|' + gridHeaderId + '|' + BuildGridAdjustParams(adjustW, minW, maxW, fitParent);
    CallServer('BuildAjaxGrid,SP,' + fieldCode + ',' + ctlName + ',' + alternateSpCode, params);
}

function BuildAjaxFilteredGrid(fieldCode, ctlName, spCode, adjustW, minW, maxW, fitParent) {
    var alternateSpCode = '';
    var gridHeaderId = 'FILTEREDGRID.HEADER.' + fieldCode + ':ctl_' + ctlName;
    engAjaxControlObject = $get(gridHeaderId).parentNode.parentNode;
    engAjaxOnChangeAttribute = null;
    engAjaxControlInnerHtml = engAjaxControlObject.innerHTML;
    engAjaxControlObject.innerHTML = '<div><span id="' + gridHeaderId + '" class="loading">Cargando ...</span></div>';
    if (spCode) {
        alternateSpCode = spCode
    }
    var params = 'FILTEREDGRID|' + gridHeaderId + '|' + BuildGridAdjustParams(adjustW, minW, maxW, fitParent);
    CallServer('BuildAjaxGrid,SP,' + fieldCode + ',' + ctlName + ',' + alternateSpCode, params);
}

function BuildAjaxCombo(fieldType, fieldCode, ctlName, currentCombo, childComboId) {
    var parentCatDataCode = currentCombo.options[currentCombo.selectedIndex].value;
    engAjaxControlObject = $get(childComboId).parentNode;
    engAjaxOnChangeAttribute = engAjaxControlObject.firstChild.onchange;
    engAjaxControlInnerHtml = engAjaxControlObject.innerHTML;
    engAjaxControlObject.innerHTML = '<span id="' + childComboId + '" class="loading">Cargando ...</span>';
    CallServer('BuildAjaxCombo,' + fieldType + ',' + fieldCode + ',' + ctlName + ',' + parentCatDataCode, 'COMBO|' + childComboId);
}

function BuildAjaxMap(fieldCode, ctlName, spCode) {
    var alternateSpCode = '';
    var mapControlId = 'MAP.' + fieldCode + ':ctl_' + ctlName;
    engAjaxControlObject = $get(mapControlId);
    engAjaxOnChangeAttribute = null;
    engAjaxControlInnerHtml = engAjaxControlObject.innerHTML;
    engAjaxControlObject.innerHTML = '<span id="loading' + mapControlId + '" class="loading">Cargando ...</span>';
    if (spCode) {
        alternateSpCode = spCode
    }
    var params = 'MAP|' + mapControlId;
    CallServer('BuildAjaxMap,SP,' + fieldCode + ',' + ctlName + ',' + alternateSpCode, params);
}

function BuildAjaxGraph(fieldCode, ctlName, spCode) {
    var alternateSpCode = '';
    var graphControlId = 'GRAPH.' + fieldCode + ':ctl_' + ctlName;
    engAjaxControlObject = $get(graphControlId);
    engAjaxOnChangeAttribute = null;
    engAjaxControlInnerHtml = engAjaxControlObject.innerHTML;
    engAjaxControlObject.innerHTML = '<span id="loading' + graphControlId + '" class="loading">Cargando ...</span>';
    if (spCode) {
        alternateSpCode = spCode
    }
    var params = 'GRAPH|' + graphControlId;
    CallServer('BuildAjaxGraph,SP,' + fieldCode + ',' + ctlName + ',' + alternateSpCode, params);
}

function ReceiveServerData(arg, context) {
    var newElement = null;
    var parentDiv = null;
    var adjustW = 0;
    var fitParent = 0;
    var params = context.split('|');
    if (params[0] == 'GRID' || params[0] == 'FILTEREDGRID') {
        newElement = document.createElement('div');
        newElement.innerHTML = arg;
        parentDiv = $get(params[1]).parentNode.parentNode;
        parentDiv.innerHTML = newElement.firstChild.innerHTML;
        adjustW = parseInt(params[2]);
        fitParent = parseInt(params[5]);
        if (adjustW == 1) {
            parentDiv.style.width = '1px';
        }
        AdjustTableStyle(params[0], params[1].replace(params[0] + '.HEADER.', ''), 0, adjustW, parseInt(params[3]), parseInt(params[4]), fitParent);
    } else {
        if (params[0] == 'TABLE') {
            newElement = document.createElement('div');
            newElement.innerHTML = arg;
            parentDiv = $get(params[1]).parentNode;
            parentDiv.innerHTML = newElement.firstChild.innerHTML;
            adjustW = parseInt(params[2]);
            fitParent = parseInt(params[5]);
            if (adjustW == 1) {
                parentDiv.style.width = '1px';
            }
            AdjustTableDivWidth(params[0], params[1], adjustW, parseInt(params[3]), parseInt(params[4]), fitParent);
        } else {
            if (params[0] == 'COMBO') {
                newElement = document.createElement('div');
                newElement.innerHTML = arg;
                parentDiv = $get(params[1]).parentNode;
                parentDiv.innerHTML = newElement.firstChild.innerHTML;
                if ($get(params[1]).getAttribute('idHijoName')) {
                    FireOnChangeEvent(params[1]);
                } else {
                    if (engAjaxOnChangeAttribute) {
                        $get(params[1]).onchange = engAjaxOnChangeAttribute;
                    }
                }
            } else {
                if (params[0] == 'MAP') {
                    setTimeout(arg, 1);
                } else {
                    if (params[0] == 'GRAPH') {
                        setTimeout(arg, 1);
                    }
                }
            }
        }
    }
}

function ReceiveServerError(arg, context) {
    engAjaxControlObject.innerHTML = engAjaxControlInnerHtml;
    showRadAlert(ParseCallbackErrorMessage(arg), 330, 100);
}

function BuildGridAdjustParams(adjustW, minW, maxW, fitParent) {
    var params = null;
    if (adjustW) {
        if (minW > maxW) {
            maxW = minW;
        }
        params = '1|' + minW + '|' + maxW + '|';
        if (fitParent) {
            params += '1';
        } else {
            params += '0';
        }
    } else {
        minW = 0;
        maxW = 0;
        params = '0|0|0|0';
    }
    return params;
}

function FireOnChangeEvent(context) {
    setTimeout('FireEvent("id","' + context + '","onchange")', 1);
}

function FireOnBlurEvent(context) {
    setTimeout('FireEvent("name","' + context + '","onblur")', 1);
}

function FireEvent(identifier, context, event) {
    var controlObj = null;
    if (identifier == 'id') {
        controlObj = $get(context);
    } else {
        if (identifier == 'name') {
            controlObj = document.getElementsByName(context)[0];
        }
    }
    if (controlObj) {
        if (controlObj.fireEvent) {
            controlObj.fireEvent(event);
        } else {
            eval(controlObj.getAttribute(event));
        }
    }
}

function GetNumericMaskedValue(inputName) {
    if (inputName) {
        var inputControl = document.getElementsByName(inputName + ':unmasked')[0];
        if (inputControl) {
            return inputControl.value;
        } else {
            showRadAlert('No se encuentra el control ' + inputName, 330, 100);
        }
    }
}

function SetNumericMaskedValue(inputName, newValue) {
    if (inputName) {
        if (document.getElementsByName(inputName + ':unmasked')[0]) {
            if (isNaN(newValue)) {
                document.getElementsByName(inputName)[0].value = 0;
            } else {
                document.getElementsByName(inputName)[0].value = newValue;
            }
            FireOnBlurEvent(inputName);
        } else {
            showRadAlert('No se encuentra el control ' + inputName, 330, 100);
        }
    }
}

function showCat(pCategorySource, pCatPkey, pCatParKey, pCatCode, pParentCatDataCode, pHtmlObjectId, pBuildAjaxCombo) {
    var myWindow = null;
    var screen = document.pantalla;
    var contextparams = "&JobPkey=" + screen.todojobkey.value + "&AttPkey=" + screen.attkey.value + "&CallPkey=" + screen.phykey.value + "&LastConv=" + screen.lastcnv.value + "&LastStep=" + screen.laststep.value;
    var catdataparams = "&CategorySource=" + pCategorySource + "&CatPkey=" + pCatPkey + "&CatParKey=" + pCatParKey + "&CatCode=" + pCatCode + "&ParentCatDataCode=" + pParentCatDataCode + "&HtmlObjectId=" + pHtmlObjectId;
    var lsUrl = "./../asp/CatDataByDemand.aspx?CalledFrom=ProcessForm&BuildAjaxCombo=" + pBuildAjaxCombo + contextparams + catdataparams;
    myWindow = window.open(lsUrl, "ShowCat", "top=100,left=200,toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=560,height=600");
    myWindow.focus();
}

function saveCheckBoxValue(checkBox, hiddenFieldName) {
    var hiddenField = document.getElementsByName(hiddenFieldName)[0];
    if (checkBox.checked) {
        hiddenField.value = '1';
    } else {
        hiddenField.value = '0';
    }
}

function SubmitActivityForm() {
    __doPostBack('lnkPostBack', '');
}

function StartActivityFromHome(jobTypeCode, custPkey, prms) {
    StartActivityFromTab('Inicio', jobTypeCode, custPkey, prms);
}

function RestartActivityFromHome(jobPkey, attPkey, prms) {
    RestartActivityFromTab('Inicio', jobPkey, attPkey, prms);
}

function StartActivityFromProfile(jobTypeCode, custPkey, prms) {
    StartActivityFromTab('Perfil', jobTypeCode, custPkey, prms);
}

function RestartActivityFromProfile(jobPkey, attPkey, prms) {
    RestartActivityFromTab('Perfil', jobPkey, attPkey, prms);
}

function StartActivityFromTab(caller, jobTypeCode, custPkey, prms) {
    var target = window.parent;
    var targetFrame = target.frames.$get('Actividad');
    if (!targetFrame) {
        showRadAlert('No se encuentra la solapa de la Actividad.', 330, 100);
    } else {
        if (tabContainsActiveProcess(target, 'Actividad')) {
            showRadAlert('Ya existe un proceso activo en la solapa Actividad.', 330, 100);
        } else {
            if (!prms) {
                prms = '';
            }
            targetFrame.src = './Agent4/Asp/Activity.aspx?caller=' + caller + '&action_name=startactivity&start_params=' + prms + '&jobTypeCode=' + jobTypeCode + '&custPkey=' + custPkey + '&jobOriginPkey=' + document.pantalla.todojobkey.value;
        }
    }
}

function RestartActivityFromTab(caller, jobPkey, attPkey, prms) {
    var target = window.parent;
    var targetFrame = target.frames.$get('Actividad');
    if (!targetFrame) {
        showRadAlert('No se encuentra la solapa de la Actividad.', 330, 100);
    } else {
        if (tabContainsActiveProcess(target, 'Actividad')) {
            showRadAlert('Ya existe un proceso activo en la solapa Actividad.', 330, 100);
        } else {
            if (!prms) {
                prms = '';
            }
            targetFrame.src = './Agent4/Asp/Activity.aspx?caller=' + caller + '&action_name=restartactivity&start_params=' + prms + '&jobPkey=' + jobPkey + '&attPkey=' + attPkey + '&jobOriginPkey=' + document.pantalla.todojobkey.value;
        }
    }
}

function ShowCurrentProfileFromHome() {
    ShowProfileFromTab('Inicio', document.pantalla.custpkey.value, '');
}

function ShowProfileFromHome(custPkey, prms) {
    ShowProfileFromTab('Inicio', custPkey, prms);
}

function ShowCurrentProfileFromActivity() {
    ShowProfileFromTab('Actividad', document.pantalla.custpkey.value, '');
}

function ShowProfileFromActivity(custPkey, prms) {
    ShowProfileFromTab('Actividad', custPkey, prms);
}

function ShowProfileFromTab(caller, custPkey, prms) {
    var target = window.parent;
    var targetFrame = target.frames.$get('Perfil');
    if (!targetFrame) {
        showRadAlert('No se encuentra la solapa del Perfil.', 330, 100);
    } else {
        if (!prms) {
            prms = '';
        }
        targetFrame.src = "./Agent4/Asp/Activity.aspx?caller=" + caller + "&action_name=profile&start_params=" + prms + "&custPkey=" + custPkey;
    }
}

function ShowProcessHistoryFromActivity(jobPkey, jobTypeDesc) {
    var target = window.parent;
    var targetFrame = target.frames.$get('Historia');
    if (!targetFrame) {
        showRadAlert('No se encuentra la solapa de Historia.', 330, 100);
    } else {
        targetFrame.src = "./HistoryBrowser.aspx?Pkey=" + jobPkey + "&Name=" + jobTypeDesc + "&HistoryOrigin=Process";
    }
}

function ShowCustomerHistoryFromActivity(custPkey, custName) {
    var target = window.parent;
    var targetFrame = target.frames.$get('Historia');
    if (!targetFrame) {
        showRadAlert('No se encuentra la solapa de Historia.', 330, 100);
    } else {
        targetFrame.src = "./HistoryBrowser.aspx?Pkey=" + custPkey + "&Name=" + custName + "&HistoryOrigin=Customer";
    }
}

function AdjustIframeSize(adjustH, adjustW, minH, minW, maxH, maxW) {
    var frameElement = window.parent.frameElement;
    var activityForm = window.document.pantalla;
    if (adjustH) {
        var H = (activityForm.maxY.value / 13) + 20;
        if (minH > maxH) {
            maxH = minH;
        }
        if (minH > 0 && minH > H) {
            H = minH;
        } else {
            if (maxH > 0 && maxH < H) {
                H = maxH;
            }
        }
        frameElement.setAttribute('height', H + 'px');
    }
    if (adjustW) {
        var W = (activityForm.maxX.value / 13) + 20;
        if (minW > maxW) {
            maxW = minW;
        }
        if (minW > 0 && minW > W) {
            W = minW;
        } else {
            if (maxW > 0 && maxW < W) {
                W = maxW;
            }
        }
        frameElement.setAttribute('width', W + 'px');
    }
}

function GetStartActivityStartUpPrm(user, unit, jobTypeCode, custPkey, jobOriginPkey, prms, callback) {
    var lsParameters = 'user=' + user + '&unit=' + unit + '&action_name=startactivity&jobTypeCode=' + jobTypeCode + '&custPkey=' + custPkey + '&jobOriginPkey=' + jobOriginPkey + '&start_params=' + prms;
    CreateDirectStartUpPrm(lsParameters, callback);
}

function GetRestartActivityStartUpPrm(user, unit, jobPkey, attPkey, jobOriginPkey, prms, callback) {
    var lsParameters = 'user=' + user + '&unit=' + unit + '&action_name=restartactivity&jobPkey=' + jobPkey + '&attPkey=' + attPkey + '&jobOriginPkey=' + jobOriginPkey + '&start_params=' + prms;
    CreateDirectStartUpPrm(lsParameters, callback);
}

function GetProfileStartUpPrm(user, unit, custPkey, prms, callback) {
    var lsParameters = 'user=' + user + '&unit=' + unit + '&action_name=profile&custPkey=' + custPkey + '&start_params=' + prms;
    CreateDirectStartUpPrm(lsParameters, callback);
}

function CreateDirectStartUpPrm(parameters, callback) {
    var url = './CreateDirectStartUpPrm.aspx';
    var request = new Sys.Net.WebRequest();
    request.set_url(url + '?' + parameters);
    request.set_httpVerb('GET');
    request.set_body(null);
    request.get_headers()['Content-Length'] = 0;
    request.add_completed(function OnGetServerDataCompleted(executor, eventArgs) {
        if (executor.get_responseAvailable()) {
            if (callback) {
                callback(executor.get_responseData());
            }
        } else {
            if (executor.get_timedOut()) {
                if (callback) {
                    callback('TimeOut');
                }
            } else {
                if (executor.get_aborted()) {
                    if (callback) {
                        callback('Aborted');
                    }
                }
            }
        }
    });
    request.invoke();
}

function OpenMailClient(custPkey, jobPkey, attPkey, mailFrom, mailTo, mailCC, spKeyTo, spKeyCC, spKeyBody, spPrmKeyBody, mailInDataPkey, showCtrls, frameId, callbackFunction) {
    var prms = 'custPkey=' + custPkey + '&jobPkey=' + jobPkey + '&attPkey=' + attPkey + '&mailFrom=' + mailFrom;
    if (mailTo) {
        prms += '&mailTo=' + mailTo;
    }
    if (mailCC) {
        prms += '&mailCC=' + mailCC;
    }
    if (spKeyTo) {
        prms += '&spKeyTo=' + spKeyTo;
    }
    if (spKeyCC) {
        prms += '&spKeyCC=' + spKeyCC;
    }
    if (spKeyBody) {
        prms += '&spKeyBody=' + spKeyBody;
    }
    if (spPrmKeyBody) {
        prms += '&spPrmKeyBody=' + spPrmKeyBody;
    }
    if (mailInDataPkey) {
        prms += '&mailInDataPkey=' + mailInDataPkey;
    }
    if (showCtrls) {
        prms += '&showCtrls=' + showCtrls;
    }
    if (frameId) {
        var targetFrame = window.frames.$get(frameId);
        if (!targetFrame) {
            showRadAlert('No se encuentra el iframe destino para abrir la interface de envío de email.', 330, 100);
        } else {
            targetFrame.src = './MailClient.aspx?' + prms;
            if (callbackFunction) {
                SetMailClientCallback(window, targetFrame.contentWindow, callbackFunction, 0);
            }
        }
    } else {
        var myMailClient = null;
        var lsTop = '10';
        var lsLeft = '10';
        var lsAncho = '800';
        var lsAlto = '600';
        myMailClient = window.open('./MailClient.aspx?' + prms, 'MailClient', 'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
        myMailClient.focus();
        if (callbackFunction) {
            SetMailClientCallback(window, myMailClient, callbackFunction, 0);
        }
    }
}

function SetMailClientCallback(activityWindow, mailClientWindow, callbackFunction, counter) {
    if (counter < 10) {
        counter++;
        var hdnCallbackFunction = null;
        try {
            hdnCallbackFunction = mailClientWindow.$get('hdnCallbackFunction');
        } catch (e) {
            // Ignore;
        }
        if (hdnCallbackFunction) {
            hdnCallbackFunction.value = callbackFunction;
        } else {
            setTimeout(function () {
                SetMailClientCallback(activityWindow, mailClientWindow, callbackFunction, counter);
            }, 1000);
        }
    } else {
        activityWindow.showRadAlert('No se pudo asignar la función de callback en el cliente de email.', 330, 100);
    }
}

function OpenFreeEmailBody(pPkey, pFileName) {
    var myArchivo = null;
    var lsTop = '10';
    var lsLeft = '10';
    var lsAncho = '800';
    var lsAlto = '450';
    myArchivo = window.open('./DocumentViewer.aspx?action=view&pKey=' + pPkey + '&fileName=' + pFileName, 'FreeEmailBody', 'toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
    myArchivo.focus();
}

function OpenFreeEmailComponents(pPkey) {
    var myAttachments = null;
    var lsTop = '10';
    var lsLeft = '10';
    var lsAncho = '800';
    var lsAlto = '450';
    myAttachments = window.open('./AttachDocuments.aspx?AttachOrigin=Email&ReadOnly=false&ParentPkey=' + pPkey, 'FreeEmailComponents', 'toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=' + lsAncho + ',height=' + lsAlto + ',top=' + lsTop + ',left=' + lsLeft);
    myAttachments.focus()
}

function DeleteFreeEmail(pPkey, pCtlName, pStructId) {
    radconfirm('Está seguro que desea eliminar el email?', function (arg) {
        if (arg) {
            document.getElementsByName(pCtlName)[0].value = pPkey;
            SaltoaEstructura(pStructId);
        }
    }, 330, 100);
}