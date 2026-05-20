import { ValueObject } from "./ValueObject";

const ID_VALIDATE = /[a-zA-Z0-9]+/;

export interface IdProps {
  value: string;
}

export class Id extends ValueObject<IdProps> {
  get value(): string { return this.props.value; }

  private constructor(props: IdProps) { super(props); }

  public static generate(): Id {
    return new Id({ value: Math.random().toString(36).replace('0.', '') });
  }

  public static create(id: string): Id {
    if (!id || id.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }

    if (!ID_VALIDATE.test(id.trim())) {
      throw new Error('Id must be valid');
    }

    return new Id({ value: id.trim() });
  }
}