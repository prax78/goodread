// function loadContent(content) {
//     document.getElementById("content-area").innerText = content;
// }

function loadContent(markdown) {
    document.getElementById("content-area").innerHTML = marked.parse(markdown);
    fetch('./data/src.json').then(res=>res.json()).then(data=>console.log(data));
}


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    let themeIcon = document.getElementById("theme-icon");
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.src = "dark.png";
    } else {
        themeIcon.src = "light.png";
    }
}
