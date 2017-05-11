var prepend = function(container, newElement) {
    var newElement = document.querySelector(newElement);
    var container = document.querySelector(container);
    container.appendChild(newElement);
}
var app = document.getElementById("exec");
app.onclick = function() {prepend("#container","#new_element")};