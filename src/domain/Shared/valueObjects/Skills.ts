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
  get skills(): Skill[] { 
    const skillList: Skill[] = [];
    this.props.skills.map((item) => {
      if(item.value !== 0) {
        skillList.push(item);
      }
    })
    return skillList; }

  private constructor(props: SkillsProps) { super(props); }

  public static create(skills: SkillGroup): Skills {

    const skillList: Skill[] = [
      {name: 'Acrobatics', value: skills.acrobatics},
      {name: 'AnimalHandling', value: skills.animalHandling},
      {name: 'Arcana', value: skills.arcana},
      {name: 'Athletics', value: skills.athletics},
      {name: 'Deception', value: skills.deception},
      {name: 'History', value: skills.history},
      {name: 'Insight', value: skills.insight},
      {name: 'Intimidation', value: skills.intimidation},
      {name: 'Investigation', value: skills.investigation},
      {name: 'Medicine', value: skills.medicine},
      {name: 'Nature', value: skills.nature},
      {name: 'Perception', value: skills.perception},
      {name: 'Performance', value: skills.performance},
      {name: 'Persuasion', value: skills.persuasion},
      {name: 'Religion', value: skills.religion},
      {name: 'SleightOfHand', value: skills.sleightOfHand},
      {name: 'Stealth', value: skills.stealth},
      {name: 'Survival', value: skills.survival}
    ];

    return new Skills({skills: skillList});
    
  }
}
