function SystemBlock(name, power) {
    Device.call(this, name, power);
}

SystemBlock.prototype = Object.create(Device.prototype);