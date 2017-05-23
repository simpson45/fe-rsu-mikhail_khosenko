function WashingMachine(name, power) {
    Device.call(this, name, power);
}

WashingMachine.prototype = Object.create(Device.prototype);