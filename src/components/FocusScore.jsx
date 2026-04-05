import React from 'react';
import { Target, Zap, ZapOff, Sparkle, Sparkles } from 'lucide-react';

const FocusScore = ({ history, tasks }) => {
  // Score formula:
  // Base score = (active_sessions * 10) + (total_minutes * 0.5) + (completed_tasks * 5)
  // Minus inactive penalty (no sessions in last 24h)? No, let's keep it positive.

  const completedTasks = tasks.filter(t => t.completed).length;
  const currentTotalMins = history.reduce((sum, s) => sum + s.duration, 0);
  const totalSessions = history.length;

  const score = Math.floor(
    (totalSessions * 10) + (currentTotalMins * 0.5) + (completedTasks * 5)
  );

  const getRank = (s) => {
    if (s < 50) return { label: 'Seed', icon: <ZapOff size={24} />, color: '#94a3b8' };
    if (s < 200) return { label: 'Spark', icon: <Zap size={24} />, color: '#fbbf24' };
    if (s < 500) return { label: 'Flow Master', icon: <Sparkle size={24} />, color: '#2dd4bf' };
    return { label: 'Zenith', icon: <Sparkles size={24} />, color: '#7c3aed' };
  };

  const rank = getRank(score);

  return (
    <div className="glass-card shadow-2xl animate-fade-in flex flex-col items-center gap-4 min-w-[240px] border-accent-glow" style={{ padding: '2rem' }}>
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all animate-pulse" 
        style={{ 
          background: rank.color + '20', 
          color: rank.color,
          boxShadow: `0 0 20px 0 ${rank.color}40`
        }}
      >
        {rank.icon}
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-4xl font-black tracking-tighter" style={{ color: rank.color }}>
          {score}
        </span>
        <span className="text-sm font-bold uppercase tracking-widest text-dim">
          Focus Score
        </span>
      </div>

      <div className="w-full h-px bg-white bg-opacity-10 my-2"></div>

      <div className="flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest font-semibold opacity-50 mb-1">Rank</span>
        <span className="text-lg font-bold" style={{ color: rank.color }}>{rank.label}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-2 w-full">
        <div className="flex flex-col items-center p-3 rounded-xl bg-white bg-opacity-5">
           <span className="text-xl font-bold">{totalSessions}</span>
           <span className="text-[10px] text-dim uppercase font-bold">Sessions</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white bg-opacity-5">
           <span className="text-xl font-bold">{completedTasks}</span>
           <span className="text-[10px] text-dim uppercase font-bold">Goals</span>
        </div>
      </div>
    </div>
  );
};

export default FocusScore;
