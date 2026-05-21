import { ValueObject } from "./ValueObject";

export interface SpeedProps {
  walk: number,
  burrow: number,
  climb: number,
  swim: number,
  fly: number,
  hover: boolean
}

export class SpeedBlock extends ValueObject<SpeedProps> {
  get walk(): number { return this.props.walk; }
  get burrow(): number { return this.props.burrow; }
  get climb(): number { return this.props.climb; }
  get swim(): number { return this.props.swim; }
  get fly(): number { return this.props.fly; }
  get hover(): boolean { return this.props.hover; }

  private constructor(props: SpeedProps) {super(props);}

  public static create(
    walk: number,
    burrow: number,
    climb: number,
    swim: number,
    fly: number,
    hover: boolean
  ): SpeedBlock {

    return new SpeedBlock({ walk, burrow, climb, swim, fly, hover });
    
  }
}
