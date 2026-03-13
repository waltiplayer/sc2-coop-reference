import React, { useState, useEffect } from 'react';
import './App.css';
import CommanderList from './components/CommanderList';
import MapList from "./components/MapList";

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div className="App container-fluid">
      <h1>Starcraft 2 Co-op Reference</h1>
      <small>Big thanks to <a href="https://starcraft2coop.com/">https://starcraft2coop.com/</a> for all the awesome resources, this is for reference only. Check out their site for more in-depth information.</small>
      <br/>
      <small>Built using Reactjs and PicoCSS. Head to the <a href="https://github.com/waltiplayer/sc2-coop-reference">GitHub page</a> if you want to submit additions or corrections.</small>
      <div className="theme-toggle">
        <label htmlFor="theme-select">Theme:</label>
        <select id="theme-select" value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}>
          <option value="system">System Default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <hr/>
      <div className="grid">
        <CommanderList/>
        <MapList/>
      </div>
    </div>
  );
};

export default App;
