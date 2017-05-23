function Toaster(name, power) {
    Device.call(this, name, power);
}

Toaster.prototype = Object.create(Device.prototype);