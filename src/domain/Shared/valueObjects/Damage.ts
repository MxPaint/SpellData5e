import { ValueObject } from "./ValueObject";

const damageList = ['bludgeoning', 'piercing', 'slashing', ''];

export interface DamageProps {
  value: string;
}

export class Damage extends ValueObject<DamageProps> {
  get value(): string { return this.props.value; }

  private constructor(props: DamageProps) { super(props); }

  public static create(damage: string): Damage {

    if (!damageList.includes(damage.trim())) {
      throw new Error('Damage must be valid');
    }

    return new Damage({ value: damage.trim() });
  }
}