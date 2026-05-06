import { ValueObject } from "./ValueObject";

export interface LevelProps {
  value: number;
}

export class Level extends ValueObject<LevelProps> {
  get value(): number { return this.props.value; }

  private constructor(props: LevelProps) { super(props); }


  public static create(level: number): Level {
    if (Number.isNaN(level)) {
      throw new Error('Invalid number');
    }
    else if (!Number.isInteger(level)) {
      throw new Error('Number must be an integer');
    }
    else if (level < 0) {
      throw new Error('Level cannot be lesser than 0');
    }
    else if (level > 9) {
      throw new Error('Level cannot be greater than 9');
    }
    else {
      return new Level({ value: level });
    }
  }
}