import { Entity } from "../../Shared/entities/Entity";
import { Id } from "../../Shared/valueObjects/Id";
import { Stat } from "../../Shared/valueObjects/Stat";

export interface StatBlockObjectData {
  id: Id;
  str: Stat;
  dex: Stat;
  con: Stat;
  int: Stat;
  wis: Stat;
  cha: Stat; 
}

export interface StatBlockData {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number; 
}

export class StatBlock extends Entity {
  public str: Stat;
  public dex: Stat;
  public con: Stat;
  public int: Stat;
  public wis: Stat;
  public cha: Stat; 

  private constructor(data: StatBlockObjectData) {
    super(data.id);
    this.str = data.str;
    this.dex = data.dex;
    this.con = data.con;
    this.int = data.int;
    this.wis = data.wis;
    this.cha = data.cha;
  }

  public static create(data: StatBlockData): StatBlock {
    const id = Id.generate();
    const str = Stat.create(data.str);
    const dex = Stat.create(data.dex);
    const con = Stat.create(data.con);
    const int = Stat.create(data.int);
    const wis = Stat.create(data.wis);
    const cha = Stat.create(data.cha);

    return new StatBlock({id, str, dex, con, int, wis, cha});
  }

  public update(data: StatBlockData) {
    this.str = Stat.create(data.str);
    this.dex = Stat.create(data.dex);
    this.con = Stat.create(data.con);
    this.int = Stat.create(data.int);
    this.wis = Stat.create(data.wis);
    this.cha = Stat.create(data.cha);
  }

}
