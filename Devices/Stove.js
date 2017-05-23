function Stove(name, power) {
    Device.call(this, name, power);
}

Stove.prototype = Object.create(Device.prototype);