import { ValueObject } from "./ValueObject";

const schoolList = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];

export interface SchoolProps {
  value: string;
}

export class School extends ValueObject<SchoolProps> {
  get value(): string { return this.props.value; }

  private constructor(props: SchoolProps) { super(props); }

  public static create(school: string): School {
    if (!school || school.trim().length === 0) {
      throw new Error('School cannot be empty');
    }

    if (!schoolList.includes(school.trim())) {
      throw new Error('School must be valid');
    }

    return new School({ value: school.trim() });
  }
}