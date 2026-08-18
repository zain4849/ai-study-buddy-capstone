import { createElement as h, useEffect, useState } from 'react';
import { DIFFICULTY_LEVELS, SESSION_DURATIONS, isValidSettings, validateSettings } from '../utils/validation';
import '../styles/settings.css';

const DEFAULT_SETTINGS = { difficulty: '', duration: 30, notifications: true };

function getSavedSettings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem('studySettings'));
    return saved && isValidSettings(saved)
      ? { settings: saved }
      : { settings: DEFAULT_SETTINGS, restoreError: saved ? 'Saved settings could not be restored.' : '' };
  } catch {
    return { settings: DEFAULT_SETTINGS, restoreError: 'Saved settings could not be restored.' };
  }
}

export default function SettingsForm() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [errors, setErrors] = useState(validateSettings(DEFAULT_SETTINGS));
  const [success, setSuccess] = useState('');
  const [saveError, setSaveError] = useState('');
  const [restoreError, setRestoreError] = useState('');
  const valid = isValidSettings(settings);

  useEffect(() => {
    const saved = getSavedSettings();
    setSettings(saved.settings);
    setErrors(validateSettings(saved.settings));
    setRestoreError(saved.restoreError || '');
  }, []);

  useEffect(() => {
    if (!success) return undefined;
    const timeout = window.setTimeout(() => setSuccess(''), 2000);
    return () => window.clearTimeout(timeout);
  }, [success]);

  function update(field, value) {
    const next = { ...settings, [field]: value };
    setSettings(next);
    setErrors(validateSettings(next));
    setSuccess('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateSettings(settings);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      window.localStorage.setItem('studySettings', JSON.stringify(settings));
      setSaveError('');
      setSuccess('Settings saved.');
    } catch {
      setSaveError('Settings could not be saved. Please try again.');
    }
  }

  return h('form', { className: 'settings-form', onSubmit: handleSubmit, noValidate: true },
    h('h2', null, 'Study settings'),
    restoreError && h('p', { className: 'form-message form-message--error', role: 'alert' }, restoreError),
    saveError && h('p', { className: 'form-message form-message--error', role: 'alert' }, saveError),
    success && h('p', { className: 'form-message form-message--success', role: 'status' }, success),
    h('div', { className: 'form-field' },
      h('label', { htmlFor: 'difficulty' }, 'Difficulty Level'),
      h('select', {
        id: 'difficulty',
        value: settings.difficulty,
        onChange: (e) => update('difficulty', e.target.value),
        'aria-invalid': Boolean(errors.difficulty),
        'aria-describedby': errors.difficulty ? 'difficulty-error' : undefined,
        required: true,
      },
      h('option', { value: '' }, 'Select a difficulty'),
      DIFFICULTY_LEVELS.map((level) => h('option', { key: level, value: level }, level))),
      errors.difficulty && h('p', { className: 'field-error', id: 'difficulty-error' }, errors.difficulty),
    ),
    h('fieldset', { className: 'form-field', 'aria-describedby': errors.duration ? 'duration-error' : undefined },
      h('legend', null, 'Session Duration'),
      h('div', { className: 'radio-options' }, SESSION_DURATIONS.map((duration) => h('label', { key: duration },
        h('input', {
          type: 'radio',
          name: 'duration',
          value: duration,
          checked: settings.duration === duration,
          onChange: () => update('duration', duration),
          'aria-invalid': Boolean(errors.duration),
        }),
        ` ${duration} minutes`,
      ))),
      errors.duration && h('p', { className: 'field-error', id: 'duration-error' }, errors.duration),
    ),
    h('div', { className: 'form-field' },
      h('label', { className: 'toggle-label', htmlFor: 'notifications' },
        h('input', {
          id: 'notifications',
          type: 'checkbox',
          checked: settings.notifications,
          onChange: (e) => update('notifications', e.target.checked),
          role: 'switch',
          'aria-checked': settings.notifications,
          'aria-invalid': Boolean(errors.notifications),
          'aria-describedby': errors.notifications ? 'notifications-error' : undefined,
        }),
        h('span', { className: 'toggle', 'aria-hidden': 'true' }),
        ' Enable Notifications',
      ),
      errors.notifications && h('p', { className: 'field-error', id: 'notifications-error' }, errors.notifications),
    ),
    h('button', { type: 'submit', disabled: !valid }, 'Save settings'),
  );
}
