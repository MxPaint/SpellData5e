import { ValueObject } from "./ValueObject";

export interface StatProps {
  stat: number;
  save: number;
}

export class Stat extends ValueObject<StatProps> {
  get stat(): number { return this.props.stat; }
  get save(): number { return this.props.save; }

  private constructor(props: StatProps) { super(props); }

  getMod = () => {
    return Math.floor((this.props.stat - 10)/2);
  }

  public static create(stat: number, save: number): Stat {
    if (Number.isNaN(stat)) {
      throw new Error('Invalid number');
    }
    if (!Number.isInteger(stat)) {
      throw new Error('Number must be an integer');
    }
    if (stat < 0) {
      throw new Error('Stat cannot be lesser than 0');
    }
    if (stat > 30) {
      throw new Error('Stat cannot be greater than 30');
    }

    if (Number.isNaN(save)) {
      throw new Error('Invalid number');
    }
    if (!Number.isInteger(save)) {
      throw new Error('Number must be an integer');
    }
    if (save < -20) {
      throw new Error('Save cannot be lesser than -20');
    }
    if (save > 20) {
      throw new Error('Save cannot be greater than 20');
    }
    
    if(save === 0) {
      return new Stat({ stat, save: Math.floor((stat - 10)/2)});
    }

    return new Stat({stat, save});
    
  }
}
