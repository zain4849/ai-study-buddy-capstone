export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const SESSION_DURATIONS = [15, 30, 60];

export function validateSettings(settings = {}) {
  const errors = {};

  if (!DIFFICULTY_LEVELS.includes(settings.difficulty)) {
    errors.difficulty = 'Choose a difficulty level.';
  }
  if (!SESSION_DURATIONS.includes(settings.duration)) {
    errors.duration = 'Choose a valid session duration.';
  }
  if (typeof settings.notifications !== 'boolean') {
    errors.notifications = 'Choose whether to enable notifications.';
  }

  return errors;
}

export function isValidSettings(settings) {
  return Object.keys(validateSettings(settings)).length === 0;
}
