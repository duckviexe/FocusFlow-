import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';

const Timer = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, break
  const [initialTime, setInitialTime] = useState(25 * 60);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsActive(false);
      handleComplete();
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleComplete = () => {
    // Play sound? (skipped for now)
    if (mode === 'focus') {
      onSessionComplete({
        duration: Math.floor(initialTime / 60),
        timestamp: new Date().toISOString(),
      });
      setMode('break');
      setTimeLeft(5 * 60);
      setInitialTime(5 * 60);
    } else {
      setMode('focus');
      setTimeLeft(25 * 60);
      setInitialTime(25 * 60);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    const time = mode === 'focus' ? 25 * 60 : 5 * 60;
    setTimeLeft(time);
    setInitialTime(time);
  };

  const setCustomTime = (minutes) => {
    setIsActive(false);
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setMode('focus');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass-card flex flex-col items-center gap-8 max-w-md w-full animate-fade-in" style={{ padding: '3rem' }}>
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setCustomTime(25)}
          className={`btn-ghost ${mode === 'focus' && initialTime === 25 * 60 ? 'active' : ''}`}
          style={mode === 'focus' && initialTime === 25 * 60 ? { background: 'var(--accent-color)', color: 'white' } : {}}
        >
          25m
        </button>
        <button 
          onClick={() => setCustomTime(50)}
          className={`btn-ghost ${mode === 'focus' && initialTime === 50 * 60 ? 'active' : ''}`}
          style={mode === 'focus' && initialTime === 50 * 60 ? { background: 'var(--accent-color)', color: 'white' } : {}}
        >
          50m
        </button>
        <button 
          onClick={() => setMode('break') || setTimeLeft(5 * 60) || setInitialTime(5 * 60)}
          className="btn-ghost"
          style={mode === 'break' ? { background: 'var(--secondary-accent)', color: '#0c0d10' } : {}}
        >
          Break
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <svg width="220" height="220" className="transform -rotate-90">
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke={mode === 'focus' ? 'var(--accent-color)' : 'var(--secondary-accent)'}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset, 
              transition: 'stroke-dashoffset 0.5s ease',
              filter: `drop-shadow(0 0 8px ${mode === 'focus' ? 'var(--accent-glow)' : 'rgba(45, 212, 191, 0.4)'})`
            }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold font-mono tracking-tighter" style={{ fontSize: '3rem' }}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm opacity-50 uppercase tracking-widest font-semibold">
            {mode === 'focus' ? 'Focusing' : 'Resting'}
          </span>
        </div>
      </div>

      <div className="flex gap-6 mt-4">
        <button 
          onClick={toggleTimer}
          className="btn-primary flex items-center justify-center p-6 rounded-full"
          style={{ width: '64px', height: '64px', background: mode === 'focus' ? 'var(--accent-color)' : 'var(--secondary-accent)', color: mode === 'focus' ? 'white' : '#0c0d10' }}
        >
          {isActive ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
        </button>
        <button 
          onClick={resetTimer}
          className="btn-ghost flex items-center justify-center p-6 rounded-full"
          style={{ width: '64px', height: '64px' }}
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default Timer;
