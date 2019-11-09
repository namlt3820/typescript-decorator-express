// Introduction to metadata, a javascript feature
// This file has no use to the current project whatsoever, just run it alone with ts-node and see the outcome

import 'reflect-metadata';

// Basic
// const plane = {
//     color: 'red',
// };

// Reflect.defineMetadata('note', 'hi there', plane);
// Reflect.defineMetadata('height', 10, plane);
// Reflect.defineMetadata(
//     'note',
//     "hi there. I'm metadata of object property",
//     plane,
//     'color',
// );

// const note = Reflect.getMetadata('note', plane);
// const height = Reflect.getMetadata('height', plane);
// const noteFromProp = Reflect.getMetadata('note', plane, 'color');

// console.log('plane', plane);
// console.log('note', note);
// console.log('height', height);
// console.log('noteFromProp', noteFromProp);

// Practical
const printMetadata = (target: typeof Plane): void => {
    for (const key in target.prototype) {
        const secret = Reflect.getMetadata('secret', target.prototype, key);
        console.log('from class decorator:', secret);
    }
};

const markFunction = (secretInfo: string) => (
    target: Plane,
    key: string,
): void => {
    Reflect.defineMetadata('secret', secretInfo, target, key);
};

@printMetadata
class Plane {
    color = 'red';

    @markFunction('data from factory decorator')
    fly(): void {
        console.log('vrrrrr');
    }
}

const secretInfo = Reflect.getMetadata('secret', Plane.prototype, 'fly');
console.log('secretInfo:', secretInfo);
