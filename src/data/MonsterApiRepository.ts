import { Monster } from "../domain/Monsters/entities/Monster";
import type { MonsterRepository } from "../domain/Monsters/MonsterRepository";

interface Open5eResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface MonsterRaw {
  name: string;
  size: string;
  type: string;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  speed: {
    walk: number,
    burrow?: number,
    climb?: number,
    swim?: number,
    fly?: number,
    hover?: boolean
  };
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number,
  challenge_rating: string
}

export class MonsterApiRepository implements MonsterRepository{

  static #instance: MonsterApiRepository;
      
  private monsterList: Monster[] = [];

  private constructor() {
  }
  
  static get instance(): MonsterApiRepository {
    if(!MonsterApiRepository.#instance) {
      MonsterApiRepository.#instance = new MonsterApiRepository();
    }

    return MonsterApiRepository.#instance;
  }

  getMonsterList(): Monster[] {
    return this.monsterList;
  }

  async getRawMonsterList(): Promise<void> {

    let allRawMonsters: MonsterRaw[] = [];
    let nextUrl: string | null = 'https://api.open5e.com/v1/monsters/?document__slug=wotc-srd&fields=name,size,type,armor_class,hit_points,hit_dice,speed,strength,dexterity,constitution,intelligence,wisdom,charisma,challenge_rating';

    while (nextUrl) {
      const data: Open5eResponse<MonsterRaw> = await this.open5eFetch<Open5eResponse<MonsterRaw>>(nextUrl);
      allRawMonsters = [...allRawMonsters, ...data.results];
      nextUrl = data.next;
    }

    const rawSpellList = await Promise.all(allRawMonsters);
    this.monsterList = this.mapMonsters(rawSpellList);
    
  }
  
  mapMonsters = (rawList: MonsterRaw[]) => {
    const list = rawList.map((element) => Monster.create({
      id: element.name,
      size: element.size,
      type: element.type,
      ac: element.armor_class,
      hitPoints: element.hit_points,
      hitDice: element.hit_dice,
      walk: element.speed.walk,
      burrow: element.speed.burrow ? element.speed.burrow : 0,
      climb: element.speed.climb ? element.speed.climb : 0,
      swim: element.speed.swim ? element.speed.swim : 0,
      fly: element.speed.fly ? element.speed.fly : 0,
      hover: element.speed.hover ? element.speed.hover : false,
      str: element.strength,
      dex: element.dexterity,
      con: element.constitution,
      int: element.intelligence,
      wis: element.wisdom,
      cha: element.charisma,
      cr: element.challenge_rating
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
