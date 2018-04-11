function createComputerHierarchy() {

    class Product{
        constructor(manufacturer){
            if(new.target === Product){
                throw new TypeError('Cannot make an instance of an abstract class.');
            }
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Product {
        constructor(manufacturer, responseTime){
            super(manufacturer)
            this.responseTime = Number(responseTime);
        }
    }

    class Monitor extends Product {
        constructor(manufacturer, width, height){
            super(manufacturer)
            this.width  = Number(width);
            this.height = Number(height);
        }
    }

    class Battery extends Product {
        constructor(manufacturer, expectedLife){
            super(manufacturer)
            this.expectedLife  = Number(expectedLife);
        }
    }

    class Computer extends Product {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace){
            super(manufacturer)
            if(new.target === Computer){
                throw new TypeError('Cannot make an instance of an abstract class.');
            }
            this.processorSpeed = Number(processorSpeed);
            this.ram = Number(ram);
            this.hardDiskSpace = Number(hardDiskSpace);
        }
    }

    class Laptop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery){
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.weight = Number(weight);
            this.color = color;
            this.battery = battery;
        }

        set battery(battery){
            if(battery instanceof Battery){
                this._battery = battery;
            }
            else{
                throw new TypeError;
            }
        }

        get battery(){
            return this._battery;
        }
    }

    class Desktop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor){
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        set keyboard(value){
            if(value instanceof Keyboard){
                this._keyboard = value;
            }
            else{
                throw new TypeError;
            }
        }

        get keyboard() {
            return this._keyboard;
        }

        set monitor(value){
            if(value instanceof Monitor){
                this._monitor = value;
            }
            else{
                throw new TypeError;
            }
        }


        get monitor(){
            return this._monitor;
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}