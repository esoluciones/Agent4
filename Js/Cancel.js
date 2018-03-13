
var engTipoProgramacion;
var engOpcionEstado;

function asignarTipo(opcion){
	engTipoProgramacion = opcion;
}

function dis_prg_agent(){
	document.pantalla.agentes.disabled = true;
}

function en_prg_agent(){
	document.pantalla.agentes.disabled = false;
}

function cancelEnter(){
	if(window.event.keyCode == 13) return false;
}

function env_closeAtt(){
    var activityStarted = false;
    var telefono = document.pantalla.telefono.value;
    if ((telefono!='') && (isNaN(telefono))){
        showRadAlert("El valor ingresado en el campo Telefono no es valido, ingrese solo numeros.", 330, 100);
	} else {
	    if (vvClosedAtt()) {
	        showRadAlert('Debe seleccionar un estado', 330, 100);
	    } else {
	        if (engOpcionEstado == "opened"){
		        if (vvProgOtroAgente()) {
		            showRadAlert('Debe seleccionar un usuario.', 330, 100);
		        } else {
		            if (document.pantalla.tipoProg[1].checked==false){
		                var fechaActual = new Date();
                        var diaActual = fechaActual.getDate();
                        var mesActual = fechaActual.getMonth()+1;
                        var fechaProg = document.pantalla.fec_prog.value;
			            if (diaActual<10) {
				            diaActual="0"+diaActual;
				        }
			            if (mesActual<10) {
				            mesActual="0"+mesActual;
				        }
			            fechaProg=fechaProg.substring(6,10)+fechaProg.substring(3,5)+fechaProg.substring(0,2);
			            fechaActual=fechaActual.getYear()+mesActual+diaActual;
			            if (parseInt(fechaProg)<parseInt(fechaActual) ){
			                showRadAlert("El campo Fecha no puede ser menor a la fecha actual.", 330, 100);
			            } else {
                            var loHora = new Date();
 	                        var loHours = loHora.getHours();
 	                        var loMinutes = loHora.getMinutes();
 	                        var lnHora;
				            if (loHours==0){
				                loHours = 12;
				            }
				            if (loHours<=9){
				                loHours = "0" + loHours;
				            }
				            if (loMinutes<=9){
				                loMinutes = "0" + loMinutes;
				            }
				            lnHora = document.pantalla.hora_prog.value.substring(0,2) + "" + document.pantalla.hora_prog.value.substring(3,5);
				            loHora = "" + loHours + loMinutes;
				            if ((parseInt(fechaProg,10)==parseInt(fechaActual,10)) && (parseInt(lnHora,10) < parseInt(loHora,10))){
				                showRadAlert("La hora de programacion no puede ser menor a la hora actual.", 330, 100);
				            } else {
				                activityStarted = true;
				            }
			            }
		            } else {
		                activityStarted = true;
		            }
                }
	        } else {
	            activityStarted = true;
	        }
	        if (activityStarted) {
	            if ((document.pantalla.closedCombo.disabled == true) && (IsValidTime(document.pantalla.hora_prog.value) == false)){
		            activityStarted = false;
                }
            }
	    }
    }
    if (activityStarted) {
        SubmitActivityForm();
    }
}

function habilitar(opcion){
	if (opcion == 'opened'){
		engOpcionEstado = 'opened';
		document.pantalla.openedCombo.disabled = false;
		document.pantalla.closedCombo.disabled = true;
		document.pantalla.causeNoContact.disabled = true;
		op = document.pantalla.openedCombo.options[document.pantalla.openedCombo.selectedIndex].text;
		if (op == 'Necesita Informacion') {
			document.getElementById('prog_atencion').style.display='block';
	    }
		if (engTipoProgramacion != 'NOPROGRAMAR'){
			toggleT('Fecha','s');
			toggleT('Calendario','s');
			toggleT('Hora','s');
		}
	}
	else {
		engOpcionEstado = 'closed';
		document.pantalla.openedCombo.disabled = true;
		document.pantalla.closedCombo.disabled = false;
		document.getElementById('prog_atencion').style.display="none";
		toggleT('Fecha','h');
		toggleT('Calendario','h');
		toggleT('Hora','h');
	}
}

function chgOpenCombo(){
	op = document.pantalla.openedCombo.options[document.pantalla.openedCombo.selectedIndex].text;
	document.getElementById('prog_atencion').style.display="block";
}

function chgClosedCombo(){
	op = document.pantalla.closedCombo.options[document.pantalla.closedCombo.selectedIndex].text;
	if (op == 'No Contacto') {
		document.pantalla.causeNoContact.disabled = false;
		toggleT('causa','s');
	}
	else {
		document.pantalla.causeNoContact.disabled = true;
		toggleT('causa','h');
	}
}

function vvClosedAtt(){
	if (document.pantalla.openedCombo.disabled == false){
		if (document.pantalla.openedCombo.value == '') return true;
		else return false;
	}
	if (document.pantalla.closedCombo.disabled == false){
		if (document.pantalla.closedCombo.value == '') return true;
		else{
			if (document.pantalla.closedCombo.value == 'NOCONTACTO'){
				if (document.pantalla.causeNoContact.value == '') return true;
				else return false;
			}
			else return false;
		}
	}
	return true;
}

function vvProgOtroAgente(){
	if (document.pantalla.tipoProg[3].checked==true){
		if (document.pantalla.agentes.value == '') return true;
				else return false;
	}
}
