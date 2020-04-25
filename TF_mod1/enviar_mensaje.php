<?php

$name = $_POST['name'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$email_body = "Tiene un mensaje del Usuario: $name $lastname \n"."Email: $email \n"."Mensaje:\n $message";

$to = "bsigler@i-techno.com.ar";
$headers .= "From: $to \r\n";
$headers .= "Reply-to: $email \r\n";

//enviar email
mail($to,$subject,$email_body,$headers);


//respuesta al cliente
header("Location: msj_exitoso.html")

?>