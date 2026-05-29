import { Entity } from "../../Shared/entities/Entity";
import { Ability } from "../../Shared/valueObjects/Ability";
import { Id } from "../../Shared/valueObjects/Id";
import { MonsterSize } from "../../Shared/valueObjects/MonsterSize";
import { MonsterType } from "../../Shared/valueObjects/MonsterType";
import { PositiveNumber } from "../../Shared/valueObjects/PositiveNumber";
import { Skills } from "../../Shared/valueObjects/Skills";
import { SpeedBlock } from "../../Shared/valueObjects/SpeedBlock";
import { TextField } from "../../Shared/valueObjects/TextField";
import { StatBlock } from "./StatBlock";

export interface MonsterObjectData {
  id: Id;
  desc: TextField;
  size: MonsterSize;
  type: MonsterType;
  ac: PositiveNumber;
  acDesc: TextField;
  hitPoints: PositiveNumber;
  hitDice: TextField;
  speed: SpeedBlock;
  statBlock: StatBlock;
  skills: Skills;
  dmgVuln: TextField;
  dmgResist: TextField;
  dmgImm: TextField;
  conditionImm: TextField;
  senses: TextField;
  languages: TextField;
  cr: TextField;
  actions: Ability[];
  bonusActions: Ability[];
  reactions: Ability[];
  legendaryDesc: TextField;
  legendaryActions: Ability[];
  specialAbilities: Ability[];
}

export interface MonsterData {
  id: string;
  desc: string;
  size: string;
  type: string;
  ac: number;
  acDesc: string;
  hitPoints: number;
  hitDice: string;
  walk: number;
  burrow: number;
  climb: number;
  swim: number;
  fly: number;
  hover: boolean;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  strSave: number;
  dexSave: number;
  conSave: number;
  intSave: number;
  wisSave: number;
  chaSave: number;
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
  dmgVuln: string;
  dmgResist: string;
  dmgImm: string;
  conditionImm: string;
  senses: string;
  languages: string;
  cr: string;
  actions: {name: string, desc: string}[];
  bonusActions: {name: string, desc: string}[];
  reactions: {name: string, desc: string}[];
  legendaryDesc: string;
  legendaryActions: {name: string, desc: string}[];
  specialAbilities: {name: string, desc: string}[];
}

export class Monster extends Entity {
  public desc: TextField;
  public size: MonsterSize;
  public type: MonsterType;
  public ac: PositiveNumber;
  public acDesc: TextField;
  public hitPoints: PositiveNumber;
  public hitDice: TextField;
  public speed: SpeedBlock;
  public statBlock: StatBlock;
  public skills: Skills;
  public dmgVuln: TextField;
  public dmgResist: TextField;
  public dmgImm: TextField;
  public conditionImm: TextField;
  public senses: TextField;
  public languages: TextField;
  public cr: TextField;
  public actions: Ability[];
  public bonusActions: Ability[];
  public reactions: Ability[];
  public legendaryDesc: TextField;
  public legendaryActions: Ability[];
  public specialAbilities: Ability[];

  private constructor(data: MonsterObjectData) {
    super(data.id);
    this.desc = data.desc;
    this.size = data.size;
    this.type = data.type;
    this.ac = data.ac;
    this.acDesc = data.acDesc;
    this.hitPoints = data.hitPoints;
    this.hitDice = data.hitDice;
    this.speed = data.speed;
    this.statBlock = data.statBlock;
    this.skills = data.skills;
    this.dmgVuln = data.dmgVuln;
    this.dmgResist = data.dmgResist;
    this.dmgImm = data.dmgImm;
    this.conditionImm = data.conditionImm;
    this.senses = data.senses;
    this.languages = data.languages;
    this.cr = data.cr;
    this.actions = data.actions;
    this.bonusActions = data.bonusActions;
    this.reactions = data.reactions;
    this.legendaryDesc = data.legendaryDesc;
    this.legendaryActions = data.legendaryActions;
    this.specialAbilities = data.specialAbilities
  }

  public static create(data: MonsterData): Monster {
    const id = Id.create(data.id);
    const desc = TextField.create(data.desc);
    const size = MonsterSize.create(data.size);
    const type = MonsterType.create(data.type);
    const ac = PositiveNumber.create(data.ac);
    const acDesc = TextField.create(data.acDesc);
    const hitPoints = PositiveNumber.create(data.hitPoints);
    const hitDice = TextField.create(data.hitDice);
    const speed = SpeedBlock.create(
      data.walk,
      data.burrow,
      data.climb,
      data.swim,
      data.fly,
      data.hover
    );
    const statBlock = StatBlock.create({
      str: data.str,
      dex: data.dex,
      con: data.con,
      int: data.int,
      wis: data.wis,
      cha: data.cha,
      strSave: data.strSave,
      dexSave: data.dexSave,
      conSave: data.conSave,
      intSave: data.intSave,
      wisSave: data.wisSave,
      chaSave: data.chaSave
    });
    const skills = Skills.create({
      acrobatics: data.acrobatics,
      animalHandling: data.animalHandling,
      arcana: data.arcana,
      athletics: data.athletics,
      deception: data.deception,
      history: data.history,
      insight: data.insight,
      intimidation: data.intimidation,
      investigation: data.investigation,
      medicine: data.medicine,
      nature: data.nature,
      perception: data.perception,
      performance: data.performance,
      persuasion: data.persuasion,
      religion: data.religion,
      sleightOfHand: data.sleightOfHand,
      stealth: data.stealth,
      survival: data.survival,
    });
    const dmgVuln = TextField.create(data.dmgVuln);
    const dmgResist = TextField.create(data.dmgResist);
    const dmgImm = TextField.create(data.dmgImm);
    const conditionImm = TextField.create(data.conditionImm);
    const senses = TextField.create(data.senses);
    const languages = TextField.create(data.languages);
    const cr = TextField.create(data.cr);
    const actions = data.actions.map((ability) => (Ability.create(ability.name, ability.desc)));
    const bonusActions = data.bonusActions.map((ability) => (Ability.create(ability.name, ability.desc)));
    const reactions = data.reactions.map((ability) => (Ability.create(ability.name, ability.desc)));
    const legendaryDesc = TextField.create(data.legendaryDesc);
    const legendaryActions = data.legendaryActions.map((ability) => (Ability.create(ability.name, ability.desc)));
    const specialAbilities = data.specialAbilities.map((ability) => (Ability.create(ability.name, ability.desc)));

    return new Monster({
      id,
      desc,
      size,
      type,
      ac,
      acDesc,
      hitPoints,
      hitDice,
      speed,
      statBlock,
      skills,
      dmgVuln,
      dmgResist,
      dmgImm,
      conditionImm,
      senses,
      languages,
      cr,
      actions,
      bonusActions,
      reactions,
      legendaryDesc,
      legendaryActions,
      specialAbilities
    });
  }

  public update(data: MonsterData) {
     this.desc = TextField.create(data.desc);
     this.size = MonsterSize.create(data.size);
     this.type = MonsterType.create(data.type);
     this.ac = PositiveNumber.create(data.ac);
     this.acDesc = TextField.create(data.acDesc);
     this.hitPoints = PositiveNumber.create(data.hitPoints);
     this.hitDice = TextField.create(data.hitDice);
     this.speed = SpeedBlock.create(
      data.walk,
      data.burrow,
      data.climb,
      data.swim,
      data.fly,
      data.hover
    );
     this.statBlock = StatBlock.create({
      str: data.str,
      dex: data.dex,
      con: data.con,
      int: data.int,
      wis: data.wis,
      cha: data.cha,
      strSave: data.strSave,
      dexSave: data.dexSave,
      conSave: data.conSave,
      intSave: data.intSave,
      wisSave: data.wisSave,
      chaSave: data.chaSave
    });
     this.skills = Skills.create({
      acrobatics: data.acrobatics,
      animalHandling: data.animalHandling,
      arcana: data.arcana,
      athletics: data.athletics,
      deception: data.deception,
      history: data.history,
      insight: data.insight,
      intimidation: data.intimidation,
      investigation: data.investigation,
      medicine: data.medicine,
      nature: data.nature,
      perception: data.perception,
      performance: data.performance,
      persuasion: data.persuasion,
      religion: data.religion,
      sleightOfHand: data.sleightOfHand,
      stealth: data.stealth,
      survival: data.survival,
    });
     this.dmgVuln = TextField.create(data.dmgVuln);
     this.dmgResist = TextField.create(data.dmgResist);
     this.dmgImm = TextField.create(data.dmgImm);
     this.conditionImm = TextField.create(data.conditionImm);
     this.senses = TextField.create(data.senses);
     this.languages = TextField.create(data.languages);
     this.cr = TextField.create(data.cr);
     this.actions = data.actions.map((ability) => (Ability.create(ability.name, ability.desc)));
     this.bonusActions = data.bonusActions.map((ability) => (Ability.create(ability.name, ability.desc)));
     this.reactions = data.reactions.map((ability) => (Ability.create(ability.name, ability.desc)));
     this.legendaryDesc = TextField.create(data.legendaryDesc);
     this.legendaryActions = data.legendaryActions.map((ability) => (Ability.create(ability.name, ability.desc)));
     this.specialAbilities = data.specialAbilities.map((ability) => (Ability.create(ability.name, ability.desc)));
  }

}
