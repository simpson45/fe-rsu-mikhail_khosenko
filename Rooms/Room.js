function Room(_type) {
    this.type = _type;
    this.devices = [];
}

Room.prototype.getType = function () {
    return this.type;
};

Room.prototype.addDevice = function (device) {
    this.devices.push(device);
};

Room.prototype.getDevice = function (name, index) {
    if (index === undefined) {
        index = 0;
    }

    var filterByName = function (device) {
        return (device.getName() === name);
    };
    var fDevices = this.devices.filter(filterByName);
    return fDevices[index];
};

Room.prototype.getTotalPowerOn = function () {
    var totalPowerOn = this.devices.reduce(function (sum, device) {
        if (device.isEnabled())
            return sum + device.getPower();
        else
            return sum;
    }, 0);
    return totalPowerOn;
};

Room.prototype.searchDeviceByName = function (name) {
    this.devices.forEach(function (device) {
        if (device.getName()===name) {
            console.log(name +  ' has been found in '+ this.getType() );
        }
    },this);
};