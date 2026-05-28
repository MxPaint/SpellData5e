import { ValueObject } from "./ValueObject";

type Skill = {
  name: string,
  value: number
}

interface SkillGroup {
  acrobatics: number;
  animalHandling: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleightOfHand: number;
  stealth: number;
  survival: number;
}

export interface SkillsProps {
  skills: Skill[];
}

export class Skills extends ValueObject<SkillsProps> {
  get skills(): Skill[] { return this.props.skills; }

  private constructor(props: SkillsProps) { super(props); }

  public static create(skills: SkillGroup): Skills {

    const skillList: Skill[] = [
      {name: 'acrobatics', value: skills.acrobatics},
      {name: 'animalHandling', value: skills.animalHandling},
      {name: 'arcana', value: skills.arcana},
      {name: 'athletics', value: skills.athletics},
      {name: 'deception', value: skills.deception},
      {name: 'history', value: skills.history},
      {name: 'insight', value: skills.insight},
      {name: 'intimidation', value: skills.intimidation},
      {name: 'investigation', value: skills.investigation},
      {name: 'medicine', value: skills.medicine},
      {name: 'nature', value: skills.nature},
      {name: 'perception', value: skills.perception},
      {name: 'performance', value: skills.performance},
      {name: 'persuasion', value: skills.persuasion},
      {name: 'religion', value: skills.religion},
      {name: 'sleightOfHand', value: skills.sleightOfHand},
      {name: 'stealth', value: skills.stealth},
      {name: 'survival', value: skills.survival}
    ];

    return new Skills({skills: skillList});
    
  }
}
