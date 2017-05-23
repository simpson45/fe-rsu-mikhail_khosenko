function Ventilator(name, power) {
    Device.call(this, name, power);
}

Ventilator.prototype = Object.create(Device.prototype);
