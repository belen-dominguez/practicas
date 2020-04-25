<!DOCTYPE html >
<html>
<head>
<meta charset="utf-8" />
<title>Soporte Tecico - Contacto</title>
<link href="estilos.css" rel="stylesheet"/>
</head>

<body>
<section id="contenedor">
	<header>
    	<nav id="botonera_principal">
        	<ul>
            <li><a href="index.php">Home</a></li><li><a href="servicios.php">Servicios</a></li><li><li><a href="clientes.php">Clientes</a></li><li><a href="contacto.php">Contacto</a></li>
            </ul>
        </nav>
        <div id="marca">
            <h1>Contáctenos</h1><br><br><br>
            <ul>
            <li><a href="tickets.php">Abrir Tickets</a></li><li><a href="servicios.php">Servicios</a></li>
            </ul>
        </div>
    </header>
    <section id="contenido">
    <h2>Contáctenos</h2>

    <form method="POST" action="enviar_mensaje.php">
        <ul class="form">
            <li>Nombre: <input type="text" name="name" required/></li>
            <li>Apellido: <input type="text" name="lastname" required/></li>
            <li>Email: <input type="email" name="email" required/></li>
            <li>Motivo: <select name="subject">
                <option value="consulta">Consulta</option>
                <option value="pedido">Pedido</option>
                <option value="reclamo">Reclamo</option>
            </select></li>
            <li>Mensaje: <textarea name="message" rows="5"></textarea></li>
            <li class="button-submit"><input class="course-link" type="submit" value="Enviar mensaje"/></li>
        </ul>
    </form>

   
    </section>

<footer>
Desarrollado por <a href="#" target="_new">Desarrollo web con PHP y Wordpress</a></footer>
</section>
</body>
</html>