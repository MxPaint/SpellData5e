import { ValueObject } from "./ValueObject";

export interface PlainBoolProps {
  value: boolean;
}

export class PlainBool extends ValueObject<PlainBoolProps> {
  get value(): boolean { return this.props.value; }

  private constructor(props: PlainBoolProps) { super(props); }

  public static create(value: boolean): PlainBool {
    return new PlainBool({ value });
  }
}