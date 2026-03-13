import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import CommanderList from './components/CommanderList';
import MapList from "./components/MapList";

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [selectedCommander, setSelectedCommander] = useState<string | null>(null);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  // Parse URL query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const commanderParam = params.get('commander');
    const mapParam = params.get('map');
    
    if (commanderParam) {
      setSelectedCommander(commanderParam);
    }
    if (mapParam) {
      setSelectedMap(mapParam);
    }
  }, []);

  // Update URL when commander selection changes
  const handleCommanderSelect = useCallback((id: string) => {
    setSelectedCommander(id);
    updateUrlParam('commander', id);
  }, []);

  // Update URL when map selection changes
  const handleMapSelect = useCallback((id: string) => {
    setSelectedMap(id);
    updateUrlParam('map', id);
  }, []);

  // Helper to update URL query parameter without page reload
  const updateUrlParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

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
        <CommanderList selectedId={selectedCommander} onSelect={handleCommanderSelect}/>
        <MapList selectedId={selectedMap} onSelect={handleMapSelect}/>
      </div>
    </div>
  );
};

export default App;
