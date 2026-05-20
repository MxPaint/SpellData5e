import type { Id } from "../valueObjects/Id";

export interface EntityData {
  id: Id;
}

const isEntity = (v: any): v is Entity => v instanceof Entity;

export abstract class Entity implements EntityData {

  public id: Id;

  constructor(id: Id) {
    this.id = id;
  }

  public equals(object?: Entity): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.id.equals(object.id);
  }
}