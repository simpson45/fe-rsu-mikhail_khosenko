function Monitor(name, power) {
    Device.call(this, name, power);
}

Monitor.prototype = Object.create(Device.prototype);