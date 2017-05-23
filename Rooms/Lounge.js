function Lounge(_name) {
    Room.call(this, 'Lounge');
}

Lounge.prototype = Object.create(Room.prototype);