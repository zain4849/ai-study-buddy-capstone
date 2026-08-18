import { describe, expect, it } from 'vitest';
import { isValidSettings, validateSettings } from './validation';

describe('validateSettings', () => {
  it('accepts complete supported settings', () => {
    expect(validateSettings({ difficulty: 'Advanced', duration: 60, notifications: true })).toEqual({});
    expect(isValidSettings({ difficulty: 'Advanced', duration: 60, notifications: true })).toBe(true);
  });

  it('reports a missing difficulty', () => {
    expect(validateSettings({ difficulty: '', duration: 30, notifications: true }).difficulty).toBe('Choose a difficulty level.');
  });

  it('reports unsupported durations and notification values', () => {
    expect(validateSettings({ difficulty: 'Beginner', duration: 45, notifications: 'yes' })).toMatchObject({
      duration: 'Choose a valid session duration.',
      notifications: 'Choose whether to enable notifications.',
    });
  });
});
