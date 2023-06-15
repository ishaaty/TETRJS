let btn = document.querySelector("button");
let classic = document.getElementById('classic');
let pastel = document.getElementById('pastel');
let pink = document.getElementById('pink');
let blue = document.getElementById('blue');
let gray = document.getElementById('gray');
let vri = document.getElementById('vri');

btn.addEventListener("click", function () {
    if (pastel.checked) {
        addToStorage("pastel");
    } else if (pink.checked) {
        addToStorage("pink");
    } else if (blue.checked) {
        addToStorage("blue");
    } else if (gray.checked) {
        addToStorage("gray");
    } else if (vri.checked) {
        addToStorage("vri");
    } else {
        addToStorage("classic");
    }
});
function addToStorage(arr) {
    sessionStorage.setItem("first", arr);
    location.href = "game.html";
}