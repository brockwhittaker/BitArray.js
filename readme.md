# BitArray.js

BitArray.js is a micro-library that creates an array of booleans with less than 2% of the memory consumption of an array of booleans.

BitArray weighs in at just 0.85kb compressed and 0.35kb gzipped, which makes it extremely lightweight to add to any project.

## Tests

There are three tests for speed vs. memory consumption:

1. Creating an array with 10m elements and adding a boolean to each index.

```js
const arr = [];

for (let x = 0; x < 1e7; x++) {
    arr[x] = !!Math.round(Math.random());
}

return arr;
```

2. Creating an array with a pre-assigned length of 10m and adding a boolean to each index.

```js
const arr = new Array(1e7);

for (let x = 0; x < 1e7; x++) {
    arr[x] = !!Math.round(Math.random());
}

return arr;
```

3. Testing the BitArray.

```js
const arr = new BitArray();

for (let x = 0; x < 1e7; x++) {
    arr.set(x, !!Math.round(Math.random()));
}

return arr;
```

### Results

| Structure      | Time  | Heap Size   | % Memory |
| -------------- | ----- | ----------  | -------- |
| Dynamic Array  | 740ms | 335,155,200 | 100%     |
| Pre-Init Array | 267ms | 81,068,032  | 24.19%   |
| BitArray       | 479ms | 4,194,304   | 1.25%    |

## Methods

The BitArray class only has three methods currently: `get`, `set`, and `flip`.

## Usage

Below is a quick demo of all the cases this can be used with:

```js
let array = new BitArray();
array.get(0);       // false
array.set(0, true); // true
array.get(0);       // true
array.flip(0);      // false
```

## Under the Hood

The booleans are stored in a nested array with the signature of `Array<Uint32Array>`. The array is flexible in length whereas the `Uint32Array` by default is fixed. Each boolean is stored as a bit inside of a 32-bit integer.

## Customization

One option is given, which is `binSize`. This is the size of a `Uint32Array` (a bin of integers). With smaller sets of only a few dozen booleans it would be beneficial to use a small bin size like 1 or 2. When dealing with millions of booleans however, you can do some napkin math to figure out how large the `Uint32Array` should be (given that less separate arrays means less seperate overhead and pointers in memory).

Each integer fits 32 booleans, so a bin of 100 `Uint32Array` objects would be capable of storing 3,200 flags.

###Example

Below is an example of setting the binSize to be 1000:

```js
let binSize = 1e3;
const array = new BitArray({ binSize });
```

## Contribute

If you have a contribution you'd like to make, submit a pull request! Try to match the style of the code written – it should have the appearance of being written by a single author.
