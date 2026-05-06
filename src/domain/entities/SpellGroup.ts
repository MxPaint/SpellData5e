import { Id } from "../valueObjects/Id";
import { Level } from "../valueObjects/Level";
import { Count } from "../valueObjects/Count";
import { School } from "../valueObjects/School";
import { Entity } from "./Entity";

export interface SpellGroupObjectData {
  id: Id;
  level: Level;
  school: School;
  count: Count;
}

export interface SpellGroupData {
  level: number;
  school: string;
  count: number;
}

export class SpellGroup extends Entity {
  public level: Level;
  public school: School;
  public count: Count;

  private constructor(data: SpellGroupObjectData) {
    super(data.id);
    this.level = data.level;
    this.school = data.school;
    this.count = data.count;
  }

  public static create(data: SpellGroupData): SpellGroup {
    const id = Id.create(data.school+'-'+data.level);
    const level = Level.create(data.level);
    const school = School.create(data.school);
    const count = Count.create(data.count);

    return new SpellGroup({id, level, school, count: count});
  }

  public update(data: SpellGroupData) {
    this.level = Level.create(data.level);
    this.school = School.create(data.school);
    this.count = Count.create(data.count);
  }
}
