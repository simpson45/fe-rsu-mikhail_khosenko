"use strict";

// TASK 1
var today = new Date();
var day = today.getDay();
var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
console.log("Today is : " + daylist[day] + ".");

// TASK 2
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = "0" + dd;
}
if (mm < 10) {
    mm = "0" + mm;
}
var today = dd + "/" + mm + "/" + yyyy;
console.log("Day is : " + today + ".");

// TASK 3
for (var year = 2014; year <= 2050; year++) {
    var d = new Date(year, 0, 1);
    if (d.getDay() === 0)
        console.log("1st January is being a Sunday  " + year);
}

// TASK 4
today = new Date();
var cmas = new Date(today.getFullYear(), 11, 31);
if (today.getMonth() == 11 && today.getDate() > 25) {
    cmas.setFullYear(cmas.getFullYear() + 1);
}
var one_day = 1000 * 60 * 60 * 24;
console.log(Math.ceil((cmas.getTime() - today.getTime()) / (one_day)) + " days left until New Year!");

// TASK 5
function is_array(a) {
    return Array.isArray(a);
}
console.log(is_array([23, 12, 84, 2, 4, 2]));
console.log(is_array("qwerty"));

// TASK 6
var array_Clone = function(arra1) {
    return arra1.slice(0);
};
console.log(array_Clone([9, 8, 7, 6]));
console.log(array_Clone([9, 8, [7, 6]]));

// TASK 7
var arr1 = [12, "b", "b", "b", 12, 13, "ab", 3, "b", 12, 14, 19, 3];
var mf = 1;
var m = 0;
var item;
for (var i = 0; i < arr1.length; i++) {
    for (var j = i; j < arr1.length; j++) {
        if (arr1[i] == arr1[j])
            m++;
        if (mf < m) {
            mf = m;
            item = arr1[i];
        }
    }
    m = 0;
}
console.log(item + " ( " + mf + " times ) ");

// TASK 8
var str = "mIKHAIL kHOSENKO";
var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var LOWER = "abcdefghijklmnopqrstuvwxyz";
var result = [];

for (var x = 0; x < str.length; x++) {
    if (UPPER.indexOf(str[x]) !== -1) {
        result.push(str[x].toLowerCase());
    } else if (LOWER.indexOf(str[x]) !== -1) {
        result.push(str[x].toUpperCase());
    } else {
        result.push(str[x]);
    }
}
console.log(result.join(""));

// TASK 9
function removeDuplicates(num) {
    var x,
        len = num.length,
        out = [],
        obj = {};

    for (x = 0; x < len; x++) {
        obj[num[x]] = 0;
    }
    for (x in obj) {
        out.push(x);
    }
    return out;
}
var Mynum = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];
result = removeDuplicates(Mynum);
console.log(Mynum);
console.log(result);

// TASK 10
function shuffle(arra1) {
    var ctr = arra1.length,
        temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
var myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(shuffle(myArray));

// TASK 11
function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];
    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }
    return result;
}
console.log(filter_array([NaN, 0, 523, false, -63, "", undefined, 15, null]));

// TASK 12
var library = [{
    author: "Bill Gates",
    title: "The Road Ahead",
    libraryID: 1254
}, {
    author: "Steve Jobs",
    title: "Walter Isaacson",
    libraryID: 4264
}, {
    author: "Suzanne Collins",
    title: "Mockingjay: The Final Book of The Hunger Games",
    libraryID: 3245
}];

function compare_to_sort(x, y) {
    if (x.title < y.title)
        return -1;
    if (x.title > y.title)
        return 1;
    return 0;
}
console.log(library.sort(compare_to_sort));

// TASK 13
function merge_array(array1, array2) {
    var result_array = [];
    var arr = array1.concat(array2);
    var len = arr.length;
    var assoc = {};
    while (len--) {
        var item = arr[len];
        if (!assoc[item]) {
            result_array.unshift(item);
            assoc[item] = true;
        }
    }
    return result_array;
}
var array1 = [1, 2, 3, 4];
var array2 = [4, 5, 6];
console.log(merge_array(array1, array2));

// TASK 14
function remove_array_element(array, n) {
    var index = array.indexOf(n);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}
console.log(remove_array_element([2, 3, 4, 5], 5));

// TASK 15
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}
var items = [35, 345, 343, 32, 13, 2, 564, 64];
console.log(random_item(items));

// TASK 16
function move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}
console.log(move([10, 20, 30, 40, 50], 0, 2));
console.log(move([10, 20, 30, 40, 50], -1, -2));

// TASK 17
var date_diff_indays = function(date1, date2) {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
};
console.log(date_diff_indays("14/04/2017", "14/04/2016"));
console.log(date_diff_indays("09/05/2017", "13/03/2017"));

// TASK 18
function max_date(all_dates) {
    var max_dt = all_dates[0],
        max_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function(dt, index) {
        if (new Date(dt) > max_dtObj) {
            max_dt = dt;
            max_dtObj = new Date(dt);
        }
    });
    return max_dt;
}
console.log(max_date(["2016/02/04", "2017/09/25", "2013/01/03"]));

// TASK 19
var string_to_array = function(str) {
    return str.trim().split(" ");
};
console.log(string_to_array("Mikhail Khosenko"));

// TASK 20
function capitalize_Words(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
console.log(capitalize_Words("epam front-end cources"));

// TASK 21
var camelize = function camelize(str) {
    return str.replace(/\W+(.)/g, function(match, chr) {
        return chr.toUpperCase();
    });
};
console.log(camelize("JavaScript Data"));
console.log(camelize("JavaScript data"));
console.log(camelize("JavaScriptData"));

// TASK 22
function max(input) {
    return Math.max.apply(null, input);
}

console.log(max([6, 32, 21, 51, 5, 74, 32, 34]));
console.log(max([-12, -34, 0, -56, -1]));

// TASK 23
function min(input) {
    return Math.min.apply(null, input);
}
console.log(min([12, 34, 56, 1]));
console.log(min([-12, -34, 0, -56, -1]));

// TASK 24
function is_Numeric(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}
console.log(is_Numeric(52));
console.log(is_Numeric("abcd"));
console.log(is_Numeric("52"));
console.log(is_Numeric(" "));
console.log(is_Numeric(1.25));
console.log(is_Numeric(-300));

// TASK 25
function sum(input) {
    var total = 0;
    for (var i = 0; i < input.length; i++) {
        if (isNaN(input[i])) {
            continue;
        }
        total += Number(input[i]);
    }
    return total;
}
console.log(sum([1, 2, 3]));
console.log(sum([100, -200, 3]));
console.log(sum([1, 2, "a", 3]));

// TASK 26
Object.objsize = function(Myobj) {
    var osize = 0,
        key;
    for (key in Myobj) {
        if (Myobj.hasOwnProperty(key)) osize++;
    }
    return osize;
};

var student = {
    name: "Mikhail Khosenko",
    sclass: "V",
    rollno: 14,
    mcour: "YES"
};
var objsize = Object.objsize(student);
console.log("Size of the current object : " + objsize);

// TASK 27
function a_keys(obj) {
    if (!isObject(obj)) return [];
    if (Object.keys) return Object.keys(obj);
    var keys = [];
    for (var key in obj)
        if (Object.has(obj, key)) keys.push(key);
    return keys;
}

function isObject(obj) {
    var type = typeof obj;
    return type === "function" || type === "object" && !!obj;
}
console.log(a_keys({
    red: "#FF0000",
    green: "#00FF00",
    white: "#FFFFFF"
}));