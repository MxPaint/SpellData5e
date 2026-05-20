import { Weapon } from "../domain/Weapons/entities/Weapon";
import type { WeaponRepository } from "../domain/Weapons/WeaponRepository";

interface Open5eResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
interface WeaponRaw {
  name: string;
  category: string;
  damage_dice: string;
  damage_type: string;
  properties: string[];
}

export class WeaponApiRepository implements WeaponRepository{
  static #instance: WeaponApiRepository;
  
  private weaponList: Weapon[] = [];

  private constructor() {
  }
  
  static get instance(): WeaponApiRepository {
    if(!WeaponApiRepository.#instance) {
      WeaponApiRepository.#instance = new WeaponApiRepository();
    }

    return WeaponApiRepository.#instance;
  }

  async getRawWeaponList(): Promise<void> {
    let allRawWeapons: WeaponRaw[] = [];
    let nextUrl: string | null = 'https://api.open5e.com/v1/weapons/?document__slug=wotc-srd&fields=name,category,damage_dice,damage_type,properties';

    while (nextUrl) {
      const data: Open5eResponse<WeaponRaw> = await this.open5eFetch<Open5eResponse<WeaponRaw>>(nextUrl);
      allRawWeapons = [...allRawWeapons, ...data.results];
      nextUrl = data.next;
    }

    const rawSpellList = await Promise.all(allRawWeapons);
    this.weaponList = this.mapWeapons(rawSpellList);
    
  }

  getWeaponList(): Weapon[] {
    return this.weaponList;
  }

  mapWeapons = (rawList: WeaponRaw[]) => {
      const list = !rawList ? [] : rawList.map((element) => Weapon.create({
        id: element.name,
        category: element.category,
        damageDice: element.damage_dice,
        damageType: element.damage_type,
        properties: element.properties
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
