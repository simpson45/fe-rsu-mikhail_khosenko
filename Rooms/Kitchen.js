function Kitchen() {
    Room.call(this, 'Kitchen');
}
Kitchen.prototype = Object.create(Room.prototype);