import { ValueObject } from "./ValueObject";

export interface AttunementProps {
  value: boolean;
}

export class Attunement extends ValueObject<AttunementProps> {
  get value(): boolean { return this.props.value; }

  private constructor(props: AttunementProps) { super(props); }

  public static create(attunement: string): Attunement {
    if (attunement === '') {
      return new Attunement({ value: false });
    }

    return new Attunement({ value: true });
  }
}