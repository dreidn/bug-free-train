// import Canvas from './canvas';

const world = '🗺️';

/**
 * Class for representing a complex number
 */
class Complex {
  a: number;
  b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  toString(this: Complex): string {
    return `${this.a}+${this.b}i`;
  }

  fromReal(this: Complex, r: number): Complex {
    return new Complex(r, 0);
  }

  add(this: Complex, x: Complex): Complex {
    return new Complex(x.a + this.a, x.b + this.b);
  }

  mul(this: Complex, x: Complex): Complex {
    return new Complex(
      this.a * x.a + -1 * this.b * x.b,
      this.a * x.b + this.b * x.a
    );
  }

  magnitude(this: Complex): number {
    return Math.sqrt(this.a * this.a + this.b * this.b * -1);
  }
}

export function hello(word: string = world): string {
  return `Hello ${word}!`;
}

const P: (c: Complex, z: Complex) => Complex = (c, z) => {
  return z.mul(z).add(c);
};



/**
 * Calculate convergence for two complex numbers. This is the number
 * of iterations required to reach the threshold. -1 means the threshold was not
 * reached.
 * @param Z 
 * @param C 
 * @param iterations 
 * @param threshold 
 */
const getConvergence: (
  Z: Complex,
  C: Complex,
  iterations?: number,
  threshold?: number
) => number = (Z, C, iterations = 30, threshold = 2) => {
  let converge = 0;

  while (converge < iterations && Z.magnitude() <= 2) {
    Z = P(C, Z);
    converge += 1;
  }

  return converge === iterations ?
    -1
    :
    converge;
};

/**
 * I
 * @param min 
 * @param max 
 * @param width 
 * @param height 
 */
const t = (min = -2, max = 2, width: number, height: number) => {
  const _a = min;
  const _b = min;

  const deltaA = (max - min) / width;
  const deltaB = (max - min) / height;

  const m = new Map();

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const convergence = getConvergence(
        new Complex(0, 0),
        new Complex(i * deltaA, j * deltaB)
      );
      m.set([i, j], convergence);
    }
  }

  return m;
};

const convergenceToColor = new Map([
  [0, [0, 0, 0]],
  [1, [75, 137, 237]], //lightish blue
  [2, [75, 237, 234]], //teal
  [3, [118, 237, 75]], //green
  [4, [229, 237, 75]],//yellow
  [5, [237, 156, 75]],//orange
  [6, [237, 89, 75]],//salmon
  [7, [237, 75, 167]], //pink
  [8, [207, 75, 237]], //purple
  [9, [94, 75, 237]], //bluer purple
  [10, [127, 237, 75]], // a green
]);

const getColorMap = (cMap: Map<number[], number>) => {
  const rgb = new Map();

  cMap.forEach((v, k) => {
    const color = convergenceToColor.has(v) ?
      convergenceToColor.get(v)
      :
      [0, 0, 0];
    rgb.set(k, color);
  });

  return rgb;
};


const C = new Complex(5, 3);
const Z = new Complex(0, 0);
console.log(getConvergence(Z, C));
console.log(t(0, 10, 10, 10));
