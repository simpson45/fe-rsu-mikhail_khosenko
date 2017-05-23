function Bathroom() {
    Room.call(this, 'Bathroom');
}

Bathroom.prototype = Object.create(Room.prototype);