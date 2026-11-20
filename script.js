/* ============================================================================
   script.js  —  DATOS DINÁMICOS E INTERACTIVIDAD DEL SITIO
   ----------------------------------------------------------------------------
   Este archivo se carga al final de index.html.

   ÍNDICE:
     0. CONFIGURACIÓN GENERAL                         ✅ SEGURO MODIFICAR
     1. DATOS DE SERVICIOS                            ✅ SEGURO MODIFICAR
     2. DATOS DE PROYECTOS                            ✅ SEGURO MODIFICAR
     3. CÓDIGO QUE DIBUJA TARJETAS DE SERVICIOS Y PROYECTOS   ⚠️ NO MODIFICAR
     4. PROYECTOS INTERACTIVOS (clic / teclado)       ⚠️ NO MODIFICAR
     5. MENÚ MÓVIL                                    ⚠️ NO MODIFICAR
     6. EFECTOS DE SCROLL (borde del menú y enlace activo)    ⚠️ NO MODIFICAR
     7. TEMA CLARO / OSCURO                           ⚠️ NO MODIFICAR
     8. FORMULARIO DE CONTACTO (validación y envío)   ⚠️ SOLO TEXTOS Y REGLAS
     9. BOTÓN FINAL Y AÑO DEL PIE DE PÁGINA           ⚠️ NO MODIFICAR

   LEYENDA:
     ✅ SEGURO MODIFICAR  = son datos y textos; puedes editarlos sin miedo.
     ⚠️ NO MODIFICAR      = es lógica. Déjalo igual a menos que entiendas
                            JavaScript; un error aquí puede romper el sitio.

   REGLAS BÁSICAS AL EDITAR DATOS:
     · Los textos van entre comillas: "así" o 'así'.
     · Cada elemento va dentro de llaves { ... } y se separa del siguiente con
       una coma. El ÚLTIMO elemento no lleva coma detrás.
     · Si tu texto lleva comillas dobles dentro, escríbelas como \"así\",
       o usa comillas simples para envolver el texto.
     · Si algo deja de funcionar, abre la consola del navegador (tecla F12 →
       pestaña "Console") para ver dónde está el error.
   ============================================================================ */


/* ============================================================================
   0. CONFIGURACIÓN GENERAL                                  ✅ SEGURO MODIFICAR
   ============================================================================ */

/* Correo al que se enviará el formulario de contacto.
   (Cámbialo también en index.html, en la sección de Contacto, para que el
   enlace visible coincida.) */
const CORREO_DE_CONTACTO = "hello@alderstudio.example";

/* ============ FIN SECCIÓN 0 ============ */


/* ============================================================================
   1. DATOS DE SERVICIOS                                     ✅ SEGURO MODIFICAR
   ----------------------------------------------------------------------------
   Cada servicio es un bloque { ... } con tres campos:
     title : título de la tarjeta.
     text  : descripción.
     icon  : icono dibujado con trazos SVG (ver más abajo).

   ► EDITAR un servicio: cambia el texto entre comillas de title o text.
   ► AGREGAR un servicio: copia un bloque completo { ... } (con su coma final),
     pégalo dentro de la lista y cambia sus textos. La rejilla se reacomoda sola.
   ► DUPLICAR: igual que agregar; copia y pega un bloque.
   ► ELIMINAR: borra el bloque completo, desde { hasta }, incluida su coma.
   ► ¡Cuida la sintaxis! Cada bloque termina en "}," excepto el último ("}").

   SOBRE LOS ICONOS (campo icon):
     Es el contenido de un <svg viewBox="0 0 24 24"> (lienzo de 24x24).
     Se escribe entre comillas SIMPLES y contiene etiquetas <path d="..."/>.
     Los estilos (color, grosor de línea, tamaño de 40px) se controlan en
     styles.css, sección 7 (".card svg"). Puedes tomar iconos gratuitos de
     sitios como lucide.dev o heroicons.com ("Copy SVG") y pegar SOLO lo que
     está dentro de la etiqueta <svg>…</svg>.
   ============================================================================ */
const services = [
  { title:"Diseño arquitectónico", text:"Casas y edificios cívicos moldeados por la luz del día, vistas y clima, desde el concepto hasta los planos de construcción.",
    icon:'<path d="M3 21V10l9-6 9 6v11M9 21v-7h6v7"/>' },
  { title:"Construcción sustentable", text:"Métodos de construcción bajos en carbono, madera y tierra locales, y supervisión de obra que protege el suelo sobre el que construyes.",
    icon:'<path d="M4 20h16M6 20V9l6-4 6 4v11M10 13h4"/>' },
  { title:"Consultoría ecológica", text:"Modelado energético, evaluaciones de carbono y estudios de biodiversidad para guiar las decisiones antes de que comience el diseño.",
    icon:'<path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14zM5 19l7-7"/>' },
  { title:"Arquitectura de paisaje", text:"Plantación nativa, jardines sensibles al agua y espacios al aire libre que extienden el edificio hacia su entorno.",
    icon:'<path d="M12 21v-8M12 13c-4 0-6-3-6-7 4 0 6 3 6 7zM12 15c3 0 5-2 5-5-3 0-5 2-5 5z"/>' },
  { title:"Diseño de interiores", text:"Interiores cálidos y saludables con acabados naturales, materiales de baja emisión y muebles hechos para durar.",
    icon:'<path d="M5 12V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M3 12h18v5H3zM6 17v3M18 17v3"/>' },
    
];
/* ============ FIN SECCIÓN 1 ============ */


/* ============================================================================
   2. DATOS DE PROYECTOS SELECCIONADOS                       ✅ SEGURO MODIFICAR
   ----------------------------------------------------------------------------
   Cada proyecto es un bloque { ... } con estos campos:
     title : nombre del proyecto.
     place : ciudad o lugar.
     text  : descripción (aparece al pasar el mouse o hacer clic).
     image : (OPCIONAL) ruta de una FOTO, por ejemplo "assets/images/proyecto-1.jpg".
             · Si la dejas vacía ("") se muestra la ilustración vectorial.
             · Si pones una ruta, se muestra tu foto en lugar de la ilustración.
     kind  : número 0, 1, 2 o 3 = qué ilustración vectorial dibujar
             (0 volúmenes de madera, 1 pabellón con cubierta inclinada,
              2 bloque en terrazas, 3 casas con patio). Se ignora si usas image.
     sky   : color del cielo de la ilustración.   (solo para ilustraciones)
     hill  : color de las colinas de la ilustración. (solo para ilustraciones)

   ► PARA USAR UNA FOTO (paso a paso):
       1) Guarda la foto en la carpeta  assets/images/  (ej. proyecto-1.jpg).
          Se recomienda formato horizontal, mínimo 1200px de ancho.
       2) En el proyecto, escribe:  image:"assets/images/proyecto-1.jpg"
       3) Verifica que el nombre y la extensión coincidan EXACTAMENTE
          (mayúsculas y minúsculas incluidas) y que el archivo exista; si no,
          verás una imagen rota.
     Para cambiar el tamaño/proporción o el recorte de las fotos, ve a
     styles.css, sección 8: "aspect-ratio" (proporción) y "object-position"
     (qué parte de la foto se ve).

   ► AGREGAR un proyecto: copia un bloque completo { ... }, pégalo dentro de la
     lista (con su coma) y edita sus datos.
     NOTA SOBRE EL DISEÑO: la rejilla alterna anchos (7-5-5-7 columnas) para
     los proyectos 1 a 4; del 5 en adelante ocupan media fila. Si quieres otro
     patrón, edita las reglas ":nth-child" en styles.css, sección 8.
   ► ELIMINAR: borra el bloque completo, desde { hasta }, con su coma.
   ============================================================================ */
const projects = [
  { title:"BIBLIOTECA EJE CENTRAL", place:"Puebla, México", image:"proyecto-1.jpeg", kind:0, sky:"#d7d0b8", hill:"#6f8f74",
    text:" Fue un diseño sustentable ya que se implento un patio central biclimatico por parte del diseño donde se incorporaron arboles y vegetacion. Se uso como un regulador termico, iluminacion natural, ventilacion natural y captacion del agua. Asi mismo se utilizaron materiales sustentables y se implementaron azoteas verdes." },
  { title:"AIRBNB", place:"Ciudad Mier, Tamaulipas, México", image:"proyecto-2.jpeg", kind:1, sky:"#e2d6bd", hill:"#86a083",
    text:"Fue un diseño sustentable ya que se desarrollo con tecnologias y estrategias sustentables. Un proyecto con un clima calido semiarido por lo que utilizamos materiales con buena inercia termica, colores para reflejar radiacion solar, muros verdes, se uso una ventilacion cruzada de aprte del diseño, celosias verticales de madera y volados, riego por goteo, paneles solares, calentadores solares, captacion de agua pluvial y vegetacion nativa." },
  { title:"UNIVERSIDAD PRIVADA", place:"Querétaro, México", image:"proyecto-3.jpeg", kind:2, sky:"#cdd6c8", hill:"#5f7d68",
    text:" Un proyecto con un clima calido semiarido por lo que utilizamos materiales con buena inercia termica, colores para reflejar radiacion solar, muros verdes, se uso una ventilacion cruzada de aprte del diseño, celosias verticales de madera y volados, riego por goteo, paneles solares, calentadores solares, captacion de agua pluvial y vegetacion nativa." },
  { title:"RESTAURANTE ARBOREA", place:"Puebla, México", image:"proyecto-4.png", kind:3, sky:"#e6dcc3", hill:"#7a9a7c",
    text:"Restaurante gastronómico y ecoturístico ofreciendo experiencias que conecten la cultura, la gastronomía y la naturaleza. Aprovechando las condiciones ambientale" }
];
/* ============ FIN SECCIÓN 2 ============ */


/* ============================================================================
   3. DIBUJO DE TARJETAS DE SERVICIOS Y PROYECTOS            ⚠️ NO MODIFICAR
   ----------------------------------------------------------------------------
   Toma las listas de arriba y las convierte en HTML dentro de los contenedores
   #service-cards y #project-grid (definidos en index.html).
   ============================================================================ */

/* ---------- 3.1 Tarjetas de servicios ----------
   .map() recorre la lista y crea una tarjeta <article> por cada servicio;
   .join("") une todas las tarjetas en un solo texto que se inserta en la página. */
document.getElementById("service-cards").innerHTML = services.map(s => `
  <article class="card">
    <svg viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg>
    <h3>${s.title}</h3><p>${s.text}</p>
  </article>`).join("");

/* ---------- 3.2 Ilustraciones vectoriales de proyectos ----------
   scene(p) devuelve el SVG de un proyecto. Primero dibuja cielo, colinas y
   terreno (común a todos) y luego el edificio (según p.kind). Sus formas
   están en la lista "edificios". Para editarlas, cambia los colores #xxxxxx. */
function scene(p){
  const edificios = [
    /* 0: Volúmenes de madera apilados */
    `<rect x="170" y="250" width="300" height="90" fill="#9a7650"/><rect x="330" y="190" width="220" height="60" fill="#e9e1cd"/><rect x="170" y="238" width="400" height="12" fill="#3a3d3b"/><rect x="340" y="204" width="140" height="46" fill="#f0c982"/><rect x="330" y="182" width="220" height="10" fill="#6f9a62"/>`,
    /* 1: Pabellón con cubierta inclinada */
    `<rect x="190" y="230" width="380" height="110" fill="#b48a62"/><rect x="230" y="262" width="90" height="78" fill="#f0c982"/><rect x="350" y="262" width="150" height="78" fill="#f0c982"/><path d="M150 232L610 200v22L150 252z" fill="#3a3d3b"/><path d="M150 232L610 200v-6L150 224z" fill="#6f9a62"/>`,
    /* 2: Bloque en terrazas */
    `<rect x="200" y="270" width="360" height="70" fill="#e9e1cd"/><rect x="240" y="210" width="280" height="60" fill="#d9d1bd"/><rect x="290" y="150" width="190" height="60" fill="#e9e1cd"/><g fill="#6f9a62"><rect x="190" y="262" width="380" height="8"/><rect x="230" y="202" width="300" height="8"/><rect x="280" y="142" width="210" height="8"/></g><g fill="#f0c982"><rect x="220" y="285" width="60" height="40"/><rect x="300" y="285" width="60" height="40"/><rect x="380" y="285" width="60" height="40"/><rect x="470" y="285" width="60" height="40"/><rect x="270" y="225" width="80" height="30"/><rect x="380" y="225" width="110" height="30"/></g>`,
    /* 3: Casas con patio interior */
    `<g fill="#c9a37a"><rect x="130" y="270" width="140" height="70"/><rect x="490" y="270" width="140" height="70"/><rect x="310" y="240" width="140" height="100"/></g><g fill="#3a3d3b"><path d="M120 270l80-40 80 40z"/><path d="M480 270l80-40 80 40z"/><path d="M300 240l80-40 80 40 z"/></g><g fill="#f0c982"><rect x="165" y="295" width="30" height="45"/><rect x="525" y="295" width="30" height="45"/><rect x="345" y="270" width="30" height="70"/></g>`
  ][p.kind];

  return `<svg viewBox="0 0 760 570" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración de ${p.title}">
    <rect width="760" height="570" fill="${p.sky}"/>
    <path d="M0 300Q200 230 400 290T760 270V570H0z" fill="${p.hill}" opacity=".7"/>
    <path d="M0 340Q250 300 480 340T760 330V570H0z" fill="${p.hill}"/>
    <rect y="340" width="760" height="230" fill="#46634f"/>
    ${edificios}
    <g fill="#233829"><path d="M60 420l30-150 30 150zM650 430l34-170 34 170z"/></g>
  </svg>`;
}

/* ---------- 3.3 Tarjetas de proyectos ----------
   Si el proyecto tiene "image" se muestra la foto (<img>); si no, la
   ilustración vectorial (scene). El tabindex="0" permite enfocar la tarjeta
   con el teclado (accesibilidad). */
document.getElementById("project-grid").innerHTML = projects.map(p => `
  <figure class="project" tabindex="0">
    ${p.image ? `<img src="${p.image}" alt="Fotografía de ${p.title}" loading="lazy">` : scene(p)}
    <figcaption><h3>${p.title}</h3><div class="loc">${p.place}</div><p class="desc">${p.text}</p></figcaption>
  </figure>`).join("");
/* ============ FIN SECCIÓN 3 ============ */


/* ============================================================================
   4. PROYECTOS INTERACTIVOS                                 ⚠️ NO MODIFICAR
   ----------------------------------------------------------------------------
   En pantallas táctiles (donde no existe "pasar el mouse"), al tocar un
   proyecto se muestra u oculta su descripción. También funciona con el
   teclado (Enter o barra espaciadora). La clase "open" activa el efecto
   definido en styles.css, sección 8.
   ============================================================================ */
document.querySelectorAll(".project").forEach(proyecto => {
  /* Clic o toque: alterna la clase "open" */
  proyecto.addEventListener("click", () => proyecto.classList.toggle("open"));

  /* Teclado: Enter o espacio hacen lo mismo. preventDefault evita que la
     barra espaciadora desplace la página. */
  proyecto.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      proyecto.classList.toggle("open");
    }
  });
});
/* ============ FIN SECCIÓN 4 ============ */


/* ============================================================================
   5. MENÚ MÓVIL (HAMBURGUESA)                               ⚠️ NO MODIFICAR
   ----------------------------------------------------------------------------
   En pantallas pequeñas el menú está oculto y se muestra con el botón de
   tres líneas. Elementos relacionados en index.html:
     #toggle = botón hamburguesa      #menu = lista de enlaces
   ============================================================================ */
const menuToggleButton = document.getElementById("toggle");   // Botón hamburguesa
const menuList = document.getElementById("menu");             // Lista <ul> del menú
const navigationBar = document.querySelector("header.nav");   // Barra superior completa

/* setMenu(open): abre (true) o cierra (false) el menú.
   - Añade/quita la clase "open" (que lo hace visible en CSS).
   - Actualiza atributos de accesibilidad para lectores de pantalla. */
function setMenu(open){
  menuList.classList.toggle("open", open);
  menuToggleButton.setAttribute("aria-expanded", String(open));
  menuToggleButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

/* Al pulsar la hamburguesa: invierte el estado actual */
menuToggleButton.addEventListener("click", () => setMenu(!menuList.classList.contains("open")));

/* Al pulsar cualquier enlace del menú: se cierra (útil en móvil) */
menuList.querySelectorAll("a").forEach(enlace => enlace.addEventListener("click", () => setMenu(false)));

/* Al pulsar la tecla Escape: se cierra */
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
/* ============ FIN SECCIÓN 5 ============ */


/* ============================================================================
   6. EFECTOS DE SCROLL                                      ⚠️ NO MODIFICAR
   ============================================================================ */

/* ---------- 6.1 Borde inferior del menú al bajar ----------
   Cuando el usuario baja más de 20 píxeles, se añade la clase "scrolled" a la
   barra (en styles.css muestra una línea inferior). Cambia el 20 si quieres
   que aparezca antes o después. */
const onScroll = () => navigationBar.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive:true });
onScroll(); // Se ejecuta una vez al cargar, por si la página ya está desplazada

/* ---------- 6.2 Resaltar el enlace de la sección visible ----------
   IntersectionObserver vigila cada sección a la que apunta un enlace del
   menú. Cuando una sección cruza la franja central de la pantalla, su enlace
   recibe la clase "active". Se leen los enlaces del menú automáticamente,
   así que si agregas un nuevo elemento con href="#algo" y una sección con
   id="algo", funcionará solo. */
const menuLinks = [...menuList.querySelectorAll("a[href^='#']")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      menuLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin:"-45% 0px -50% 0px" }); // Franja de detección en el centro de la pantalla

menuLinks.forEach(link => {
  const targetSection = document.querySelector(link.getAttribute("href"));
  if (targetSection) sectionObserver.observe(targetSection);
});
/* ============ FIN SECCIÓN 6 ============ */


/* ============================================================================
   7. TEMA CLARO / OSCURO                                    ⚠️ NO MODIFICAR
   ----------------------------------------------------------------------------
   El botón con id="theme" alterna entre tema claro y oscuro.
   - Guarda la elección en localStorage (memoria del navegador) para
     recordarla en la próxima visita.
   - Escribe data-theme="light" o "dark" en <html>; styles.css (sección 1)
     usa ese atributo para aplicar los colores del tema.
   Los COLORES se cambian en styles.css, NO aquí.
   ============================================================================ */
const root = document.documentElement; // El elemento <html>

/* Al cargar: si el visitante ya eligió un tema antes, se aplica.
   El try/catch evita errores si el navegador bloquea localStorage. */
try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.dataset.theme = savedTheme;
} catch (e) {}

document.getElementById("theme").addEventListener("click", () => {
  /* Si hay un tema elegido, se usa; si no, se consulta la preferencia del
     sistema operativo para saber en cuál está la página ahora mismo. */
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme:dark)").matches;

  const nextTheme = isDark ? "light" : "dark"; // Se cambia al opuesto
  root.dataset.theme = nextTheme;
  try { localStorage.setItem("theme", nextTheme); } catch (e) {}
});
/* ============ FIN SECCIÓN 7 ============ */


/* ============================================================================
   8. FORMULARIO DE CONTACTO                       ⚠️ SOLO TEXTOS Y REGLAS
   ----------------------------------------------------------------------------
   Cómo funciona:
     1. Cuando el visitante sale de un campo, se valida ("blur").
     2. Al pulsar "Enviar mensaje" se validan todos los campos.
     3. Si hay errores: se muestran bajo cada campo y el cursor va al primero.
     4. Si todo está bien: se abre el programa de correo del visitante con el
        mensaje ya escrito, dirigido a CORREO_DE_CONTACTO (sección 0).
        (Un sitio sin servidor no puede enviar correos por sí mismo; para
        recibir mensajes directamente se necesita un servicio externo.)

   ✅ Puedes cambiar los TEXTOS de los mensajes de error de "reglas".
   ✅ Puedes cambiar el 10 (mínimo de caracteres del mensaje).
   ⚠️ No cambies los nombres name / email / message: coinciden con los
      campos y los id de index.html.
   ============================================================================ */
const contactForm = document.getElementById("contact-form");
const statusMessage = document.getElementById("status"); // Mensaje de éxito

/* REGLAS DE VALIDACIÓN: cada una recibe el valor escrito (v) y devuelve
   "" si es correcto, o el texto del error si no lo es. */
const rules = {
  name:    v => v.trim() ? "" : "Ingresa tu nombre.",
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Ingresa un correo válido, como nombre@ejemplo.com.",
  message: v => v.trim().length >= 10 ? "" : "Escribe al menos una oración sobre tu proyecto."
};

/* check(field): valida UN campo.
   - Muestra el error en <p id="CAMPO-err"> (o lo borra si todo está bien).
   - Marca el campo con aria-invalid para que se pinte el borde de error.
   - Devuelve true si es válido, false si no. */
function check(field){
  const input = contactForm.elements[field];
  const errorText = rules[field](input.value);
  document.getElementById(field + "-err").textContent = errorText;
  input.setAttribute("aria-invalid", errorText ? "true" : "false");
  return !errorText;
}

/* Validar cada campo al salir de él */
Object.keys(rules).forEach(field => contactForm.elements[field].addEventListener("blur", () => check(field)));

/* Al enviar el formulario */
contactForm.addEventListener("submit", e => {
  e.preventDefault(); // Evita que la página se recargue

  /* Valida todos los campos; "ok" será true solo si todos son válidos */
  const ok = Object.keys(rules).map(check).every(Boolean);

  if (!ok) {
    statusMessage.textContent = "";
    contactForm.querySelector("[aria-invalid='true']").focus(); // Cursor al primer error
    return;
  }

  /* Construye el correo: asunto + cuerpo con los datos del formulario.
     encodeURIComponent convierte el texto a un formato seguro para URL. */
  const data = new FormData(contactForm);
  const body = `Nombre: ${data.get("name")}\nTipo de proyecto: ${data.get("type")}\n\n${data.get("message")}`;
  window.location.href = `mailto:${CORREO_DE_CONTACTO}?subject=${encodeURIComponent("Consulta de proyecto de " + data.get("name"))}&body=${encodeURIComponent(body)}`;

  statusMessage.textContent = "¡Gracias! Tu aplicación de correo debería abrirse con tu mensaje listo para enviar.";
  contactForm.reset();
});
/* ============ FIN SECCIÓN 8 ============ */


/* ============================================================================
   9. BOTÓN FINAL Y AÑO DEL PIE DE PÁGINA                    ⚠️ NO MODIFICAR
   ============================================================================ */

/* El botón del banner final lleva al formulario (href="#name"); tras 600 ms,
   cuando termina el desplazamiento suave, se coloca el cursor en el campo
   "Nombre" sin volver a mover la página (preventScroll). */
document.getElementById("cta-form").addEventListener("click", () => {
  setTimeout(() => contactForm.elements.name.focus({ preventScroll:true }), 600);
});

/* Escribe el año actual en el pie de página (así nunca queda desactualizado) */
document.getElementById("year").textContent = new Date().getFullYear();
/* ============ FIN SECCIÓN 9 / FIN DE script.js ============ */
