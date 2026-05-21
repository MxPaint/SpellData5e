import { ValueObject } from "./ValueObject";

export interface StatProps {
  value: number;
}

export class Stat extends ValueObject<StatProps> {
  get value(): number { return this.props.value; }

  private constructor(props: StatProps) { super(props); }

  getMod = () => {
    return Math.floor((this.props.value - 10)/2);
  }

  public static create(stat: number): Stat {
    if (Number.isNaN(stat)) {
      throw new Error('Invalid number');
    }
    else if (!Number.isInteger(stat)) {
      throw new Error('Number must be an integer');
    }
    else if (stat < 0) {
      throw new Error('Stat cannot be lesser than 0');
    }
    else if (stat > 30) {
      throw new Error('Stat cannot be greater than 30');
    }
    else {
      return new Stat({ value: stat });
    }
  }
}
