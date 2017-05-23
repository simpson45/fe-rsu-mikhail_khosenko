function VacuumCleaner(name, power) {
    Device.call(this, name, power);
}

VacuumCleaner.prototype = Object.create(Device.prototype);