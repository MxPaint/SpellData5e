import { Spell } from '../domain/Spells/entities/Spell';
import { SpellGroup } from '../domain/Spells/entities/SpellGroup';
import type { Level } from '../domain/Shared/valueObjects/Level';
import { School } from '../domain/Shared/valueObjects/School';
import type { SpellRepository } from '../domain/Spells/SpellRepository';

interface Open5eResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
interface SpellRaw {
  name: string;
  level_int: number;
  school: string;
  spell_lists: string[];
}

/*
`https://api.open5e.com/v1/spells/?level_int=${level.value}&school=${school}&document__slug=wotc-srd` group order level
`https://api.open5e.com/v1/spells/?school=${school}&document__slug=wotc-srd` group order total
`https://api.open5e.com/v1/spells/?level_int=${level}&school=${school}&document__slug=wotc-srd` spell groups
`https://api.open5e.com/v1/spells/?document__slug=wotc-srd&fields=name,level_int,school,spell_lists` spell list
*/

const levelList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const schoolList = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];

export class SpellApiRepository implements SpellRepository{
  static #instance: SpellApiRepository;

  private spellList: Spell[] = [];

  private constructor() {
  }

  static get instance(): SpellApiRepository {
    if(!SpellApiRepository.#instance) {
      SpellApiRepository.#instance = new SpellApiRepository();
    }

    return SpellApiRepository.#instance;
  }

  private getSortedSchoolsByFilter(filter: (spell: Spell) => boolean): School[] {
    const counts = new Map<string, number>();
    schoolList.forEach(s => counts.set(s, 0));

    this.spellList.forEach(spell => {
      if (filter(spell)) {
        counts.set(spell.school.value, (counts.get(spell.school.value) || 0) + 1);
      }
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => School.create(name));
  }

  getGroupOrderLevel(level: Level): School[] {
    return this.getSortedSchoolsByFilter(s => s.level.value === level.value);
  }

  getGroupOrderTotal(): School[] {
    return this.getSortedSchoolsByFilter(() => true); 
  }

  getSpellGroups(): SpellGroup[] { 

    const groupList: SpellGroup[] = [];

    levelList.forEach((level) => {
      schoolList.forEach((school) => {

        let count = 0;
        this.spellList.forEach((spell) => {
          if(spell.school.value === school && spell.level.value === level){
            count++;
          }
        })

        const spellGroup = SpellGroup.create({level, school, count});
        groupList.push(spellGroup);

      })
    })

    return groupList;

  }

  getSpellList(): Spell[] {
    return this.spellList;
  }

  async getRawSpellList() {
    
    let allRawSpells: SpellRaw[] = [];
    let nextUrl: string | null = 'https://api.open5e.com/v1/spells/?document__slug=wotc-srd&fields=name,level_int,school,spell_lists';

    while (nextUrl) {
      const data: Open5eResponse<SpellRaw> = await this.open5eFetch<Open5eResponse<SpellRaw>>(nextUrl);
      allRawSpells = [...allRawSpells, ...data.results];
      nextUrl = data.next;
    }

    const rawSpellList = await Promise.all(allRawSpells);
    this.spellList = this.mapSpells(rawSpellList);
    
  }
  
  mapSpells = (rawList: SpellRaw[]) => {
    const list = rawList.map((element) => Spell.create({
      id: element.name,
      level: element.level_int,
      school: element.school,
      classList: element.spell_lists
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
