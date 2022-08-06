const desktopQuerie = '600px'

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
const mql = window.matchMedia(`(max-width: ${desktopQuerie})`);
let mobileView = mql.matches;

function setMainInnerHtml(html) {
  const main = document.getElementById('main');
  main.innerHTML = html;
}

if (mobileView){
  setMainInnerHtml(component1);
} else {
  setMainInnerHtml(component2);
}

mql.addEventListener('change',(e)=>{
  let mobileView = e.matches;
  if (mobileView) {
    setMainInnerHtml(component1);
  } else {
    setMainInnerHtml(component2);
  }
})