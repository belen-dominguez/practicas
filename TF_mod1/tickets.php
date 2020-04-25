<!DOCTYPE html >
<html>
<head>
<meta charset="utf-8" />
<title>Soporte tecnico</title>
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
            <h1>Soporte técnico para <br>Empresas</h1>
            <ul>
                <li><a href="servicios.php">Servicios</a></li><li><a href="contacto.php">Contacto</a></li>
            </ul>
        </div>
    </header>
    <section id="contenido">
    <h2>Abrir un Ticket</h2>
    <form class="form-ticket" method="POST" action="enviar_ticket.php" enctype="multipart/form-data">
        <ul >
            <li>Empresa: <input type="text" name="empresa" required/></li>
            <li>Usuario: <input type="text" name="usuario" required/></li>
            <li>Email: <input type="email" name="email" required/></li>
            <li>Problema: <select name="problema">
                <option value="problema_server">Problemas con servicios de servidor</option>
                <option value="conexion_red">Conexión de red lenta</option>
                <option value="problema_telefonia">Problema con telefonía IP</option>
            </select></li>
            <li>Prioridad:<br>
                <div id="input-prioridad">
                        <input type="radio" name="prioridad" value="Baja"> Baja
                        <input type="radio" name="prioridad" value="Media">Media
                        <input type="radio" name="prioridad" value="Alta" checked>Alta
                </div>
            </li>
            <li>Adjuntos: <input type="file" name="attachment" accept="image/*"></li>
            <li>Información adicional: <textarea name="message" rows="5"></textarea></li>
            <li class="button-submit"><input class="course-link" type="submit" value="Enviar mensaje"/></li>
        </ul>
    </form>

    </section>

<footer>
Desarrollado por <a href="#" target="_new">Desarrollo con PHP y Wordpress</a></footer>
</section>
</body>
</html>