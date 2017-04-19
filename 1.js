var source1 = [1, 2, 3];
var source2 = ["text", 2];
var source3 = [1, "text"];
var source4 = [1, "text", 3];
var source5 = ["text1", "text2"];
var source6 = [];

function isAllTrue(src, fltr) {
    if (src.length === 0) {
        throw new Error("Массив пустой");
    }
    var result = true;
    for (var i = 0; i < src.length; i++) {
        if (fltr(src[i]) !== true) {
            result = false;
        }
    }
    return result;
}
function filterFn(arg) {
    return typeof arg === "number";
}
var res = isAllTrue(source1, filterFn);
console.log("%s %s", "Задача №1: ", res);



