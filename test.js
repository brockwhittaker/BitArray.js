const v8 = require("v8"),
      BitArray = require("./bits")

let compare = {
    standard: () => {
        const arr = [];

        for (let x = 0; x < 1e7; x++) {
            arr[x] = !!Math.round(Math.random());
        }

        return arr;
    },

    fixedArray: () => {
        const arr = new Array(1e7);

        for (let x = 0; x < 1e7; x++) {
            arr[x] = !!Math.round(Math.random());
        }

        return arr;
    },

    bitArray: () => {
        const arr = new BitArray();

        for (let x = 0; x < 1e7; x++) {
            arr.set(x, !!Math.round(Math.random()));
        }

        return arr;
    }
};

const TEST = "bitArray";

const s1 = v8.getHeapStatistics(),
      d = new Date();
let arr = compare[TEST]();
console.log(new Date() - d, v8.getHeapStatistics().total_heap_size - s1.total_heap_size);
