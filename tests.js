const BitArray = require("./bits");

const Test = () => {
    const results = {
        pass: 0,
        fail: 0
    };

    console.log("\nStarting tests...\n");

    return {
        assert: {
            equal: (v1, v2) => {
                let flag = v1 === v2,
                    str  = flag ? `SUCCESS: ${v1} === ${v2}` : `ERROR: ${v1} !== ${v2}`;

                if (flag)   results.pass++;
                else        results.fail++;

                console.log(str);

                if (!flag) {
                    let err = new Error().stack;
                    console.log(err.split(/\n/)[2]);
                }
            }
        },

        results: () => {
            console.log(`\nPASSED: ${results.pass}\nFAILED: ${results.fail}\n`);

            if (results.pass && !results.fail) {
                console.log("All tests passed successfully!\n");
            }
        }
    };
}

const bits = new BitArray(),
      test = Test();

// simple bit initialization.
bits.set(0, true);
bits.set(1, false);
bits.set(2000, true);
bits.set(3, true);

test.assert.equal(bits.get(0), true);
test.assert.equal(bits.get(1), false);
test.assert.equal(bits.get(2000), true);
test.assert.equal(bits.get(3), true);

// test flipping the value of the bit.
bits.flip(3);

// test multi-resetting of bit.
bits.set(234809, true);
bits.set(234809, false);
bits.flip(234809);

test.assert.equal(bits.get(3), false);
test.assert.equal(bits.get(234809), true);

console.log(test.results());
