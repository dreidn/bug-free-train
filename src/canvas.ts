
let canvas;

export function initializeCanvas(id = "canvas", targetElement: HTMLElement) {
  canvas = document.createElement('canvas');
  canvas.id = id;

  targetElement.appendChild(canvas);

  return canvas;
}

export function getCanvasContext(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');

  if (ctx === null) {
    throw new Error("Could not get canvas context");
  }

  return ctx;
}