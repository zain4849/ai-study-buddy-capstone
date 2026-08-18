import { createElement as h } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SettingsForm from './SettingsForm';

describe('SettingsForm', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('enables submit after selecting a difficulty and saves the settings', () => {
    render(h(SettingsForm));
    const submit = screen.getByRole('button', { name: /save settings/i });
    expect(submit).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/difficulty level/i), { target: { value: 'Advanced' } });
    fireEvent.click(screen.getByLabelText(/60 minutes/i));
    expect(submit).toBeEnabled();
    fireEvent.click(submit);
    expect(JSON.parse(window.localStorage.getItem('studySettings'))).toEqual({ difficulty: 'Advanced', duration: 60, notifications: true });
    expect(screen.getByRole('status')).toHaveTextContent('Settings saved.');
  });

  it('removes the success message after two seconds', () => {
    vi.useFakeTimers();
    render(h(SettingsForm));
    fireEvent.change(screen.getByLabelText(/difficulty level/i), { target: { value: 'Beginner' } });
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('restores valid saved settings on load', () => {
    window.localStorage.setItem('studySettings', JSON.stringify({ difficulty: 'Intermediate', duration: 15, notifications: false }));
    render(h(SettingsForm));
    expect(screen.getByLabelText(/difficulty level/i)).toHaveValue('Intermediate');
    expect(screen.getByLabelText(/15 minutes/i)).toBeChecked();
    expect(screen.getByRole('switch', { name: /enable notifications/i })).not.toBeChecked();
  });

  it('falls back to defaults and reports malformed saved settings', () => {
    window.localStorage.setItem('studySettings', '{bad json');
    render(h(SettingsForm));
    expect(screen.getByRole('alert')).toHaveTextContent('Saved settings could not be restored.');
    expect(screen.getByLabelText(/difficulty level/i)).toHaveValue('');
    expect(screen.getByLabelText(/30 minutes/i)).toBeChecked();
    expect(screen.getByRole('switch', { name: /enable notifications/i })).toBeChecked();
  });
});
