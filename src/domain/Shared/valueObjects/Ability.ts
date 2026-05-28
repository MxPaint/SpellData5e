import { ValueObject } from "./ValueObject";

export interface AbilityProps {
  name: string;
  desc: string;
}

export class Ability extends ValueObject<AbilityProps> {
  get name(): string { return this.props.name; }
  get desc(): string { return this.props.desc; }

  private constructor(props: AbilityProps) { super(props); }

  public static create(name: string, desc: string): Ability {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }

    if (!desc || desc.trim().length === 0) {
      throw new Error('Description cannot be empty');
    }

    return new Ability({ name: name.trim(), desc: desc.trim() });
  }
}