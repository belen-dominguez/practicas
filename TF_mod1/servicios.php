<!DOCTYPE html >
<html>
<head>
<meta charset="utf-8" />
<title>Soporte tecnico - Servicios</title>
<link href="estilos.css" rel="stylesheet"/>
</head>

<body>
<section id="contenedor">
	<header>
    	<nav id="botonera_principal">
        	<ul>
            	<li><a href="index.php">Home</a></li><li><a href="servicios.php">Servicios</a></li><li><a href="clientes.php">Clientes</a></li><li><a href="contacto.php">Contacto</a></li>
            </ul>
        </nav>
        <div id="marca">
          <h1>Nuestros Servicios</h1><br><br><br>
          <ul>
          <li><a href="tickets.php">Abrir Tickets</a></li><li><a href="contacto.php">Contacto</a></li>
          </ul>
        </div>
    </header>
    <section id="contenido">
    <?php 
    if (isset ($_GET['id'])) {
      switch ($_GET['id']) {
        case 'consultoria':
          $title='Consultoria IT';
          $description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
          $image='images/consultoria.jpg';
          break;
        
        case 'redes':
          $title='Conectividad y Redes';
          $description='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
          $image='images/redes.jpg';
          break;  

        case 'servidores':
          $title='Administración de Servidores';
          $description='At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.';
          $image='images/servidores.jpg';
          break;    
      }
    
    ?>

      <h1><?php echo $title; ?></h1>
    <div class="content-servicios">
      <p><?php echo $description; ?></p>
      <img src='<?php echo $image; ?>' alt="Imgen_curso" width="600px" height="300px" >
    </div>
      <ul>
        <li><a class="course-link" href="servicios.php?id=consultoria">Consultoria IT</a></li>
        <li><a class="course-link" href="servicios.php?id=redes">Conectividad y Redes</a></li>
        <li><a class="course-link" href="servicios.php?id=servidores">Administración Servidores</a></li>
    </ul>

    <?php 
    }
    else {
      
      echo '<br/><h3>Seleccione un servicio </h3>
      <div class="servicios">
          <ul>
              <li><img src="images/consultoria.jpg"><a href="servicios.php?id=consultoria">Consultoría IT</a></li>
              <li><img src="images/redes.jpg"><a href="servicios.php?id=redes">Conectividad y Redes</a></li>
              <li><img src="images/servidores.jpg"><a href="servicios.php?id=servidores">Administración de Servidores</a></li>
          </ul>
      </div>';
      
    }
     ?>
    
    </section>

<footer>
Desarrollado por <a href="#" target="_new">Desarrollo web con PHP y Wordpress</a></footer>
</section>
</body>
</html>