"use strict";

function deleteTextNodes(element) {
    for (var i = 0; i < element.childNodes.length; i++) { 
        var child = element.childNodes[i]; 
        if (child.nodeType == 3) { 
            element.removeChild(child); 
            i--; 
        }
    }
}

var elem1 = document.getElementById("second");
deleteTextNodes(elem1);

var elem2 = document.getElementById("third");
deleteTextNodes(elem2);