function Computer(_name, _devices) {
    Complex.call(this, _name, _devices);
}

Computer.prototype = Object.create(Complex.prototype);