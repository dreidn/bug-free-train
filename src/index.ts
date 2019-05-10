const world = '🗺️';

class Complex {
    //a + bi
    a: number;
    b: number;
    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    };
    toString(this: Complex): string {
        return `${this.a}+${this.b}i`;
    };
    fromReal(this: Complex, r: number): Complex {
        return new Complex(r, 0);
    };
    add(this: Complex, x: Complex): Complex {
        return new Complex(x.a + this.a, x.b + this.b);
    };
    mul(this: Complex, x: Complex): Complex {
        return new Complex(
            this.a * x.a + -1 * this.b * x.b,
            this.a * x.b + this.b * x.a
        )
    }
    magnitude(this: Complex): number {
        return Math.sqrt(this.a * this.a + this.b * this.b * -1);
    }
}

export function hello(word: string = world): string {
    return `Hello ${word}!`;
}

let f: (c: Complex, z: Complex) => Complex =
    function (c, z) {
        return z.mul(z).add(c);
    }

const THRESHOLD = 30;

const C = new Complex(.01, .02);
let Z = new Complex(0, 0);

const pixels = new Map();

let getConvergence: (Z: Complex, C: Complex, iterations: number) => boolean =
    function (Z, C, iterations = 30) {
        // let converge = 0;

        for (let i = 0; i < iterations; i++) {
            console.log(Z.toString());
            Z = f(C, Z);
            if (Z.magnitude() > THRESHOLD) {
                return false;
            }
        }

        return true;
    }


const stream = (min: number, max: number, width: number, height: number) => new ReadableStream({
    start(controller) {
        let _a = min;
        let _b = min;
        let delta_a = (max - min) / width;
        let delta_b = (max - min) / height;

        const push = () => {
            if (_a > max && _b > max) {
                controller.close();
                return;
            } else if (_a > max) {
                controller.enqueue(new Complex(max, _b))
            } else if (_b > max) {
                controller.enqueue(new Complex(_a, max))
            } else {
                controller.enqueue(new Complex(_a, _b));
            }

            _a += delta_a;
            _b += delta_b;

            push();
        }

        push();
    }
})

const onNext = (reader: any) => (next: any) => {
    if (next.done) {
        console.log("COMPLESE");
        return;
    }

    console.log(next.value.toString());

    return reader.read().then(onNext(reader));
}

const reader = stream(100, 100, 100, 100).getReader();
const parseStreamrResult = onNext(reader);
reader.read().then(parseStreamrResult);