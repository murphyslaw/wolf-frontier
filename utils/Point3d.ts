import { ValueObject, ValueObjectProps } from "./ValueObject.ts";

interface Point3dProps extends ValueObjectProps {
  x: bigint;
  y: bigint;
  z: bigint;
}

export class Point3d extends ValueObject<Point3dProps> {
  public static create(x: bigint, y: bigint, z: bigint): Point3d {
    return new Point3d({ x, y, z });
  }

  constructor(props: Point3dProps) {
    super(props);
  }

  get x(): bigint {
    return this.props.x;
  }
  get y(): bigint {
    return this.props.x;
  }
  get z(): bigint {
    return this.props.x;
  }
}
