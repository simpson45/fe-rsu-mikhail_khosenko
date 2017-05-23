function Device(_name, _power) {
    this.name = _name;
    this.power = _power;
    this.enabled = false;
}

Device.prototype.getName = function() {
    return this.name;
};

Device.prototype.getPower= function() {
    return this.power;
};

Device.prototype.isEnabled = function() {
    return this.enabled;
};

Device.prototype.turnOn = function() {
    this.enabled = true;    
};

Device.prototype.turnOff = function() {
    this.enabled = false;
};
