document.getElementById("sticky").onclick = call1;

function call1() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: openMenu,
    });
}

function openMenu() {
    // Creo un div con las medidas necesarias para que sea una columna que ocupe la zona derecha
    let menuDiv = document.createElement('div');
    menuDiv.style.top = '0';
    menuDiv.style.right = '0';
    menuDiv.style.width = '200px';
    menuDiv.style.height = '100vh';
    menuDiv.style.backgroundColor = '#f0f0f0';
    menuDiv.style.zIndex = '1000';

    // Establecezco el contenedor como flex y centrar los elementos
    menuDiv.style.display = 'flex';
    menuDiv.style.flexDirection = 'column'; 
    menuDiv.style.alignItems = 'center';
    menuDiv.style.justifyContent = 'center'; 

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
    function infoIMGS() {
        let images = document.querySelectorAll("img");

        images.forEach(function (img) {
            img.addEventListener("mouseover", function () {
                img.title = img.alt || "Sin descripción";
            });
        });
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
