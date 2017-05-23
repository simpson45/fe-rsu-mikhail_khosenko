function Hairdryer(name, power) {
    Device.call(this, name, power);
}

Hairdryer.prototype = Object.create(Device.prototype);