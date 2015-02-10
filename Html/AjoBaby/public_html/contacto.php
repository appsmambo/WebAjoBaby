<?php

if (empty($_POST))
	die('error');

$nombre = ucwords(strtolower($_POST['nombre']));
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$mensaje = $_POST['mensaje'];
$ip = $_SERVER['REMOTE_ADDR'];

$mailHtml = 'Nuevo mensaje desde la web:<br><br>'
		. 'Nombre: ' . $nombre . '<br>'
		. 'Email: ' . $email . '<br>'
		. 'Telefono: ' . $telefono . '<br>'
		. 'Mensaje: ' . $mensaje . '<br>'
		. 'IP: ' . $ip;

$mailText = 'Nuevo mensaje desde la web:'."\r\n\r\n"
		. 'Nombre: ' . $nombre . "\r\n"
		. 'Email: ' . $email . "\r\n"
		. 'Telefono: ' . $telefono . "\r\n"
		. 'Mensaje: ' . $mensaje . "\r\n"
		. 'IP: ' . $ip;
// 

require 'phpmailer/PHPMailerAutoload.php';
$mail = new PHPMailer;
//$mail->SMTPDebug = 3;                               // Enable verbose debug output
/*
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = '';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '';                 // SMTP username
$mail->Password = '';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25; //587;                                    // TCP port to connect to
*/
$mail->From = 'info@ajobaby.com';
$mail->FromName = 'AjoBaby';
$mail->addAddress('info@ajobaby.com');
$mail->addReplyTo('info@ajobaby.com', 'Contacto AjoBaby');
$mail->isHTML(true);                                  // Set email format to HTML
$mail->Subject = 'Contacto AjoBaby';
$mail->Body    = $mailHtml;
$mail->AltBody = $mailText;

if(!$mail->send()) {
	echo 'Message could not be sent.';
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	echo 'OK';
}
