export interface ValueObjectProps {
  [index: string]: unknown;
}

export class ValueObject<T extends ValueObjectProps> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (other.props === undefined) {
      return false;
    }

    for (const key in this.props) {
      if (!(key in other.props) || this.props[key] !== other.props[key]) {
        return false;
      }
    }
    for (const key in other.props) {
      if (!(key in this.props) || this.props[key] !== other.props[key]) {
        return false;
      }
    }

    return true;
  }
}
