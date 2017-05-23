function Application() {

}

Application.prototype.start = function () {

    //new flat with rooms;
    var flat56 = new Flat(17,
        [
            new Bathroom(),
            new Bedroom(),
            new Bedroom(),
            new Kitchen(),
            new Lounge()
        ]);

    //add devices to Bathroom
    var bathroom = flat56.getRoom('Bathroom');
    bathroom.addDevice(new WashingMachine('Indesit LK443', 1000));
    bathroom.addDevice(new Hairdryer('Phillips S', 700));
    bathroom.addDevice(new Ventilator('Bosh QWX', 34));
    //turn on some devices
    var ventilator = bathroom.getDevice('Bosh QWX');
    var washingMachine = bathroom.getDevice('Indesit LK443');
    ventilator.turnOn();
    washingMachine.turnOn();
    //Total power
    console.log(bathroom.getType() + ': ' + bathroom.getTotalPowerOn() + 'W');


    //add devices to first Bedroom;
    var fstBedroom = flat56.getRoom('Bedroom', 0);
    fstBedroom.addDevice(new Lamp('Table Lamp #01', 40));
    fstBedroom.addDevice(new VacuumCleaner('Table Lamp #01', 40));
    //Total power
    console.log(fstBedroom.getType() + ': ' + fstBedroom.getTotalPowerOn() + 'W');


    //add devices to second Bedroom
    var sndBedroom = flat56.getRoom('Bedroom', 1);
    sndBedroom.addDevice(new Lamp('Table Lamp #02', 60));
    sndBedroom.addDevice(new Computer('Computer',
        [
            new SystemBlock('Samsung GX Force', 2000),
            new Monitor('Samsung P3000', 50)
        ])
    );
    //turn on some devices
    var lamp = sndBedroom.getDevice('Table Lamp #02');
    var computer = sndBedroom.getDevice('Computer');
    lamp.turnOn();
    computer.turnOn();
    //Total power
    console.log(sndBedroom.getType() + ': ' + sndBedroom.getTotalPowerOn() + 'W');


    //add devices to Kitchen
    var kitchen = flat56.getRoom('Kitchen');
    kitchen.addDevice(new Fridge('Samsung PowerSaver 400', 550));
    kitchen.addDevice(new Toaster('Rowenta F3421', 750));
    kitchen.addDevice(new Microwaveoven('LG 43334', 750));
    kitchen.addDevice(new Stove('Samsung Stove R4344', 6000));
    //turn on some devices
    var fridge = kitchen.getDevice('Samsung PowerSaver 400');
    var stove = kitchen.getDevice('Samsung Stove R4344');
    fridge.turnOn();
    stove.turnOn();
    //Total power
    console.log(kitchen.getType() + ': ' + kitchen.getTotalPowerOn() + 'W');


    //add devices to Lounge
    var lounge = flat56.getRoom('Lounge');
    lounge.addDevice(new Lamp('Floor Lamp #03', 100));
    lounge.addDevice(new TVSet('Samsung UF48RT4000K', 300));
    //turn on some devices
    var tvSet = lounge.getDevice('Samsung UF48RT4000K');
    tvSet.turnOn();
    //Total power
    console.log(lounge.getType() + ': ' + lounge.getTotalPowerOn() + 'W');
	
	// Flat total power
	var totalpower = lounge.getTotalPowerOn()+kitchen.getTotalPowerOn()+sndBedroom.getTotalPowerOn()+ fstBedroom.getTotalPowerOn()+bathroom.getTotalPowerOn();
	console.log('TOTAL POWER: ' + totalpower +'W');

    //search device in flat
    flat56.searchDeviceByName('Samsung UF48RT4000K');
	flat56.searchDeviceByName('Rowenta F3421');
};