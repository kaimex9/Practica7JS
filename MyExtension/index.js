document.getElementById("op1").onclick = call1;
document.getElementById("op2").onclick = call2;
document.getElementById("op3").onclick = call3;
document.getElementById("op4").onclick = call4;

function call1() {
    //cambiar el color de fondo de la web
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: changeColor
    })
}

function call2() {
    let color = document.getElementById("color").value;
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: changeURLcolor,
        args:[color]
    })
}

function call3() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: deleteImages,
    })
}

function call4() {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: showPasswords,
    })
}


function changeColor() {
    document.body.style.backgroundColor = "red";
}

function changeURLcolor(color) {
    //Cambiar el color de los enlaces en funcion del que quiera el usuario
    let links = document.querySelectorAll("a");
    
    for (let link of links) {
        link.style.color = color;
    }
}

function deleteImages() {
    let imgs = document.querySelectorAll("img");
    
    for (let img of imgs) {
        img.style.display = "none";
    }
}

function showPasswords() {
    let pass = document.querySelectorAll("input[type='password']");
    for (let passwords of pass) {
        passwords.dataset.is_pass = "false"
        passwords.type = "text"
    }
}

let tabId;
chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
        tabId = tabs[0].id;
        console.log("tabId: " + tabId);
    });