import { ValueObject } from "./ValueObject";

const classList = ['bard', 'cleric', 'druid', 'ranger', 'sorcerer', 'warlock', 'wizard'];

export interface ClassProps {
  value: string;
}

export class CharacterClass extends ValueObject<ClassProps> {
  get value(): string { return this.props.value; }

  private constructor(props: ClassProps) { super(props); }

  public static create(characterClass: string): CharacterClass {
    if (!characterClass || characterClass.trim().length === 0) {
      throw new Error('Class cannot be empty');
    }

    if (!classList.includes(characterClass.trim())) {
      throw new Error('Class must be valid');
    }

    return new CharacterClass({ value: characterClass.trim() });
  }
}