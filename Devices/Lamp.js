function Lamp(name, power) {
    Device.call(this, name, power);
}

Lamp.prototype = Object.create(Device.prototype);