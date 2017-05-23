function TVSet(name, power) {
    Device.call(this, name, power);
}

TVSet.prototype = Object.create(Device.prototype);