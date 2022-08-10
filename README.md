# Renderizado condicional de componentes en base a la medida de la ventana en Vanilla JavaScript

[DEMO](https://render-condicional-vanillajs.netlify.app/)

## Porqué hacerlo en Vanilla?

Puede ser que estes comenzando tu camino en la programación y luego de ver un poco de frameworks *(en mi caso particular React)* quieres retomar las bases y encaras un proyecto donde no es necesario utilizar ninguno ya que te solicitan una página estática pero quieres que tenga un "algo" más.

Una de las primeras cosas que uno aprende al utilizar un framework de JavaScript es a realizar un renderizado condicional. Esto significa que dependiendo de si se cumple o no una condición estipulada, en pantalla se visualiza un componente de nuestra aplicación u otro, en general mediante la utilización de un ternario.

```
{ codicion ? 'si se cumple se ejecuta este codigo' : 'si no se cumple se ejecuta este otro' }
```

Intentar hacer esto en JavaScript Vanilla no es tan simple como realizar dicha operación y al no encontrar el contenido en español he decidido, dentro de mis capacidades, ayudar a entender como realizar esta tarea.

## Qué es esto?

Este repositorio es una mezcla de traducción del posteo original (link al final) y de demostración lo suficientemente básica para que cualquiera pueda entender.

## Contexto

Existe de modo nativo en los diferentes navegadores con soporte de JavaScript la [API Window](https://developer.mozilla.org/es/docs/Web/API/Window). 

Esta API retorna un objeto con un método [`matchMedia()`](https://developer.mozilla.org/es/docs/Web/API/Window/matchMedia) y el `string` que coloquemos dentro de los paréntesis como parámetro definirá nuestro media querie.

### Para qué me sirve usar JavaScript si tengo en CSS3 la funcionalidad de los `@media`?

Muy simple, en CSS no podemos cambiar el contenido del HTML, solo podemos cambiar el estilo. No desmerezcamos esta función ya que nos resulta muy útil, pero para algunos casos, el estilo no lo es todo. Existen casos donde queremos o necesitamos cambiar el HTML. Para esto es necesario estas lineas de código.

## Explicación

Con la creación de esta constante manejaremos el breakpoint de nuestra media querie. Es similar al `@media screen (max-width: 600px)` que se utiliza en CSS.

```
const desktopQuerie = '600px'
```

Creamos de la misma forma nuestros 2 componentes, uno para la vista Mobile y otro para la vista Desktop. *(Si, usé estilo en linea, quería hacerlo rápido pero ayuda a la visualización del cambio.)*

```
const component1 = 
  `
    <h1>Esta es la vista MOBILE y cambiará cuando el ancho sea <u style="background-color: red;">mayor</u> a ${desktopQuerie}</h1>
    <p style="background-color: red;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere iusto eius doloremque vero, eaque necessitatibus repellat culpa incidunt molestias obcaecati rerum praesentium nemo perferendis ex modi labore ad a. Eveniet!</p>
  `;
const component2 = 
  `
  <h1>Esta es la vista DESKTOP y cambiará cuando el ancho sea <u style="background-color: chartreuse;">menor</u> a ${desktopQuerie}</h1>
  <p style="background-color: chartreuse;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere iusto eius doloremque vero, eaque necessitatibus repellat culpa incidunt molestias obcaecati rerum praesentium nemo perferendis ex modi labore ad a. Eveniet!</p>
  `;
```

Luego creamos una función que insertará el componente dentro de nuestro HTML, en este caso, dentro del `<div id='main'>` que se escribió vacío.

```   
function setMainInnerHtml(html) {
  const main = document.getElementById('main');
  main.innerHTML = html;
} 
```

Aca es donde comienza lo interesante. Usamos como nombre de nuestra constante `mql` para ser consistentes con la documentación de MDN, ya que el objeto que retorna el metodo `matchMedia` es un prototipo `MediaQueryList`. 

Este objeto tiene una propiedad `matches` que retorna un booleano, el cual será nuestra condición para renderizar los componentes. Siempre que nuestra ventana sea de menor ancho que 600px, insertará el componente para vista Mobile, en caso contrario lo hará con el componente para Desktop.

```
const mql = window.matchMedia(`(max-width: ${desktopQuerie})`);
let mobileView = mql.matches;

if (mobileView){
  setMainInnerHtml(component1);
} else {
  setMainInnerHtml(component2);
}
```

Esto nos generará el renderizado inicial de nuestra aplicación, pero que pasa si queremos que cambie **DINAMICAMENTE?**. Podemos utilizar el evento `change` para registrar el momento donde pasamos nuestra medida seteada al comienzo *(en nuestro ejemplo, los 600px)*, lo que provoca el renderizado del otro componente.

```
mql.addEventListener('change',(e)=>{
  let mobileView = e.matches;
  if (mobileView) {
    setMainInnerHtml(component1);
  } else {
    setMainInnerHtml(component2);
  }
})
```

## Conclusión

Como dice el autor en su [post original (en inglés)](https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35), espero que hayan descubierto una herramienta para incorporar a su arsenal y ojalá algún día la puedan utilizar.

