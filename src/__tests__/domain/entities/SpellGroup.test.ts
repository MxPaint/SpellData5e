import { describe, it, expect } from 'vitest';
import { SpellGroup, type SpellGroupData } from '../../../domain/entities/SpellGroup';
import { Id } from '../../../domain/valueObjects/Id';
import { Level } from '../../../domain/valueObjects/Level';
import { School } from '../../../domain/valueObjects/School';
import { Count } from '../../../domain/valueObjects/Count';

describe('Tests of Entity Spell', () => {

  const validSpellData: SpellGroupData = {
    level: 0,
    school: 'Evocation',
    count: 13
  };


  it('Should create a Spell', () => {
    const spellGroup = SpellGroup.create(validSpellData);
    expect(spellGroup).toBeInstanceOf(SpellGroup);
  });

  it('Should correctly instantiate nested Value Objects', () => {
    const spellGroup = SpellGroup.create(validSpellData);

    expect(spellGroup.id).toBeInstanceOf(Id);
    expect(spellGroup.level).toBeInstanceOf(Level);
    expect(spellGroup.school).toBeInstanceOf(School);
    expect(spellGroup.count).toBeInstanceOf(Count);
  });
  
  it('Should update Spell properties with new data', () => {
    const spellGroup = SpellGroup.create(validSpellData);
    
    const updatedData: SpellGroupData = {
      level: 1,
      school: 'Evocation',
      count: 20 
    };

    spellGroup.update(updatedData);

    expect(spellGroup.level.value).toBe(updatedData.level);
    expect(spellGroup.school.value).toBe(updatedData.school);
    expect(spellGroup.count.value).toBe(updatedData.count);
  });
  
  it('Should throw an error if Value Object validation fails', () => {
    
    const invalidData = { ...validSpellData, school: '' };

    expect(() => SpellGroup.create(invalidData)).toThrow();
  });
  
});
