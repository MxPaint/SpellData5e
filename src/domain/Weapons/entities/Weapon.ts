import { Entity } from "../../Shared/entities/Entity";
import { Damage } from "../../Shared/valueObjects/Damage";
import { Id } from "../../Shared/valueObjects/Id";
import { TextField } from "../../Shared/valueObjects/TextField";

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
