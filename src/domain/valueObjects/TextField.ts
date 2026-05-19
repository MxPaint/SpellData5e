import { ValueObject } from "./ValueObject";

export interface TextFieldProps {
  value: string;
}

export class TextField extends ValueObject<TextFieldProps> {
  get value(): string { return this.props.value; }

  private constructor(props: TextFieldProps) { super(props); }

  public static create(text: string): TextField {
    if (!text || text.trim().length === 0) {
      throw new Error('Text cannot be empty');
    }

    return new TextField({ value: text.trim() });
  }
}
