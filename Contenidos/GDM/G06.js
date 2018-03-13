

function setOnchange() {
	                 
	document.getElementById("0000000160_98ctl_24").onchange = function() {
               
				almacenarSeleccion('ESTADO','COMBO');
                                SaltoaEstructura('0000117622_7');
	}	 
}


function Setcheck(){
	
	document.getElementById("chk1").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
				   if(chk[0].checked){
					  almacenarSeleccion('IND_1','1');
				   }else{
					   almacenarSeleccion('IND_1','');
				   }
			   
	}
	
	document.getElementById("chk2").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[1].checked){
					  almacenarSeleccion('IND_2','2');
				   }else{
					   almacenarSeleccion('IND_2','');
				   }
			   //}
	}
	document.getElementById("chk3").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[2].checked){
					  almacenarSeleccion('IND_3','3');
				   }else{
					   almacenarSeleccion('IND_3','');
				   }
			   //}
	}
	document.getElementById("chk4").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[3].checked){
					  almacenarSeleccion('IND_4','4');
				   }else{
					   almacenarSeleccion('IND_4','');
				   }
			   //}
	}
	document.getElementById("chk5").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[4].checked){
					  almacenarSeleccion('IND_5','5');
				   }else{
					   almacenarSeleccion('IND_5','');
				   }
			   //}
	}
	document.getElementById("chk6").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[5].checked){
					  almacenarSeleccion('IND_6','6');
				   }else{
					   almacenarSeleccion('IND_6','');
				   }
			   //}
	}
	document.getElementById("chk7").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[6].checked){
					  almacenarSeleccion('IND_7','7');
				   }else{
					   almacenarSeleccion('IND_7','');
				   }
			   //}
	}
	document.getElementById("chk8").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[7].checked){
					  almacenarSeleccion('IND_8','8');
				   }else{
					   almacenarSeleccion('IND_8','');
				   }
			   //}
	}
	document.getElementById("chk9").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[8].checked){
					  almacenarSeleccion('IND_9','9');
				   }else{
					   almacenarSeleccion('IND_9','');
				   }
			   //}
	}
	document.getElementById("chk10").onchange = function() {
	
               var chk = document.getElementsByName("checkbox");
			 //  for(var i=0; i < chk.length; i++){ 
				   if(chk[9].checked){
					  almacenarSeleccion('IND_0','0');
				   }else{
					   almacenarSeleccion('IND_0','');
				   }
			   //}
	}
	
		
	
}

function desabilitarCampos(){
	
    var fechaDesde = document.getElementsByName('CALL.FECHA_DESDE:ctl_13')[0];
	var fechaHasta = document.getElementById('campofecha_fecha_14_1');
	var actividad = document.getElementById('0000000162_98ctl_26');
	var procesos = document.getElementById('0000000160_98ctl_24');
	var unidad = document.getElementById('0000000159_98ctl_25');
	var excluyente = document.getElementById('0000000002_98ctl_54');
	
	var descLista = document.getElementsByName('CALL.DESC_LISTA:ctl_12')[0];
	var prioridad = document.getElementsByName('CALL.PRIORIDAD:ctl_21')[0];

    fechaDesde.disabled = true;
	fechaHasta.disabled = true;
	actividad.disabled = true;
	procesos.disabled = true;
    unidad.disabled = true;
	excluyente.disabled = true;
	descLista.disabled = true;
	prioridad.disabled = true;
	
}





