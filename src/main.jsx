import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({ name, size = 20 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z"/><path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4"/></>,
    chart: <><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20V7"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.1 2.1-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-3v-.1A1.7 1.7 0 0 0 10.7 18.3a1.7 1.7 0 0 0-1.88.34l-.06.06-2.1-2.1.06-.06A1.7 1.7 0 0 0 7.06 14.7 1.7 1.7 0 0 0 5.5 13.7H5v-3h.1A1.7 1.7 0 0 0 6.7 9.68a1.7 1.7 0 0 0-.34-1.88L6.3 7.74l2.1-2.1.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.37 4.5V4h3v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.1 2.1-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.1v3h-.1A1.7 1.7 0 0 0 19.4 15Z"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
    camera: <><path d="M14.5 4 16 7h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4l1.5-3Z"/><circle cx="12" cy="13" r="3"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    moon: <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"/>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

function Toggle({ checked, onChange }) { return <button className={`toggle ${checked ? 'on' : ''}`} onClick={() => onChange(!checked)} aria-pressed={checked}><span /></button>; }

function App() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({ reminders: true, weekly: true, focus: false, theme: 'Light', font: 'Medium', session: '45 minutes' });
  const set = (key, value) => { setSettings(s => ({ ...s, [key]: value })); setSaved(false); };
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 2200); };
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">S</div><span>StudySpace</span></div>
      <nav><p className="nav-label">WORKSPACE</p>
        <a><Icon name="grid"/>Overview</a><a><Icon name="book"/>My courses</a><a><Icon name="chart"/>Progress</a><a><Icon name="calendar"/>Planner</a>
        <p className="nav-label preferences">PREFERENCES</p><a className="active"><Icon name="settings"/>Settings</a>
      </nav>
      <div className="sidebar-bottom"><div className="upgrade"><span className="spark">✦</span><div><b>Unlock more focus</b><small>Try StudySpace Pro</small></div><Icon name="chevron" size={16}/></div><div className="profile"><div className="avatar small">ZM</div><div><b>Zain Malik</b><small>zain@university.edu</small></div><Icon name="chevron" size={16}/></div></div>
    </aside>
    <main>
      <header><div className="crumb">Settings <span>/</span> <b>My preferences</b></div><div className="header-actions"><button className="icon-button"><Icon name="search"/></button><button className="icon-button notification"><Icon name="bell"/><i /></button></div></header>
      <section className="content"><div className="title-row"><div><h1>My preferences</h1><p>Manage your account settings and study experience.</p></div><button className={`save ${saved ? 'saved' : ''}`} onClick={save}>{saved ? 'Changes saved' : 'Save changes'}</button></div>
        <div className="settings-layout"><div className="settings-main">
          <section className="card profile-card"><div className="section-heading"><div><h2>Profile</h2><p>Update your photo and personal details.</p></div></div><div className="profile-content"><div className="avatar large">ZM<button className="camera"><Icon name="camera" size={14}/></button></div><div className="profile-fields"><label>Full name<input defaultValue="Zain Malik" /></label><label>Email address<input type="email" defaultValue="zain@university.edu" /></label></div></div><button className="text-action"><Icon name="edit" size={15}/> Edit profile</button></section>
          <section className="card"><div className="section-heading"><div><h2>Study preferences</h2><p>Set the defaults that help you study your way.</p></div></div><div className="setting-row"><div><h3>Default study session</h3><p>Suggested length when you start a focus session.</p></div><select value={settings.session} onChange={e => set('session', e.target.value)}><option>25 minutes</option><option>45 minutes</option><option>60 minutes</option></select></div><div className="setting-row"><div><h3>Study reminders</h3><p>Get a gentle nudge when it’s time to study.</p></div><Toggle checked={settings.reminders} onChange={v => set('reminders', v)}/></div><div className="setting-row"><div><h3>Weekly progress summary</h3><p>Receive your learning recap every Sunday.</p></div><Toggle checked={settings.weekly} onChange={v => set('weekly', v)}/></div></section>
          <section className="card appearance"><div className="section-heading"><div><h2>Appearance</h2><p>Personalize how StudySpace looks for you.</p></div></div><div className="setting-row"><div><h3>Theme</h3><p>Choose your preferred interface appearance.</p></div><div className="segmented">{['Light','System','Dark'].map((item, i) => <button key={item} className={settings.theme === item ? 'selected' : ''} onClick={() => set('theme', item)}><Icon name={i === 0 ? 'sun' : i === 1 ? 'monitor' : 'moon'} size={15}/>{item}</button>)}</div></div><div className="setting-row"><div><h3>Font size</h3><p>Make text more comfortable to read.</p></div><div className="font-choice">{['Small','Medium','Large'].map(item => <button key={item} className={settings.font === item ? 'selected' : ''} onClick={() => set('font', item)}>{item}</button>)}</div></div></section>
        </div><aside className="right-rail"><div className="help-card"><div className="help-icon">?</div><h3>Need a hand?</h3><p>Find answers and learn more about getting the most from StudySpace.</p><a href="#help">Visit help center <Icon name="chevron" size={15}/></a></div></aside></div>
      </section>
    </main>
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
