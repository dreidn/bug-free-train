import {initializeCanvas, getCanvasContext} from './canvas';
const world = '🗺️';
import { Complex, getConvergence } from './math';

export function hello(word: string = world): string {
  return `Hello ${word}!`;
}

const P: (c: Complex, z: Complex) => Complex = (c, z) => {
  return z.mul(z).add(c);
};



/**
 * I
 * @param min
 * @param max
 * @param width
 * @param height
 */
const t = (width: number, height: number, min = -2, max = 2) => {
  const _a = min;
  const _b = min;

  const deltaA = (max - min) / width;
  const deltaB = (max - min) / height;

  console.log('Building pixel map', deltaA, deltaB);
  const m = new Map();

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const convergence = getConvergence(
        new Complex(0, 0),
        new Complex(i * deltaA, j * deltaB),
        1000,
        2,
        `${i},${j}`
      );
      m.set([i, j], convergence);
    }
  }

  return m;
};

const convergenceToColor = new Map([
  [-1, [0, 0, 0, 0]],
  [0, [255, 255, 255, 0]],
  [1, [75, 137, 237, 0]], //lightish blue
  [2, [75, 237, 234, 0]], //teal
  [3, [118, 237, 75, 0]], //green
  [4, [229, 237, 75, 0]], //yellow
  [5, [237, 156, 75, 0]], //orange
  [6, [237, 89, 75, 0]], //salmon
  [7, [237, 75, 167, 0]], //pink
  [8, [207, 75, 237, 0]], //purple
  [9, [94, 75, 237, 0]], //bluer purple
  [10, [127, 237, 75, 0]], // a green
]);

const getColorMap = (pixelConvergenceMap: Map<number[], number>) => {
  const rgb = new Map();

  pixelConvergenceMap.forEach((convergence: number, pixel: number[]) => {
    const color = convergenceToColor.has(convergence)
      ? convergenceToColor.get(convergence)
      : [0, 0, 0, 0];
    rgb.set(pixel, color);
  });

  return rgb;
};

const colorMapToArray = (map:Map<number[],number[]>, data:ImageData) => {
  const arr:number[][] = [];

  map.forEach((_, color) => {
    arr.push(color);
  });

  return arr;
}

const colorMap = getColorMap(t(100,100));
const imgData = colorMapToArray(colorMap);

const body = document.getElementsByTagName("body")[0];
// console.log(getColorMap(t(100, 100)));
const canvas = initializeCanvas(undefined, body);
const context = getCanvasContext(canvas);
context.putImageData(imgData, 0, 0)