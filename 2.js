var arr = ["a", "b", "c", "d", "f"];
var i = 0;
 
function consoleRec(arr) {
   console.log(arr[i]);
   i++;
   if (i < arr.length) consoleRec(arr);
}
 
consoleRec(arr);