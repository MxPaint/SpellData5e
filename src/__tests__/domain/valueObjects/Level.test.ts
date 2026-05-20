import { describe, it, expect } from 'vitest';
import { Level } from '../../../domain/Shared/valueObjects/Level';

describe('Tests on Level Value Object', () => {
  it('should create a Level instance with a valid value', () => {
    const level = Level.create(1);
    expect(level).toBeInstanceOf(Level);
  });

  it('should create a Level instance with 0', () => {
    const level = Level.create(0);
    expect(level).toBeInstanceOf(Level);
    expect(level.value).toBe(0);
  });

  it('should create a Level instance with 9', () => {
    const level = Level.create(9);
    expect(level).toBeInstanceOf(Level);
    expect(level.value).toBe(9);
  });

  it('should throw an error when creating a Level with an invalid value', () => {
    expect(() => Level.create('string' as unknown as number)).toThrow(/Number must be an integer/i);
  });

  it('should throw an error when creating a Level with a decimal number', () => {
    expect(() => Level.create(5.5)).toThrow(/Number must be an integer/i);
    expect(() => Level.create(7.1)).toThrow(/Number must be an integer/i);
    expect(() => Level.create(3.14)).toThrow(/Number must be an integer/i);
  });

  it('should throw an error when creating a Level with a number lower than 0', () => {
    expect(() => Level.create(-6)).toThrow(/Level cannot be lesser than 0/i);
  });

  it('should throw an error when creating a Level with a number higher than 9', () => {
    expect(() => Level.create(10)).toThrow(/Level cannot be greater than 9/i);
  });

  it('should return the correct value', () => {
    const level = Level.create(5);
    expect(level.value).toBe(5);
  });

  it('should compare two Levels', () => {
      const level1 = Level.create(6);
      const level2 = Level.create(6);
  
      expect(level1.equals(level2)).toBe(true);
    });
    
    it('should compare two different Levels', () => {
      const level1 = Level.create(3);
      const level2 = Level.create(8);
  
      expect(level1.equals(level2)).toBe(false);
    });

  it('should throw an error with NaN input', () => {
    expect(() => Level.create(NaN)).toThrow(/Invalid number/i);
  });
});
