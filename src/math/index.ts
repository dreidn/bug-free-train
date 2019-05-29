/**
 * Class for representing a complex number
 */
export class Complex {
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
    return Math.sqrt(this.a * this.a + this.b * this.b);
  }
}

/**
 * Calculate convergence for two complex numbers. This is the number
 * of iterations required to reach the threshold. -1 means the threshold was not
 * reached.
 * @param Z
 * @param C
 * @param iterations
 * @param threshold
 */
export const getConvergence: (
    Z: Complex,
    C: Complex,
    iterations?: number,
    threshold?: number,
    tag?: string,
    P?: (a:Complex, b:Complex) => Complex
  ) => number = (Z, C, 
    iterations = 30, 
    threshold = 2, 
    tag = '', 
    P =  (c: Complex, z: Complex) => z.mul(z).add(c)) => {
        let converge = 0;
    
        if (Z.magnitude() === 0 && C.magnitude() === 0) {
        return -1;
        }
    
        while (converge < iterations && Z.magnitude() <= 2) {
        // console.log(
        //   'P(',
        //   Z.toString(),
        //   C.toString(),
        //   ')',
        //   Z.magnitude(),
        //   converge,
        //   iterations,
        //   tag
        // );
        // console.log(C,Z, Z.magnitude());
        Z = P(C, Z);
        // console.log(
        //   'P(',
        //   Z.toString(),
        //   C.toString(),
        //   ')',
        //   Z.magnitude(),
        //   converge,
        //   iterations,
        //   'tag',tag
        // );
    
        converge += 1;
        }
    
        return converge === iterations ? -1 : converge;
  };
