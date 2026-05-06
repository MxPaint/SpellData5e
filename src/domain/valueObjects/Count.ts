import { ValueObject } from "./ValueObject";

export interface CountProps {
  value: number;
}

export class Count extends ValueObject<CountProps> {
  get value(): number { return this.props.value; }

  private constructor(props: CountProps) { super(props); }


  public static create(count: number): Count {
    if (Number.isNaN(count)) {
      throw new Error('Invalid number');
    }
    else if (count < 0) {
      throw new Error('Count cannot be lesser than 0');
    }
    else if (!Number.isInteger(count)) {
      throw new Error('Count must be an integer');
    }
    else {
      return new Count({ value: count });
    }
  }
}