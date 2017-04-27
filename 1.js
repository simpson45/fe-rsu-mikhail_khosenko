var Calculator = (function (initialState) {
    "use strict";

    var currentValue = initialState;

    function getResult() {
        return currentValue;
    }

    function reset() {
        currentValue = 0;
        return this;
    }

    function add(value) {
        currentValue += value;
        return this;
    }

    function substract(value) {
        currentValue -= value;
        return this;
    }

    function multiply(value) {
        currentValue *= value;
        return this;
    }

    function divide(value) {
        currentValue /= value;
        return this;
    }

    function getInitialState(callback) {
        setTimeout(function () {
            callback()
        }, 500);
    }

    return {
        getResult: getResult,
        reset: reset,
        add: add,
        substract: substract,
        multiply: multiply,
        divide: divide,
        getInitialState: getInitialState
    };
})(0);

console.log(Calculator.add(4).reset().add(6).multiply(4).getResult());

Calculator.getInitialState(function () {
    console.log(Calculator.getResult())
})

function bind(f, context) {
    return function() {
        return f.apply(context, arguments);
    };
}