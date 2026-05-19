import { Damage } from "../valueObjects/Damage";
import { Id } from "../valueObjects/Id";
import { TextField } from "../valueObjects/TextField";
import { Entity } from "./Entity";

export interface WeaponObjectData {
  id: Id;
  category: TextField;
  damageDice: TextField;
  damageType: Damage;
  properties: TextField[];
}

export interface WeaponData {
  id: string;
  category: string;
  damageDice: string;
  damageType: string;
  properties: string[];
}

export class Weapon extends Entity {
  public category: TextField;
  public damageDice: TextField;
  public damageType: Damage;
  public properties: TextField[];

  private constructor(data: WeaponObjectData) {
    super(data.id);
    this.category = data.category;
    this.damageDice = data.damageDice;
    this.damageType = data.damageType;
    this.properties = data.properties;
  }

  public static create(data: WeaponData): Weapon {
    const id = Id.create(data.id);
    const category = TextField.create(data.category);
    const damageDice = TextField.create(data.damageDice);
    const damageType = Damage.create(data.damageType);
    const properties = !data.properties ? [] : data.properties.map((element) => TextField.create(element));

    return new Weapon({id, category, damageDice, damageType, properties});
  }

  public update(data: WeaponData) {
    this.category = TextField.create(data.category);
    this.damageDice = TextField.create(data.damageDice);
    this.damageType = Damage.create(data.damageType);
    this.properties = data.properties.map((element) => TextField.create(element));

  }
}
