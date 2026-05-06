import { CharacterClass } from "../valueObjects/CharacterClass";
import { Id } from "../valueObjects/Id";
import { Level } from "../valueObjects/Level";
import { School } from "../valueObjects/School";
import { Entity } from "./Entity";

export interface SpellObjectData {
  id: Id;
  level: Level;
  school: School;
  classList: CharacterClass[];
}

export interface SpellData {
  id?: string;
  level: number;
  school: string;
  classList: string[];
}

export class Spell extends Entity {
  public level: Level;
  public school: School;
  public classList: CharacterClass[];

  private constructor(data: SpellObjectData) {
    super(data.id);
    this.level = data.level;
    this.school = data.school;
    this.classList = data.classList;
  }

  public static create(data: SpellData): Spell {
    const id = data.id ? Id.create(data.id) : Id.generate();
    const level = Level.create(data.level);
    const school = School.create(data.school);
    const classList = data.classList.map((element) => CharacterClass.create(element));

    return new Spell({id, level, school, classList});
  }

  public update(data: SpellData) {
    this.level = Level.create(data.level);
    this.school = School.create(data.school);
    this.classList = data.classList.map((element) => CharacterClass.create(element));
  }

}
