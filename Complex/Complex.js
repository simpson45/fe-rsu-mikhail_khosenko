function Complex(_name, _devices) {
    this.devices = _devices;
    Device.call(this, _name, this.getPower());
}

Complex.prototype = Object.create(Device.prototype);

Complex.prototype.getPower = function() {
    var totalPowerOn = this.devices.reduce(function(sum, device) {
        return sum + device.getPower();
    }, 0);
    return totalPowerOn;
};

Complex.prototype.turnOn = function() {
    this.devices.forEach(function(device) {
        device.turnOn();
    });
    this.enabled = true;
};

Complex.prototype.turnOff = function() {
    this.devices.forEach(function(device) {
        device.turnOff();
    });
    this.enabled = false;
};