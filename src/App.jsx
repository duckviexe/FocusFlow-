import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import TaskSession from './components/TaskSession';
import SessionHistory from './components/SessionHistory';
import FocusScore from './components/FocusScore';
import { Target, ShieldCheck, Sparkles, Zap } from 'lucide-react';

function App() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('focusflow_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('focusflow_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('focusflow_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('focusflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleSessionComplete = (session) => {
    setHistory(prev => [...prev, session]);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-color gap-4 animate-pulse">
        <Sparkles size={48} className="text-accent-color" />
        <span className="text-xl font-bold tracking-widest uppercase opacity-50">Entering Flow State...</span>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header animate-fade-in">
        <div className="header-icon-box">
          <Target className="text-accent-color" size={40} />
        </div>
        <h1 className="app-title">
          FocusFlow
        </h1>
        <p className="app-subtitle">
           Optimize your deep work and master your productivity one session at a time.
        </p>
      </header>

      <main className="app-main">
        <div className="main-grid">
          <div className="timer-section">
             <Timer onSessionComplete={handleSessionComplete} />
             <FocusScore history={history} tasks={tasks} />
          </div>
          
          <div className="tasks-section">
             <TaskSession tasks={tasks} setTasks={setTasks} />
          </div>
        </div>

        <div className="history-section">
          <SessionHistory history={history} />
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-info">
          <ShieldCheck size={20} />
          <span>Local Data Only — No Tracking</span>
        </div>
        <div className="footer-credits">
          <span className="credits-title">FocusFlow v1.0 — Smart Study Engine</span>
          <span className="credits-desc">Powered by Deep Work Metrics & Glassmorphic UI</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
