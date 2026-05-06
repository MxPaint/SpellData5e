import { describe, it, expect } from 'vitest';
import { Spell, type SpellData } from '../../../domain/entities/Spell';
import { CharacterClass } from '../../../domain/valueObjects/CharacterClass';
import { Id } from '../../../domain/valueObjects/Id';
import { Level } from '../../../domain/valueObjects/Level';
import { School } from '../../../domain/valueObjects/School';

describe('Tests of Entity Spell', () => {

  const validSpellData: SpellData = {
    id: 'Dancing Lights',
    level: 0,
    school: 'Evocation',
    classList: ['bard', 'warlock', 'wizard']
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
      classList: ['cleric']
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
