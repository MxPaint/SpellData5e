import { describe, it, expect } from 'vitest';
import { Spell, type SpellData } from '../../../domain/Spells/entities/Spell';
import { CharacterClass } from '../../../domain/Shared/valueObjects/CharacterClass';
import { Id } from '../../../domain/Shared/valueObjects/Id';
import { Level } from '../../../domain/Shared/valueObjects/Level';
import { School } from '../../../domain/Shared/valueObjects/School';

describe('Tests of Entity Spell', () => {

  const validSpellData: SpellData = {
    id: 'Dancing Lights',
    level: 0,
    school: 'Evocation',
    classList: ['bard', 'warlock', 'wizard'],
    description: 'You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration.',
    highLevel: '',
    range: '120 feet',
    vComponents: true,
    sComponents: true,
    mComponents: true,
    materialComponents: 'A bit of phosphorus or wychwood, or a glowworm.',
    ritual: false,
    duration: 'Concentration, up to 1 minute',
    concentration: true,
    castingTime: '1 action'
  };


  it('Should create a Spell', () => {
    const spell = Spell.create(validSpellData);
    expect(spell).toBeInstanceOf(Spell);
  });

  it('Should correctly instantiate nested Value Objects', () => {
    const spell = Spell.create(validSpellData);

    expect(spell.id).toBeInstanceOf(Id);
    expect(spell.level).toBeInstanceOf(Level);
    expect(spell.school).toBeInstanceOf(School);
    expect(spell.classList[0]).toBeInstanceOf(CharacterClass);
  });

  it('Should update Spell properties with new data', () => {
    const spell = Spell.create(validSpellData);

    const updatedData: SpellData = {
      level: 0,
      school: 'Abjuration',
      classList: ['cleric'],
      description: 'Updated description',
      highLevel: 'Updated high level',
      range: '60 feet',
      vComponents: true,
      sComponents: true,
      mComponents: false,
      materialComponents: '',
      ritual: true,
      duration: '1 hour',
      concentration: false,
      castingTime: '1 bonus action',
    };

    spell.update(updatedData);

    expect(spell.level.value).toBe(updatedData.level);
    expect(spell.school.value).toBe(updatedData.school);
    expect(spell.classList[0].value).toBe(updatedData.classList[0]);
  });

  it('Should throw an error if Value Object validation fails', () => {

    const invalidData = { ...validSpellData, school: '' };

    expect(() => Spell.create(invalidData)).toThrow();
  });

});
