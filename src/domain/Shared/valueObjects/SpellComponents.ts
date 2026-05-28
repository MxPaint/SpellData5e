import { ValueObject } from "./ValueObject";

export interface SpellComponentsProps {
  verbal: boolean;
  somatic: boolean;
  material: boolean;
}

export class SpellComponents extends ValueObject<SpellComponentsProps> {
  get verbal(): boolean { return this.props.verbal; }
  get somatic(): boolean { return this.props.somatic; }
  get material(): boolean { return this.props.material; }

  getComponents = () => {
    let text = ' ';
    if(this.verbal) {
      text += 'V ';
    }
    if(this.somatic) {
      text += 'S ';
    }
    if(this.material) {
      text += 'M ';
    }
    return text;
  }

  private constructor(props: SpellComponentsProps) { super(props); }

  public static create(
    verbal: boolean,
    somatic: boolean,
    material: boolean
  ): SpellComponents {
    return new SpellComponents({ verbal, somatic, material });
  }
}