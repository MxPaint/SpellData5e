import { Entity } from "../../Shared/entities/Entity";
import { CharacterClass } from "../../Shared/valueObjects/CharacterClass";
import { Id } from "../../Shared/valueObjects/Id";
import { Level } from "../../Shared/valueObjects/Level";
import { PlainBool } from "../../Shared/valueObjects/PlainBool";
import { School } from "../../Shared/valueObjects/School";
import { SpellComponents } from "../../Shared/valueObjects/SpellComponents";
import { TextField } from "../../Shared/valueObjects/TextField";

export interface SpellObjectData {
  id: Id;
  level: Level;
  school: School;
  classList: CharacterClass[];
  description: TextField;
  highLevel: TextField;
  range: TextField;
  components: SpellComponents;
  materialComponents: TextField;
  ritual: PlainBool;
  duration: TextField;
  concentration: PlainBool;
  castingTime: TextField;
}

export interface SpellData {
  id?: string;
  level: number;
  school: string;
  classList: string[];
  description: string;
  highLevel: string;
  range: string;
  vComponents: boolean;
  sComponents: boolean;
  mComponents: boolean;
  materialComponents: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  castingTime: string;
}

export class Spell extends Entity {
  public level: Level;
  public school: School;
  public classList: CharacterClass[];
  public description: TextField;
  public highLevel: TextField;
  public range: TextField;
  public components: SpellComponents;
  public materialComponents: TextField;
  public ritual: PlainBool;
  public duration: TextField;
  public concentration: PlainBool;
  public castingTime: TextField;

  private constructor(data: SpellObjectData) {
    super(data.id);
    this.level = data.level;
    this.school = data.school;
    this.classList = data.classList;
    this.description = data.description;
    this.highLevel = data.highLevel;
    this.range = data.range;
    this.components = data.components;
    this.materialComponents = data.materialComponents;
    this.ritual = data.ritual;
    this.duration = data.duration;
    this.concentration = data.concentration;
    this.castingTime = data.castingTime;
  }

  public static create(data: SpellData): Spell {
    const id = data.id ? Id.create(data.id) : Id.generate();
    const level = Level.create(data.level);
    const school = School.create(data.school);
    const classList = data.classList.map((element) => CharacterClass.create(element));
    const description = TextField.create(data.description);
    const highLevel = TextField.create(data.highLevel);
    const range = TextField.create(data.range);
    const components = SpellComponents.create(data.vComponents, data.sComponents, data.mComponents);
    const materialComponents = TextField.create(data.materialComponents);
    const ritual = PlainBool.create(data.ritual);
    const duration = TextField.create(data.duration);
    const concentration = PlainBool.create(data.concentration);
    const castingTime = TextField.create(data.castingTime);

    return new Spell({id, level, school, classList, description, highLevel, range, components, materialComponents, ritual, duration, concentration, castingTime});
  }

  public update(data: SpellData) {
    this.level = Level.create(data.level);
    this.school = School.create(data.school);
    this.classList = data.classList.map((element) => CharacterClass.create(element));
    this.description = TextField.create(data.description);
    this.highLevel = TextField.create(data.highLevel);
    this.range = TextField.create(data.range);
    this.components = SpellComponents.create(data.vComponents, data.sComponents, data.mComponents);
    this.materialComponents = TextField.create(data.materialComponents);
    this.ritual = PlainBool.create(data.ritual);
    this.duration = TextField.create(data.duration);
    this.concentration = PlainBool.create(data.concentration);
    this.castingTime = TextField.create(data.castingTime);
  }

}
