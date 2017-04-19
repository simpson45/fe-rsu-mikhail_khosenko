function Calculator() {

    this.value_1 = 0; /*исходное значение*/

    this.toString = function() {
            return "Результат: " + this.value_1;
        };

        /*сложение*/
        this.add = function(value_2) {
            this.value_1 = this.value_1 + value_2;
            return this;
        };

        /*вычитание*/
        this.substract = function(value_2) {
            this.value_1 = this.value_1 - value_2;
            return this;
        };

        /*умножение*/
        this.multiply = function(value_2) {
            this.value_1 = this.value_1 * value_2;
            return this;
        };

        /*деление*/
        this.divide = function(value_2) {
            this.value_1 = this.value_1 / value_2;
            return this;
        };

        /*обнуление*/
        this.reset = function(value_2) {
            this.value_1 = 0;
            return this;
        };

        /*результат*/
        this.getResult = function(value_2) {
            return this.value_1;
        }
}

var calculator = new Calculator(); /*создаю калькулятор*/

calculator.add(4);
calculator.multiply(5);
console.log(calculator.getResult());