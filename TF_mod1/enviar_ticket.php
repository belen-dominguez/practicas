<?php

$empresa = $_POST['empresa'];
$usuario = $_POST['usuario'];
$email = $_POST['email'];
$subject = $_POST['problema'];
$prioridad = $_POST['prioridad'];
$message = $_POST['message'];

//attachment
// if (isset($_FILES['attachment']['name']) && $_FILES['attachment']['name'] !=""){
// $file = "attachment/" . basename($_FILES['attachment']['name']);
// move_uploaded_file($_FILES['attachment']['tmp_name'], $file);
// } else {
//     $file = "";
// }
//Get uploaded file data using $_FILES array 
$tmp_name    = $_FILES['attachment']['tmp_name']; // get the temporary file name of the file on the server 
$name        = $_FILES['attachment']['name'];  // get the name of the file 
$size        = $_FILES['attachment']['size'];  // get size of the file for size validation 
$type        = $_FILES['attachment']['type'];  // get type of the file 
$error       = $_FILES['attachment']['error']; // get the error (if any) 

//validate form field for attaching the file 
// if($file_error > 0) 
// { 
//     die('Upload error or No files uploaded'); 
// } 

//read from the uploaded file & base64_encode content 
$handle = fopen($tmp_name, "r");  // set the file handle only for reading the file 
$content = fread($handle, $size); // reading the file 
fclose($handle);                  // close upon completion 

// $encoded_content = chunk_split(base64_encode($content)); 

// $boundary = md5("random"); // define boundary with a md5 hashed value 





$email_body = "Tiene un mensaje del Usuario: $usuario, Empresa: $empresa  \n"."Email: $email \n"."Prioridad: $prioridad\n"."Mensaje:\n $message";
$email_body .="Content-Type: $file_type; name=".$file_name."\r\n"; 
$email_body .="Content-Disposition: attachment; filename=".$file_name."\r\n"; 
// $email_body .="Content-Transfer-Encoding: base64\r\n"; 
// $email_body .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";  
$email_body .= $content; // Attaching the encoded file with email 

$to = "bsigler@i-techno.com.ar";
$headers .= "From: $to \r\n";
$headers .= "Reply-to: $email \r\n";

//enviar email
mail($to,$subject,$email_body,$headers);


//respuesta al cliente
header("Location: msj_exitoso.html")

?>

//."Prioridad: $prioridad\n"."Adjuntos: $pic\n"