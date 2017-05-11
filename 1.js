"use strict";

function Calculator() {
    this.currentValue = 0;	
}

Calculator.prototype.getResult = function() {
    return this.currentValue;
}

Calculator.prototype.reset = function() {
    this.currentValue = 0;
    return this;
}

Calculator.prototype.add = function(value) {
    this.currentValue += value;
    return this;
}

Calculator.prototype.substract = function(value) {
    this.currentValue -= value;
    return this;
}

Calculator.prototype.multiply = function(value) {
    this.currentValue *= value;
    return this;
}

Calculator.prototype.divide = function(value) {
    this.currentValue /= value;
    return this;
}

Calculator.prototype.getInitialState = function(callback) {
        setTimeout(function () {
			this.currentValue = 5;
            callback();
        }.bind(this), 500);
}

var CalcTool = new Calculator();

console.log(CalcTool.add(4).reset().add(6).multiply(4).getResult());

CalcTool.getInitialState(function () {
    console.log(CalcTool.getResult())
})

//bind function
function bind(func, context) {
    return function() {
        return func.apply(context, arguments);
    };
}

function checkFunc() {
    console.log(this);
}

var ch = bind(checkFunc, "Checking");
ch();