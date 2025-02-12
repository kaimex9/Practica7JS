document.getElementById("sticky").onclick = call1;

function call1() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: openMenu,
    });
}

function openMenu() {
    let menuDiv = document.createElement('div');
    menuDiv.style.position = 'fixed'; // Fijar el elemento en la pantalla
    menuDiv.style.top = '0';
    menuDiv.style.right = '0';
    menuDiv.style.width = '200px';
    menuDiv.style.height = '100vh';
    menuDiv.style.backgroundColor = '#f0f0f0';
    menuDiv.style.zIndex = '1000';

    // Establece el contenedor como flex y centra los elementos
    menuDiv.style.display = 'flex';
    menuDiv.style.flexDirection = 'column';
    menuDiv.style.alignItems = 'center';
    menuDiv.style.justifyContent = 'center';

    // Añadir el menú al cuerpo del documento
    document.body.appendChild(menuDiv);


    let title = document.createElement('h2');
    title.textContent = 'Menu de opciones';
    title.style.textAlign = 'center';

    let button1 = document.createElement('button');
    button1.textContent = 'Informacio Imatges';
    button1.id = "op1";

    let button2 = document.createElement('button');
    button2.textContent = 'Preu mes petit';
    button2.id = "op2";

    // Aplicar los estilos comunes a los botones
    applyStyles(button1);
    applyStyles(button2);

    // Añadir los elementos al contenedor
    menuDiv.appendChild(title);
    menuDiv.appendChild(button1);
    menuDiv.appendChild(button2);

    // Función para aplicar los estilos comunes a un botón
    function applyStyles(button) {
        let commonStyle = {
            padding: '10px',
            backgroundColor: 'rgb(245, 106, 0)',
            fontWeight: 'bold',
            margin: '10px 0',  // Margen de 10px arriba y abajo
        };
        button.style.padding = commonStyle.padding;
        button.style.backgroundColor = commonStyle.backgroundColor;
        button.style.fontWeight = commonStyle.fontWeight;
        button.style.margin = commonStyle.margin;  // Aplicamos el margen
    }

    // Ahora que los botones existen, les asignamos eventos
    button1.onclick = infoIMGS;
    button2.onclick = searchMostCheap;
    function infoIMGS() {
        let images = document.querySelectorAll("img");

        images.forEach(function (img) {
            img.addEventListener("mouseover", function () {
                img.title = img.alt || "Sin descripción";
            });
        });
    }

    function searchMostCheap() {
        let prices = document.querySelectorAll('span[class="_cDEzb_p13n-sc-price_3mJ9Z"]');
        let cheapest = null, cheapestElement = null;
    
        prices.forEach(priceElement => {
            let price = parseFloat(priceElement.innerText.replace(",", ".").replace(/[^\d.]/g, ""));
            if (cheapest === null || price < cheapest) {
                cheapest = price;
                cheapestElement = priceElement;
            }
        });
    
        if (cheapestElement) {
            cheapestElement.scrollIntoView({ behavior: "smooth", block: "center" });
    
            let productImg = cheapestElement.closest('div').previousElementSibling;
            if (productImg) {
                productImg.style.border = "2px solid black";
                productImg.style.background = "blue";
            }
    
            // Aplicar estilo también al elemento del precio
            cheapestElement.style.border = "2px solid blue";
            cheapestElement.style.padding = "5px";
            cheapestElement.style.borderRadius = "5px";
            cheapestElement.style.backgroundColor = "#D0E8FF";
        }
    }
    
    
}

let tabId;
chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
        tabId = tabs[0].id;
        console.log("tabId: " + tabId);
    }
);
