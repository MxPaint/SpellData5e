import { describe, it, expect } from 'vitest';
import { TextField } from '../../../domain/Shared/valueObjects/TextField';

describe('Tests on TextField Value Object', () => {
  
  it('should create a new TextField', () => {
    const txtField = 'John Doe';
    const txt = TextField.create(txtField);

    expect(txt.value).toBe(txtField);
  });
  
  it('should throw an error when creating a new TextField with an empty value', () => {
    expect(() => TextField.create('')).toThrow(/Text cannot be empty/i);
  });
  
  it('should format a TextField', () => {
    const txtField = ' John Doe ';
    const txt = TextField.create(txtField);

    expect(txt.value).toBe('John Doe');
  });
  
  it('should compare two TextFields', () => {
    const txt1 = TextField.create('John Doe');
    const txt2 = TextField.create('John Doe');

    expect(txt1.equals(txt2)).toBe(true);
  });
  
  it('should compare two different TextFields', () => {
    const txt1 = TextField.create('John Doe');
    const txt2 = TextField.create('Jane Doe');

    expect(txt1.equals(txt2)).toBe(false);
  });

  it('should throw an error with only space characters input', () => {
    expect(() => TextField.create('   ')).toThrow(/Text cannot be empty/i);
  });

  it('should return the correct value', () => {
    const txt = TextField.create('John Doe');
    expect(txt.value).toBe('John Doe');
  });
});
