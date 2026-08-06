import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SpellApiRepository } from '../../data/SpellApiRepository';

describe('SpellApiRepository', () => {

  const repo = SpellApiRepository.instance;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should fetch and map spells until no nextUrl is provided', async () => {

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ name: 'Fireball', level_int: 3, school: 'Evocation', spell_lists: ['wizard'] }],
          next: 'https://api.page2.com'
        })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ name: 'Shield', level_int: 1, school: 'Abjuration', spell_lists: ['wizard', 'sorcerer'] }],
          next: null
        })
      } as Response);

    await repo.getRawSpellList();

    expect(repo.getSpellList()).toHaveLength(2);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should sort schools by spell count in getGroupOrderTotal', () => {

    const mockSpells = [
      { name: 'Burning Hands', level_int: 1, school: 'Evocation', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
      { name: 'Shatter', level_int: 2, school: 'Evocation', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
      { name: 'Fireball', level_int: 3, school: 'Evocation', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
      { name: 'Shield', level_int: 1, school: 'Abjuration', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
      { name: 'False Life', level_int: 1, school: 'Necromancy', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
      { name: 'Wither and Bloom', level_int: 2, school: 'Necromancy', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
    ];

    (repo as any).spellList = repo.mapSpells(mockSpells);

    const order = repo.getGroupOrderTotal();

    expect(order[0].value).toBe('Evocation');
    expect(order[1].value).toBe('Necromancy');
    expect(order[2].value).toBe('Abjuration');

    const schoolsWithZero = order.slice(3, 8);
    schoolsWithZero.forEach(s => {
      expect(['Abjuration', 'Necromancy', 'Evocation']).not.toContain(s.value);
    });
  });

  it('should only count spells for the specific level provided in getGroupOrderLevel', () => {
    const mockSpells = [
      { name: 'Burning Hands', level_int: 1, school: 'Evocation', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
      { name: 'Thunderwave', level_int: 1, school: 'Evocation', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
      { name: 'Fireball', level_int: 3, school: 'Evocation', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
      { name: 'Shield', level_int: 1, school: 'Abjuration', spell_lists: [], desc: '', higher_level: '', range: '', requires_verbal_components: true, requires_somatic_components: true, requires_material_components: false, material: '', can_be_cast_as_ritual: false, duration: '', requires_concentration: false, casting_time: '' },
    ];

    (repo as any).spellList = repo.mapSpells(mockSpells);

    const level1Order = repo.getGroupOrderLevel({ value: 1 } as any);

    const evocationIndex = level1Order.findIndex(s => s.value === 'Evocation');
    const abjurationIndex = level1Order.findIndex(s => s.value === 'Abjuration');

    expect(abjurationIndex).toBeGreaterThan(evocationIndex);
  });

  it('should throw error if fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    } as Response);

    await expect(repo.getRawSpellList()).rejects.toThrow('Open5e API Error: 404 Not Found');
  });

});