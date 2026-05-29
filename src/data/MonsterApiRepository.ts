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
  desc: string;
  size: string;
  type: string;
  armor_class: number;
  armor_desc: string
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
  strength_save: number | null,
  dexterity_save: number | null,
  constitution_save: number | null,
  intelligence_save: number | null,
  wisdom_save: number | null,
  charisma_save: number | null,
  perception: number,
  skills: {
    acrobatics?: number;
    animalHandling?: number;
    arcana?: number;
    athletics?: number;
    deception?: number;
    history?: number;
    insight?: number;
    intimidation?: number;
    investigation?: number;
    medicine?: number;
    nature?: number;
    perception?: number;
    performance?: number;
    persuasion?: number;
    religion?: number;
    sleightOfHand?: number;
    stealth?: number;
    survival?: number;
  };
  damage_vulnerabilities: string;
  damage_resistances: string;
  damage_immunities: string;
  condition_immunities: string;
  senses: string;
  languages: string;
  challenge_rating: string
  actions: {
    name: string,
    desc: string
  } [],
  bonus_actions: {
    name: string,
    desc: string
  } [],
  reactions: {
    name: string,
    desc: string
  } [],
  legendary_desc: string;
  legendary_actions: {
    name: string,
    desc: string
  } [],
  special_abilities: {
    name: string,
    desc: string
  } []
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
    let nextUrl: string | null = 'https://api.open5e.com/v1/monsters/?document__slug=wotc-srd&fields=name,desc,size,type,armor_class,armor_desc,hit_points,hit_dice,speed,strength,dexterity,constitution,intelligence,wisdom,charisma,strength_save,dexterity_save,constitution_save,intelligence_save,wisdom_save,charisma_save,skills,damage_vulnerabilities,damage_resistances,damage_immunities,condition_immunities,senses,languages,challenge_rating,actions,bonus_actions,reactions,legendary_desc,legendary_actions,special_abilities';

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
      desc: element.desc ? element.desc : 'no',
      size: element.size,
      type: element.type,
      ac: element.armor_class,
      acDesc: element.armor_desc ? element.armor_desc : 'no',
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
      strSave: element.strength_save ? element.strength_save : 0,
      dexSave: element.dexterity_save ? element.dexterity_save : 0,
      conSave: element.constitution_save ? element.constitution_save : 0,
      intSave: element.intelligence_save ? element.intelligence_save : 0,
      wisSave: element.wisdom_save ? element.wisdom_save : 0,
      chaSave: element.charisma_save ? element.charisma_save : 0,
      acrobatics: element.skills.acrobatics ? element.skills.acrobatics : 0,
      animalHandling: element.skills.animalHandling ? element.skills.animalHandling : 0,
      arcana: element.skills.arcana ? element.skills.arcana : 0,
      athletics: element.skills.athletics ? element.skills.athletics : 0,
      deception: element.skills.deception ? element.skills.deception : 0,
      history: element.skills.history ? element.skills.history : 0,
      insight: element.skills.insight ? element.skills.insight : 0,
      intimidation: element.skills.intimidation ? element.skills.intimidation : 0,
      investigation: element.skills.investigation ? element.skills.investigation : 0,
      medicine: element.skills.medicine ? element.skills.medicine : 0,
      nature: element.skills.nature ? element.skills.nature : 0,
      perception: element.skills.perception ? element.skills.perception : 0,
      performance: element.skills.performance ? element.skills.performance : 0,
      persuasion: element.skills.persuasion ? element.skills.persuasion : 0,
      religion: element.skills.religion ? element.skills.religion : 0,
      sleightOfHand: element.skills.sleightOfHand ? element.skills.sleightOfHand : 0,
      stealth: element.skills.stealth ? element.skills.stealth : 0,
      survival: element.skills.survival ? element.skills.survival : 0,
      dmgVuln: element.damage_vulnerabilities ? element.damage_vulnerabilities : 'no',
      dmgResist: element.damage_resistances ? element.damage_resistances : 'no',
      dmgImm: element.damage_immunities ? element.damage_immunities : 'no',
      conditionImm: element.condition_immunities ? element.condition_immunities : 'no',
      senses: element.senses ? element.senses : 'no',
      languages: element.languages ? element.languages : 'no',
      cr: element.challenge_rating,
      actions: element.actions ? element.actions : [],
      bonusActions: element.bonus_actions ? element.bonus_actions : [],
      reactions: element.reactions ? element.reactions : [],
      legendaryActions: element.legendary_actions ? element.legendary_actions : [],
      legendaryDesc: element.legendary_desc ? element.legendary_desc : "no",
      specialAbilities: element.special_abilities ? element.special_abilities : [],
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
