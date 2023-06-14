let btn = document.querySelector("button");
let classic = document.getElementById('classic');
let pastel = document.getElementById('pastel');
let pink = document.getElementById('pink');
let blue = document.getElementById('blue');

btn.addEventListener("click", function () {
    if (pastel.checked) {
        addToStorage("pastel");
    } else if (pink.checked) {
        addToStorage("pink");
    } else if (blue.checked) {
        addToStorage("blue");
    } else {
        addToStorage("classic");
    }
});
function addToStorage(arr) {
    sessionStorage.setItem("first", arr);
    location.href = "game.html";
}