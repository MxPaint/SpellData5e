import type { Spell } from "./entities/Spell";
import type { SpellGroup } from "./entities/SpellGroup";
import type { Level } from "./valueObjects/Level";
import type { School } from "./valueObjects/School";

export interface SpellRepository {
  getRawSpellList(): Promise<void>;
  getSpellList(): Spell[];
  getSpellGroups(): SpellGroup[];
  getGroupOrderLevel(level: Level): School[];
  getGroupOrderTotal(): School[];
}