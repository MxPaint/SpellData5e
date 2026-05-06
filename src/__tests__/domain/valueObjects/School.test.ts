import { describe, it, expect } from 'vitest';
import { School } from '../../../domain/valueObjects/School';

describe('Tests on School Value Object', () => {

  it('should create a new School', () => {
    const schoolStr = 'Abjuration';
    const school = School.create(schoolStr);

    expect(school.value).toBe(schoolStr);
  });

  it('should throw an error when creating a new School with an empty value', () => {
    expect(() => School.create('')).toThrow(/School cannot be empty/i);
  });

  it('should throw an error with an invalid value', () => {
    expect(() => School.create('A')).toThrow(/School must be valid/i);
  });

  it('should format a School', () => {
    const schoolStr = ' Conjuration ';
    const school = School.create(schoolStr);

    expect(school.value).toBe('Conjuration');
  });

  it('should compare two Schools', () => {
    const school1 = School.create('Divination');
    const school2 = School.create('Divination');

    expect(school1.equals(school2)).toBe(true);
  });

  it('should compare two different Schools', () => {
    const school1 = School.create('Enchantment');
    const school2 = School.create('Evocation');

    expect(school1.equals(school2)).toBe(false);
  });

  it('should throw an error with only space characters input', () => {
    expect(() => School.create('   ')).toThrow(/School cannot be empty/i);
  });

  it('should return the correct value', () => {
    const school = School.create('Necromancy');
    expect(school.value).toBe('Necromancy');
  });
});
