import { Complex, getConvergence } from '../';

test('Complex.add', () => {
  const A = new Complex(2, 2);
  const B = new Complex(5, -5);
  const C = A.add(B);

  expect(C.a).toBe(7);
  expect(C.b).toBe(-3);
});

//a^2 + ab + ba - b^2

//(a^2 - b^2) + (2abi)

// test('Complex.mul', () => {
//     const A = new Complex(3,3);
//     const B = A.mul(A);

//     expect(B.a).toBe(A.a*A.a - A.b*A.b);
//     expect(B.b).toBe(2 * A.a * A.b);
// });

// test('Complex.mul random', () => {

// });

test('wat', () => {
    const A = new Complex(0,0.4);
    console.log(0*0-.4*.4,Math.sqrt(0*0-.4*.4), A.magnitude());
    expect(A.magnitude()).not.toBe(NaN);
});

const asdf = (inputs: number[][]) => {
  inputs.forEach(p => {
    const a: number = p[0];
    const b: number = p[1];
    test(`Complex ${a}+${b}i mul`, () => {
      const A = new Complex(a, b);
      const B = A.mul(A);
      const C = new Complex(0,0);
      
      const _a = a * a - b * b;
      const _b = 2 * a * b;

      const X = A.mul(A).add(A);
      console.log(X.toString());
      const Y = X.mul(X).add(A);
      console.log(Y.toString());

      expect(_a).not.toBe(NaN);
      expect(_b).not.toBe(NaN);

      expect(B.a).toBe(_a);
      expect(B.b).toBe(_b);
    });
  });
};

const numbersToTest = [];
for (let i = 0; i < 100; i++) {
  for (let j = 100; j > 0; j--) {
    numbersToTest.push([i / 100000, -j / 100000]);
  }
}

asdf([[0,.8]])
// asdf(numbersToTest);

test('convergence', () => {
    const convergence = getConvergence(new Complex(0,0), new Complex(0,.8),1000,2);
    console.log(convergence);
    expect(convergence).not.toBe(undefined);
})