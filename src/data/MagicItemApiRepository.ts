import { MagicItem } from "../domain/MagicItems/entities/MagicItem";
import type { MagicItemRepository } from "../domain/MagicItems/MagicItemRepository";

interface Open5eResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface MagicItemRaw {
  name: string;
  type: string;
  rarity: string;
  requires_attunement: string;
  desc: string;
}

export class MagicItemApiRepository implements MagicItemRepository{
  static #instance: MagicItemApiRepository;
    
  private magicItemList: MagicItem[] = [];

  private constructor() {
  }
  
  static get instance(): MagicItemApiRepository {
    if(!MagicItemApiRepository.#instance) {
      MagicItemApiRepository.#instance = new MagicItemApiRepository();
    }

    return MagicItemApiRepository.#instance;
  }
  
  getMagicItemList(): MagicItem[] {
    return this.magicItemList;
  }

  async getRawMagicItemList(): Promise<void> {

    let allRawMagicItems: MagicItemRaw[] = [];
    let nextUrl: string | null = 'https://api.open5e.com/v1/magicitems/?document__slug=wotc-srd&fields=name,type,rarity,requires_attunement,desc';

    while (nextUrl) {
      const data: Open5eResponse<MagicItemRaw> = await this.open5eFetch<Open5eResponse<MagicItemRaw>>(nextUrl);
      allRawMagicItems = [...allRawMagicItems, ...data.results];
      nextUrl = data.next;
    }

    const rawSpellList = await Promise.all(allRawMagicItems);
    this.magicItemList = this.mapMagicItems(rawSpellList);
    
  }

  mapMagicItems = (rawList: MagicItemRaw[]) => {
      const list = rawList.map((element) => MagicItem.create({
        id: element.name,
        type: element.type,
        rarity: element.rarity,
        attunement: element.requires_attunement,
        description: element.desc
      }))
    
      return list;
    }

  async open5eFetch<T>(apiUrl: string): Promise<T> {
    const url = new URL(apiUrl);
  
    const response = await fetch(url.toString());
  
    if (!response.ok) {
      throw new Error(`Open5e API Error: ${response.status} ${response.statusText}`);
    }
  
    return response.json() as Promise<T>;
  }

}
