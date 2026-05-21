import { ValueObject } from "./ValueObject";

const typeList = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead'
];

export interface MonsterTypeProps {
  value: string;
}

export class MonsterType extends ValueObject<MonsterTypeProps> {
  get value(): string { return this.props.value; }

  private constructor(props: MonsterTypeProps) { super(props); }

  public static create(type: string): MonsterType {
    if (!type || type.trim().length === 0) {
      throw new Error('Type cannot be empty');
    }

    if (!typeList.includes(type.trim())) {
      throw new Error('Type must be valid');
    }

    return new MonsterType({ value: type.trim() });
  }
}
