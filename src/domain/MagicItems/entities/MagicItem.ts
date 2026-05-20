import { Entity } from "../../Shared/entities/Entity";
import { Attunement } from "../../Shared/valueObjects/Attunement";
import { Id } from "../../Shared/valueObjects/Id";
import { ObjectType } from "../../Shared/valueObjects/ObjectType";
import { Rarity } from "../../Shared/valueObjects/Rarity";
import { TextField } from "../../Shared/valueObjects/TextField";

export interface MagicItemObjectData {
  id: Id;
  type: ObjectType;
  attunement: Attunement;
  rarity: Rarity;
  description: TextField;
}

export interface MagicItemData {
  id: string;
  type: string;
  attunement: string;
  rarity: string;
  description: string;
}

export class MagicItem extends Entity {
  public type: ObjectType;
  public attunement: Attunement;
  public rarity: Rarity;
  public description: TextField;

  private constructor(data: MagicItemObjectData) {
    super(data.id);
    this.type = data.type;
    this.attunement = data.attunement;
    this.rarity = data.rarity;
    this.description = data.description;
  }

  public static create(data: MagicItemData): MagicItem {
    const id = Id.create(data.id);
    const type = ObjectType.create(data.type);
    const attunement = Attunement.create(data.attunement);
    const rarity = Rarity.create(data.rarity);
    const description = TextField.create(data.description);

    return new MagicItem({id, type, attunement, rarity, description});
  }

  public update(data: MagicItemData) {
    this.type = ObjectType.create(data.type);
    this.attunement = Attunement.create(data.attunement);
    this.rarity = Rarity.create(data.rarity);
    this.description = TextField.create(data.description);
  }

}
