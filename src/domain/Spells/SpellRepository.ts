import type { Spell } from "../Spells/entities/Spell";
import type { SpellGroup } from "../Spells/entities/SpellGroup";
import type { Level } from "../Shared/valueObjects/Level";
import type { School } from "../Shared/valueObjects/School";

export interface SpellRepository {
  getRawSpellList(): Promise<void>;
  getSpellList(): Spell[];
  getSpellGroups(): SpellGroup[];
  getGroupOrderLevel(level: Level): School[];
  getGroupOrderTotal(): School[];
}