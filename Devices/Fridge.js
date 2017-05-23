function Fridge(name, power) {
    Device.call(this, name, power);
}

Fridge.prototype = Object.create(Device.prototype);