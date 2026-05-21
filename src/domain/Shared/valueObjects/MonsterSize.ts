import { ValueObject } from "./ValueObject";

const sizeList = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];

export interface MonsterSizeProps {
  value: string;
}

export class MonsterSize extends ValueObject<MonsterSizeProps> {
  get value(): string { return this.props.value; }

  private constructor(props: MonsterSizeProps) { super(props); }

  public static create(size: string): MonsterSize {
    if (!size || size.trim().length === 0) {
      throw new Error('Size cannot be empty');
    }

    if (!sizeList.includes(size.trim())) {
      throw new Error('Size must be valid');
    }

    return new MonsterSize({ value: size.trim() });
  }
}
