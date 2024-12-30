import { Point3d } from "./Point3d.ts";

function bitLength(n: bigint) {
  return n.toString(16).length * 4;
}

function sqrt(value: bigint): bigint {
  if (value < 0n) {
    throw "square root of negative numbers is not supported";
  }

  if (value < 2n) {
    return value;
  }

  function newtonIteration(n: bigint, x0: bigint) {
    const x1 = ((n / x0) + x0) >> 1n;

    if (x0 === x1 || x0 === (x1 - 1n)) {
      return x0;
    }

    return newtonIteration(n, x1);
  }

  const guess = 1n +
    (sqrt(value >> BigInt(Math.floor(bitLength(value) / 2))) <<
      BigInt(Math.floor(bitLength(value) / 4)));

  return newtonIteration(value, guess);
}

export function distance(p1: Point3d, p2: Point3d): bigint {
  return sqrt(
    ((p2.x - p1.x) ** 2n) + ((p2.y - p1.y) ** 2n) + ((p2.z - p1.z) ** 2n),
  );
}

export function scaleBetween(
  unscaledNum: bigint,
  minAllowed: bigint,
  maxAllowed: bigint,
  min: bigint,
  max: bigint,
) {
  return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) +
    minAllowed;
}
