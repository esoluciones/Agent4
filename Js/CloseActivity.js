
function selectAccion(psAccion,poFecha,poFechaOld,poHora,poHoraOld,psCalendar){
	if (psAccion == 'SI'){
		poFecha.value = poFechaOld.value.replace("-","/");
		poHora.value = poHoraOld.value;
		poHora.disabled = false;
		document.images[psCalendar].disabled = false;
	}else{
		poFechaOld.value = poFecha.value.replace("-","/");
		poHoraOld.value = poHora.value;
		poFecha.value = '';
		poHora.value = '';
		poHora.disabled = true;
		document.images[psCalendar].disabled = true;
	}
}

function removeOption(sCmb){
	var cantTope = document.getElementById(sCmb.name).length;
	for (var i=0; i<cantTope; i++) {
	    document.getElementById(sCmb.name).remove(cantTope - 1 - i);
	}
    sCmb.disabled = true;
	return;
}

function nuevaOption(sCmb, tArray, myForm) {
    removeOption(sCmb);
    sCmb.disabled = false;
    if (tArray.length < 2) {
        sCmb.disabled = true;
    } else {
        if (sCmb.add) {
            for (var i = 0; i < tArray.length; i++) {
                sCmb.add(addOption(i, tArray));
            }
        } else {
            if (sCmb.appendChild) {
                for (var i = 0; i < tArray.length; i++) {
                    sCmb.appendChild(addOption(i, tArray));
                }
            } else {
                return true;
            }
        }
    }
}

function addOption(index,dataArray){
	var newOption = document.createElement('OPTION');
	if (dataArray[index]==''){
		newOption.text='';
		newOption.value='';
	}else{
		myValor = new String(dataArray[index]);
		splitValor = myValor.split(',');
		newOption.text = splitValor[1];
		newOption.value = splitValor[0]+','+splitValor[1];
	}
	return newOption;
}

function derivar(){
    var activityStarted = false;
    var mensaje = '';
	var cont = 0;
	for (var i=0; i < document.pantalla.elements.length; i++ ){
		myInput	= document.pantalla.elements.item(i);
		if ((myInput.type == 'checkbox') && (myInput.checked == true)) {
			cont++;
			mensaje = val_fila(myInput.name.substr(3));
			if (mensaje != ''){
			    break;
			}
		}
	}
	if (mensaje != ''){
	    showRadAlert(mensaje, 330, 100);
	} else {
	    if (cont < 1){
            if (document.getElementById('MultipleInstances1').value == 'True'){
                showRadAlert("Por favor, seleccione al menos una Atención.", 330, 100);
            } else {
                mensaje = val_fila_single();
                if (mensaje != ''){
                    showRadAlert(mensaje, 330, 100);
                } else {
                    activityStarted = true;
                }
            }
	    } else {
	        activityStarted = true;
	    }
	}
    if (activityStarted) {
        SubmitActivityForm();
    }
}

function val_fila_single(){
	var myAtt = document.getElementById('attCode1').value;
	var idGrupo	= "tGrupo" + myAtt + "1";
	var myGrupo	= document.getElementById(idGrupo);
	if (myGrupo.options[myGrupo.selectedIndex].value == '') {
		return "Por Favor, Seleccione un Grupo de Atención.";
	}else{
		return "";
	}
}

function val_fila(psFila){
	var idAtt = "attCode" + psFila;
	var myAtt = document.getElementById(idAtt).value;
	var idGrupo = "tGrupo" + myAtt + psFila;
	var idAccion = "tProg" + myAtt + psFila;
	var myGrupo = document.getElementById(idGrupo);
	var myAccion = document.getElementById(idAccion);
	if (myGrupo.options[myGrupo.selectedIndex].value != ''){
		if (myAccion.options[myAccion.selectedIndex].value != ''){
			return '';
		}else{
			return "Por Favor, Seleccione un Tipo de Accion.";
		}
	}else{
	    return "Por Favor, Seleccione un Grupo de Actividad.";
	}
}

function cancelEnter(){
	if(window.event.keyCode == 13) {
	    return false;
	}
}

function CloseJob(){
    var activityStarted = false;
	if (vCloseJob()) {
	    showRadAlert('Debe seleccionar un estado', 330, 100);
	} else {
	    activityStarted = true;
	}
    if (activityStarted) {
	    document.pantalla.action_name.value = "closejob";
	    SubmitActivityForm();
    }
}

function vCloseJob() {
	if (document.pantalla.estado.value == ''){
		return true;
	}else{
	    return false;
	}
}
