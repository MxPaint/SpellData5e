import type { MagicItem } from "./entities/MagicItem";

export interface MagicItemRepository {
  getRawMagicItemList(): Promise<void>;
  getMagicItemList(): MagicItem[];
}