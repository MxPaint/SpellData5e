import { Entity } from "../../Shared/entities/Entity";
import { Id } from "../../Shared/valueObjects/Id";
import { MonsterSize } from "../../Shared/valueObjects/MonsterSize";
import { MonsterType } from "../../Shared/valueObjects/MonsterType";
import { PositiveNumber } from "../../Shared/valueObjects/PositiveNumber";
import { SpeedBlock } from "../../Shared/valueObjects/SpeedBlock";
import { TextField } from "../../Shared/valueObjects/TextField";
import { StatBlock } from "./StatBlock";

export interface MonsterObjectData {
  id: Id;
  size: MonsterSize;
  type: MonsterType;
  ac: PositiveNumber;
  hitPoints: PositiveNumber;
  hitDice: TextField;
  speed: SpeedBlock;
  statBlock: StatBlock;
  cr: TextField;
}

export interface MonsterData {
  id: string;
  size: string;
  type: string;
  ac: number;
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
  cr: string;
}

export class Monster extends Entity {
  public size: MonsterSize;
  public type: MonsterType;
  public ac: PositiveNumber;
  public hitPoints: PositiveNumber;
  public hitDice: TextField;
  public speed: SpeedBlock;
  public statBlock: StatBlock;
  public cr: TextField;

  private constructor(data: MonsterObjectData) {
    super(data.id);
    this.size = data.size;
    this.type = data.type;
    this.ac = data.ac;
    this.hitPoints = data.hitPoints;
    this.hitDice = data.hitDice;
    this.speed = data.speed;
    this.statBlock = data.statBlock;
    this.cr = data.cr;
  }

  public static create(data: MonsterData): Monster {
    const id = Id.create(data.id);
    const size = MonsterSize.create(data.size);
    const type = MonsterType.create(data.type);
    const ac = PositiveNumber.create(data.ac);
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
      cha: data.cha
    });
    const cr = TextField.create(data.cr);

    return new Monster({
      id,
      size,
      type,
      ac,
      hitPoints,
      hitDice,
      speed,
      statBlock,
      cr
    });
  }

  public update(data: MonsterData) {
    this.size = MonsterSize.create(data.size);
    this.type = MonsterType.create(data.type);
    this.ac = PositiveNumber.create(data.ac);
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
      cha: data.cha
    });
    this.cr = TextField.create(data.cr);
  }

}
