import { Point3d } from "./Point3d.ts";
import { IType } from "./TypeService.ts";

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

const engines = new Map<string, { massInKg: number }>();
engines.set("Shuttle", { massInKg: 52100 });
engines.set("Corvette", { massInKg: 96800 });
engines.set("Frigate", { massInKg: 200000 });
engines.set("Destroyer", { massInKg: 400000 });
engines.set("Cruiser", { massInKg: 400000 });
engines.set("Combat Cruiser", { massInKg: 800000 });
engines.set("Battleship", { massInKg: 800000 });

const shipValues = new Map<
  number,
  { fuelMaxLevel: number; massInKg: number; groupName: string }
>();
shipValues.set(84213, { // Clone Transport Capsule [placeholder]
  fuelMaxLevel: 280,
  massInKg: 4891000,
  groupName: "Shuttle",
});
shipValues.set(85036, { // Katzbalger [placeholder]
  fuelMaxLevel: 63,
  massInKg: 6322400,
  groupName: "Shuttle",
});
shipValues.set(84216, { // Longbow [placeholder]
  fuelMaxLevel: 49,
  massInKg: 4891000,
  groupName: "Shuttle",
});
shipValues.set(77799, { // Jauv
  fuelMaxLevel: 49,
  massInKg: 13253200,
  groupName: "Corvette",
});
shipValues.set(82425, { // Microptero
  fuelMaxLevel: 245,
  massInKg: 16378800,
  groupName: "Frigate",
});
shipValues.set(81609, { // Pici
  fuelMaxLevel: 330,
  massInKg: 26371000,
  groupName: "Frigate",
});
shipValues.set(81904, { // Raubtier
  fuelMaxLevel: 682,
  massInKg: 45476000,
  groupName: "Frigate",
});
shipValues.set(81810, { // Samoskyd-1
  fuelMaxLevel: 323,
  massInKg: 25841800,
  groupName: "Frigate",
});
shipValues.set(82424, { // Ungher
  fuelMaxLevel: 1370,
  massInKg: 73119800,
  groupName: "Frigate",
});
shipValues.set(82426, { // Val
  fuelMaxLevel: 539,
  massInKg: 26981100,
  groupName: "Frigate",
});
shipValues.set(81808, { // Dremar
  fuelMaxLevel: 1090,
  massInKg: 6764100,
  groupName: "Destroyer",
});
shipValues.set(82427, { // Harpia
  fuelMaxLevel: 1000,
  massInKg: 61655600,
  groupName: "Destroyer",
});
shipValues.set(82428, { // Strix
  fuelMaxLevel: 1520,
  massInKg: 93509100,
  groupName: "Destroyer",
});
shipValues.set(81905, { // Anser
  fuelMaxLevel: 7090,
  massInKg: 283816500,
  groupName: "Cruiser",
});
shipValues.set(82430, { // Baile
  fuelMaxLevel: 12100,
  massInKg: 483201300,
  groupName: "Cruiser",
});
shipValues.set(82431, { // Flegel
  fuelMaxLevel: 2990,
  massInKg: 144905600,
  groupName: "Cruiser",
});
shipValues.set(81809, { // Klinge
  fuelMaxLevel: 1,
  massInKg: 780204700,
  groupName: "Cruiser",
});
shipValues.set(82483, { // Axte
  fuelMaxLevel: 22100,
  massInKg: 802026100,
  groupName: "Combat Cruiser",
});
shipValues.set(81611, { // Rebus-K
  fuelMaxLevel: 48000,
  massInKg: 1556424000,
  groupName: "Combat Cruiser",
});
shipValues.set(81907, { // Caruda
  fuelMaxLevel: 38900,
  massInKg: 1379132300,
  groupName: "Battleship",
});
shipValues.set(81906, { // Grus
  fuelMaxLevel: 66200,
  massInKg: 2408785000,
  groupName: "Battleship",
});

export function calculateMaxJumpDistance(type: IType): number {
  const ship = shipValues.get(type.id);

  if (!ship) return 0;

  const fuelLevel = ship.fuelMaxLevel;
  const fuelQuality = ["Shuttle", "Corvette"].includes(type.group_name)
    ? 30
    : 90;
  const distanceConversionFactor = 1e5;
  const engineMassInKg = engines.get(ship.groupName)?.massInKg || 0;
  const shipMassInKg = engineMassInKg + ship.massInKg;

  return fuelLevel * fuelQuality * (distanceConversionFactor / shipMassInKg);
}
