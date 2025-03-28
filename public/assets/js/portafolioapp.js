// funciones app

// SECCION INICIO
// funcion para descargar hoja de vida 
function descargarCV() {
  // Ruta relativa al archivo de CV
  const url = '/public/CV-Profesional-Mauricio-Aguilar.pdf';
    
  // Crear un enlace temporal
  const link = document.createElement('a');
  link.href = url;
  link.download = 'CV-Profesional-Mauricio-Aguilar.pdf'; // Nombre del archivo que se descargará
    
  // Simular el clic en el enlace para iniciar la descarga
  document.body.appendChild(link);
  link.click();
    
  // Eliminar el enlace temporal
  document.body.removeChild(link);
  }

// SECCION SERVICIOS
//  Funcion Slider Servicios
$(document).ready(function () {
  $('.slider').slick({
    dots: true, // Muestra puntos de navegación
    infinite: true, // Desplazamiento infinito
    speed: 300, // Velocidad de transición
    slidesToShow: 3, // Muestra 3 tarjetas a la vez en desktop
    slidesToScroll: 1, // Desplaza una tarjeta a la vez
    autoplay: true, // Autoplay opcional
    autoplaySpeed: 3000, // Velocidad del autoplay
    arrows: true, // Muestra flechas de navegación
    prevArrow: '<button type="button" class="slick-prev">Anterior</button>', // Personaliza la flecha anterior
    nextArrow: '<button type="button" class="slick-next">Siguiente</button>', // Personaliza la flecha siguiente
    centerMode: true, // Centra la tarjeta activa en responsive
    centerPadding: '0', // Elimina el padding adicional en el centro
    responsive: [
      {
        breakpoint: 768, // Ajustes para pantallas menores a 768px
        settings: {
          slidesToShow: 1, // Muestra 1 tarjeta a la vez en responsive
          slidesToScroll: 1,
          centerMode: true, // Centra la tarjeta activa
          centerPadding: '20px', // Añade un pequeño padding para que no se pegue a los bordes
        }
      }
    ]
  });
});
 
//SECCION HABILIDADES

// Funcion que carga las animaciones de las habilidades
// Carga de gráficos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  // Datos de habilidades
  const skills = {
    Desarrollo: [
      { id: "chartJavaScript", label: "", value: 75 },
      { id: "chartPython", label: "", value: 75 },
      { id: "chartHTML5", label: "", value: 80 },
      { id: "chartCSS3", label: "", value: 80 },
    ],
    Frameworks_Librerias: [
      { id: "chartReact.js", label: "", value: 60 },
      { id: "chartNode.js", label: "", value: 60 },
      { id: "chartExpress.js", label: "", value: 60 },
    ],
    Herramientas: [
      { id: "chartGit-GitHub", label: "", value: 80 },
      { id: "chartPostman", label: "", value: 60 },
      { id: "chartVisualStudio", label: "", value: 90 },
    ],
    Base_datos: [
      { id: "chartMySQL", label: "", value: 70 },
      { id: "chartMongoDB", label: "", value: 60 },
    ],
    "Sistemas operativos": [
      { id: "chartWindows", label: "", value: 80 },
      { id: "chartMacOS", label: "", value: 80 },
    ],
  };

  // Crear gráficos de barras
  Object.values(skills).flat().forEach(({ id, label, value }) => {
    const ctx = document.getElementById(id).getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [label],
        datasets: [
          {
            label: "Porcentaje",
            data: [value],
            backgroundColor: "rgba(16, 1, 155, 0.7)", // Color de fondo
            borderColor: "rgba(0, 0, 0, 0.5)", // Color del borde
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100, // Escala del 0 al 100%
          },
        },
      },
    });
  });
});

// Funcion que detecta cuando lanza la animacion de los skills
function cargarAnimaciones() {
  console.log("Animaciones aplicadas a las habilidades.");
}

function efectoSkills() {
  const skills = document.getElementById("skills");
  const distanciaSkills = window.innerHeight - skills.getBoundingClientRect().top;
  
  if (distanciaSkills >= 300) {
    const habilidades = document.getElementsByClassName("chart");

    // Añadir clases de animación a cada habilidad
    Array.from(habilidades).forEach((habilidad, index) => {
      const animaciones = [
        "chartJavaScript", "chartPython", "chartHTML5", "chartCSS3", 
        "chartReact.js", "chartNode.js", "chartExpress.js", 
        "chartGit-GitHub", "chartPostman", "chartVisualStudio", 
        "chartMySQL", "chartMongoDB"
      ];

      habilidad.classList.add(animaciones[index]);
    });
    if (typeof cargarAnimaciones === "function") {
      cargarAnimaciones();
    } else {
      console.warn("La función cargarAnimaciones no está definida.");
    }
  
  }
}
// Funcion que detecta el scrolling para aplicar las animaciones de las skills
window.onscroll = function() {
  efectoSkills();
};

// SECCION PROYECTOS
// Funcion para filtrar las categorias de los proyectos
function verCategoria(cat) {
  const items = document.getElementsByClassName("item");
  // Ocultar todos los items
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "none";
  }

  // Mostrar los items de la categoría seleccionada
  const itemCat = document.getElementsByClassName(cat);
  for (let i = 0; i < itemCat.length; i++) {
    itemCat[i].style.display = "block";
  }

  // Eliminar la clase "borde" de todos los enlaces
  const links = document.querySelectorAll(".proyectos nav a");
  links.forEach(link => link.classList.remove("borde"));

  // Agregar la clase "borde" al enlace seleccionado
  const itemSeleccionado = document.getElementById(cat);
  itemSeleccionado.classList.add("borde");
}

// SECCION MI HISTORIA
//Funcion para  la linea de tiempo y el carrusell
document.addEventListener('DOMContentLoaded', function() {
  const momentos = document.querySelectorAll('.momento');
  const imagenActiva = document.getElementById('imagen-activa');
  
  // Función para actualizar la imagen
  function actualizarImagen(src) {
    imagenActiva.classList.remove('loaded');
    
    // Pequeño retraso para permitir la transición
    setTimeout(() => {
      imagenActiva.src = src;
      imagenActiva.alt = `Imagen descriptiva de la trayectoria: ${src.split('/').pop()}`;
      
      // Forzar recarga de la imagen en caché
      imagenActiva.onload = () => {
        imagenActiva.classList.add('loaded');
      };
    }, 300);
  }

  // Manejar clic en los momentos
  momentos.forEach(momento => {
    momento.addEventListener('click', function() {
      // Remover clase active de todos los momentos
      momentos.forEach(m => m.classList.remove('active'));
      
      // Añadir clase active al momento seleccionado
      this.classList.add('active');
      
      // Obtener y actualizar imagen
      const nuevaImagen = this.getAttribute('data-img');
      actualizarImagen(nuevaImagen);
    });
  });

  // Activar el primer momento por defecto
  if (momentos.length > 0) {
    momentos[0].click();
  }
});

// SECCION CONTACTO
// funcion para enviar mensaje de correo cuando se llene la informacion del formulario y se le de click en enviar.
const form = document.querySelector(".form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validaciones del formulario
  const nombre = form.nombre.value.trim();
  const correo = form.correo.value.trim();
  const mensaje = form.mensaje.value.trim();

  // Mensajes de error
  if (!nombre) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  if (!mensaje) {
    alert("Por favor, escribe un mensaje.");
    return;
  }

  // Datos del formulario
  const formData = { nombre, correo, mensaje };

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Correo enviado exitosamente.");
      form.reset();
    } else {
      alert("Error al enviar el correo. Inténtalo nuevamente.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error. Por favor, inténtalo más tarde.");
  }
});


//SECCION FOOTER
// footer
document.getElementById("year").textContent = new Date().getFullYear();

//SECCION MOVIL 
// funcion que muestra el menu responsive
function responsiveMenu() {
  
  let nav = document.getElementById("nav");
  let closeButton = document.getElementById("close-btn");

  if (nav.className === "") {
    nav.className += " responsive";

    // Crear el botón de cierre si no existe
    if (!closeButton) {
      let span = document.createElement("span");
      span.id = "close-btn"; // Añadimos un id para identificarlo
      span.innerHTML = "X";
      span.style.cursor = "pointer";
      span.style.fontSize = "20px";
      span.style.marginLeft = "auto"; // Alinear al final del menú
      span.style.color = "#fff";
      span.style.padding = "10px";

      nav.appendChild(span);

      // Agregar funcionalidad al botón de cierre
      span.onclick = function () {
        nav.className = "";
        span.remove(); // Eliminar el botón
      };
    }
  } else {
    nav.className = "";
    if (closeButton) {
      closeButton.remove(); // Eliminar el botón si el menú se cierra
    }
  }
}

// funcion para cerrar el menu responsive  cuando se haga click en el menu
const links = document.querySelectorAll("#nav a");
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    var x = document.getElementById("nav");
    x.className = "";

    // se crea el elemento que cierra el menu
    btnEliminar = this.querySelector("#nav span");
    if (btnEliminar) {
      btnEliminar.remove();
    }
  }
}

//RESALTAR SECCION ACTIVA - MENU
// Función para resaltar la sección activa en el menú
function resaltarSeccionActiva() {
  const secciones = document.querySelectorAll(" section"); // Todas las secciones
  const enlaces = document.querySelectorAll("#nav a"); // Todos los enlaces del menú

  secciones.forEach((seccion, index) => {
    const rect = seccion.getBoundingClientRect(); // Obtiene la posición de la sección
    if (rect.top <= 100 && rect.bottom >= 100) { // Ajusta el valor 100 según sea necesario
      // Remueve la clase activa de todos los enlaces
      enlaces.forEach((enlace) => enlace.classList.remove("active"));
      // Agrega la clase activa al enlace correspondiente
      enlaces[index].classList.add("active");
    }
  });
}

// Escucha el evento de scroll para llamar a la función
window.addEventListener("scroll", resaltarSeccionActiva);

// Llama a la función al cargar la página para resaltar la sección inicial
resaltarSeccionActiva();






