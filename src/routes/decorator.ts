// Introduction to combining express and typescript using decorator
// This file has no use to the current project whatsoever, just run it alone with ts-node and see the outcome

const logError = (errorMessage: string) => (
    target: any,
    key: string,
    desc: PropertyDescriptor,
): void => {
    const method = desc.value;
    desc.value = function(): void {
        try {
            method();
        } catch (e) {
            console.log(errorMessage);
        }
    };
};

const testDecorator = (target: any, key: string): void => {
    console.log('target', target);
    console.log('key', key);
};

const parameterDecorator = (target: any, key: string, index: number): void => {
    console.log('key', key);
    console.log('index', index);
};

const classDecorator = (constructor: typeof Boat) => {
    console.log('constructor', constructor);
};

@classDecorator
class Boat {
    // @testDecorator
    color = 'red';

    // @testDecorator
    get formattedColor(): string {
        return `This boat's color is ${this.color}`;
    }

    @logError('Oops, boat was sunk in ocean')
    pilot(
        @parameterDecorator speed: string,
        @parameterDecorator generateWake: boolean,
    ): void {
        if (speed === 'fast') {
            console.log('swish');
        } else {
            console.log('nothing');
        }
    }
}
