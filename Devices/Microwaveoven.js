function Microwaveoven(name, power) {
    Device.call(this, name, power);
}

Microwaveoven.prototype = Object.create(Device.prototype);