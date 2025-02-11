document.getElementById("sticky").onclick = call1;

function call1() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: openMenu,
    })
}

function call2() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: infoIMGS,
    })
}

function openMenu() {
    // Crear el div
    let menuDiv = document.createElement('div');

    menuDiv.style.position = 'fixed';  
    menuDiv.style.top = '0';            
    menuDiv.style.right = '0';          
    menuDiv.style.width = '200px';      
    menuDiv.style.height = '100vh';     
    menuDiv.style.backgroundColor = '#f0f0f0';  
    menuDiv.style.zIndex = '1000';     

    
    document.body.appendChild(menuDiv);

    let title = document.createElement('h2');
    title.textContent = 'Menu de opciones';
    let button1 = document.createElement('button');
    button1.textContent = 'Informacio Imatges';
    button1.id = "op1";
    let button2 = document.createElement('button');
    button2.textContent = 'Preu mes petit';
    button2.id = "op2";
    
    menuDiv.appendChild(title);
    menuDiv.appendChild(button1);
    menuDiv.appendChild(button2);

    
}

function infoIMGS() {
    console.log("it works")
}


let tabId;
chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
        tabId = tabs[0].id;
        console.log("tabId: " + tabId);
    });