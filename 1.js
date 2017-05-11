var shape = {
    type: undefined,
    getType: function() {
        document.write(this.type + '</br>');
    },
    getPerimeter: function() {      
        document.write(this.perimeter + '</br>');
    },
    draw: function() {
        document.write(this.type + ' is drawn </br>');
    }
}


function Triangle(a,b,c) {
    this.type = 'triangle';
    this.a = a;
    this.b = b;
    this.c = c;
    this.perimeter = a + b + c;
}
Triangle.prototype = shape;

function Square(a,b,c,d) {
    this.type = 'square';
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.perimeter = a + b + c + d;
}
Square.prototype = shape;

function coloredSquare(a,b,c,d) {
    this.color = 'green';
    Square.call(this, a, b, c, d);
}

coloredSquare.prototype = new Square();

coloredSquare.prototype.getColor = function () {
    document.write(this.color + '</br>');
}
coloredSquare.prototype.getFigureSquare = function () {
    this.figureSquare = this.a * this.b * this.c * this.d;
    document.write(this.figureSquare + '</br>');
}

var square1 = new coloredSquare(5,5,5,5);
var triangle1 = new Triangle(4,3,2);

square1.getType();
square1.getPerimeter();
square1.draw();
square1.getColor();
square1.getFigureSquare();

triangle1.getType();
triangle1.getPerimeter();
triangle1.draw();