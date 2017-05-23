function Bedroom() {
    Room.call(this, 'Bedroom');
}

Bedroom.prototype = Object.create(Room.prototype);