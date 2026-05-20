import { describe, it, expect } from 'vitest';
import { CharacterClass } from '../../../domain/Shared/valueObjects/CharacterClass';

describe('Tests on CharacterClass Value Object', () => {
  
  it('should create a new CharacterClass', () => {
    const classStr = 'bard';
    const characterClass = CharacterClass.create(classStr);

    expect(characterClass.value).toBe(classStr);
  });
  
  it('should throw an error when creating a new CharacterClass with an empty value', () => {
    expect(() => CharacterClass.create('')).toThrow(/Class cannot be empty/i);
  });

  it('should throw an error with an invalid value', () => {
    expect(() => CharacterClass.create('bloodhunter')).toThrow(/Class must be valid/i);
  });
  
  it('should format a CharacterClass', () => {
    const classStr = ' cleric ';
    const characterClass = CharacterClass.create(classStr);

    expect(characterClass.value).toBe('cleric');
  });
  
  it('should compare two CharacterClasss', () => {
    const class1 = CharacterClass.create('druid');
    const class2 = CharacterClass.create('druid');

    expect(class1.equals(class2)).toBe(true);
  });
  
  it('should compare two different CharacterClasss', () => {
    const class1 = CharacterClass.create('ranger');
    const class2 = CharacterClass.create('sorcerer');

    expect(class1.equals(class2)).toBe(false);
  });

  it('should throw an error with only space characters input', () => {
    expect(() => CharacterClass.create('   ')).toThrow(/Class cannot be empty/i);
  });

  it('should return the correct value', () => {
    const characterClass = CharacterClass.create('warlock');
    expect(characterClass.value).toBe('warlock');
  });
});
