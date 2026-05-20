import { describe, it, expect } from 'vitest';
import { Count } from '../../../domain/Shared/valueObjects/Count';

describe('Tests on Count Value Object', () => {
  it('should create a Count instance with a valid value', () => {
    const count = Count.create(1);
    expect(count).toBeInstanceOf(Count);
  });

  it('should create a Count instance with 0', () => {
    const count = Count.create(0);
    expect(count).toBeInstanceOf(Count);
    expect(count.value).toBe(0);
  });

  it('should create a Count instance with 9', () => {
    const count = Count.create(9);
    expect(count).toBeInstanceOf(Count);
    expect(count.value).toBe(9);
  });

  it('should throw an error when creating a Count with an invalid value', () => {
    expect(() => Count.create('string' as unknown as number)).toThrow(/Count must be an integer/i);
  });

  it('should throw an error when creating a Count with a decimal number', () => {
    expect(() => Count.create(5.5)).toThrow(/Count must be an integer/i);
    expect(() => Count.create(7.1)).toThrow(/Count must be an integer/i);
    expect(() => Count.create(3.14)).toThrow(/Count must be an integer/i);
  });

  it('should throw an error when creating a Count with a number lower than 0', () => {
    expect(() => Count.create(-6)).toThrow(/Count cannot be lesser than 0/i);
  });

  it('should return the correct value', () => {
    const count = Count.create(5);
    expect(count.value).toBe(5);
  });

  it('should compare two Counts', () => {
      const count1 = Count.create(6);
      const count2 = Count.create(6);
  
      expect(count1.equals(count2)).toBe(true);
    });
    
    it('should compare two different Counts', () => {
      const count1 = Count.create(3);
      const count2 = Count.create(8);
  
      expect(count1.equals(count2)).toBe(false);
    });

  it('should throw an error with NaN input', () => {
    expect(() => Count.create(NaN)).toThrow(/Invalid number/i);
  });
});
