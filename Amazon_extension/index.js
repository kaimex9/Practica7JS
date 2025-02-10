document.getElementById("sticky").onclick = call1;

function call1() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: openMenu,
    })
}

function openMenu() {
    // Crear el div
    let menuDiv = document.createElement('div');

    // Establecer el estilo del div
    menuDiv.style.position = 'fixed';   // Para fijarlo en la pantalla
    menuDiv.style.top = '0';            // Pegado al top de la pantalla
    menuDiv.style.right = '0';          // Pegado a la derecha
    menuDiv.style.width = '200px';      // Ancho del div
    menuDiv.style.height = '100vh';     // Alto del div (100% del alto de la pantalla)
    menuDiv.style.backgroundColor = '#f0f0f0';  // Color de fondo rojo
    menuDiv.style.zIndex = '1000';      // Asegura que esté encima de otros elementos

    // Agregar el div al cuerpo del documento
    document.body.appendChild(menuDiv);

    let title = document.createElement('h2');
    title.textContent = 'Menu de opciones';
    let button1 = document.createElement('button');
    button1.textContent = 'Informacio Imatges';
    let button2 = document.createElement('button');
    button2.textContent = 'Preu mes petit';
    
    menuDiv.appendChild(title);
    menuDiv.appendChild(button1);
    menuDiv.appendChild(button2);

    console.log("Div rojo creado y pegado a la derecha");
}


let tabId;
chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
        tabId = tabs[0].id;
        console.log("tabId: " + tabId);
    });