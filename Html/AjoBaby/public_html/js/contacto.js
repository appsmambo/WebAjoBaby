jQuery.validator.addMethod("nombre", function(value, element) {
	return this.optional(element) || /^[a-zA-Z áéíóúÁÉÍÓÚÑñ]+$/.test(value);
});
$(document).ready(function() {
	$('#form-contacto').validate({
		rules: {
			nombre: {
				required:true,
				nombre:true
			},
			email: {
				required:true,
				email:true
			},
			telefono: {
				required:true,
				number:true
			},
			mensaje : {
				required:true
			},
			privacidad: {
				required:true
			}
		},
		messages: {
			nombre: {
				required: "Ingrese su nombre completo",
				nombre: "Ingrese su nombre correctamente"
			},
			email: {
				required: "Ingrese su email",
				email: "Ingrese su email correctamente"
			},
			telefono: {
				required: "Ingrese su teléfono",
				number: "Ingrese su teléfono correctamente"
			},
			mensaje: {
				required: "Ingrese su mensaje"
			},
			privacidad: {
				required: "&nbsp;&nbsp;*&nbsp;&nbsp;"
			}
		},
		submitHandler: function(form) {
			$('#enviar').prop('disabled', 'disabled');
			$.ajax({
				type: "POST",
				url: 'contacto.php',
				data: $('#form-contacto').serialize(),
				success: function(res) {
					console.log(res);
					if (res == 'OK') {
						$('.fondo-contacto').block({css: {width:'300px', border: 'none', padding: '18px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .9, color: '#fff'}, message: 'Gracias, sus datos han sido registrados.'});
						setTimeout(function() {
							$('.inputbox').val('');
							$('.fondo-contacto').unblock({
								onUnblock: function() {
								}
							});
						}, 3000);
					} else {
						$('.fondo-contacto').block({css: {width:'300px', border: 'none', padding: '18px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .9, color: '#fff'}, message: 'Vuelva a intentarlo.'});
						setTimeout(function() {
							$('.fondo-contacto').unblock({
								onUnblock: function() {
								}
							});
						}, 3000);
					}
					$('#enviar').prop('disabled', '');
				},
				dataType: 'text'
			});
			return false;
		}
	});
});