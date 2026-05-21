import { ValueObject } from './ValueObject';

export interface PositiveNumberProps {
  value: number;
}

export class PositiveNumber extends ValueObject<PositiveNumberProps> {
  private constructor(props: PositiveNumberProps) {
    super(props);
  }

  public static create(number: number): PositiveNumber {
    const value = Number(number);

    if (Number.isNaN(value)) {
      throw new Error('Invalid number');
    }
    else if (value < 0) {
      throw new Error('Number must be non-negative');
    }
    else if (!Number.isInteger(value)) {
      throw new Error('Number must be an integer');
    }
    else {
      return new PositiveNumber({ value });
    }
  }

  public get value(): number {
    return this.props.value;
  }
}
