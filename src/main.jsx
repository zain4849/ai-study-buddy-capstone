import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SettingsForm from './components/SettingsForm';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <section className="settings-page" aria-labelledby="settings-title">
      <div className="settings-page__intro">
        <p className="settings-page__eyebrow">AI Study Buddy</p>
        <h1 id="settings-title">Study preferences</h1>
        <p>Choose how challenging and focused your next session should feel.</p>
      </div>
      <SettingsForm />
    </section>
  </StrictMode>,
);
