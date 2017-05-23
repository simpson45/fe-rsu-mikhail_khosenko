function Flat(_number, _rooms) {
    this.number = _number;
    this.rooms = _rooms;
}

Flat.prototype.getNumber = function () {
    return this.number;
};

Flat.prototype.getRoom = function (type, index) {
    if (index === undefined) {
        index = 0;
    }

    var filterByType = function (room) {
        return (room.getType() === type);
    };
    var fRooms = this.rooms.filter(filterByType);
    return fRooms[index];
};

Flat.prototype.searchDeviceByName = function(name) {
    this.rooms.forEach(function (room) {
        room.searchDeviceByName(name);
    })
};