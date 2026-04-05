import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { History, TrendingUp, Calendar } from 'lucide-react';

const SessionHistory = ({ history }) => {
  // Aggregate data for the chart (last 7 days)
  const chartData = React.useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const totalMinutes = history
        .filter(s => s.timestamp.startsWith(date))
        .reduce((sum, s) => sum + s.duration, 0);
      
      const label = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      return { date: label, minutes: totalMinutes };
    });
  }, [history]);

  return (
    <div className="glass-card w-full max-w-4xl flex flex-col gap-8 animate-fade-in" style={{ padding: '2.5rem' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <History size={24} className="text-accent-color" />
          Focus Insights
        </h3>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-dim text-xs uppercase tracking-widest font-semibold">Weekly Yield</span>
            <span className="text-xl font-bold text-accent-color">
              {chartData.reduce((sum, d) => sum + d.minutes, 0)} mins
            </span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2b35" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(val) => `${val}m`}
            />
            <Tooltip 
              contentStyle={{ 
                background: '#1a1b23', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px',
                color: '#f8fafc' 
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="minutes" 
              stroke="#7c3aed" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMinutes)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-dim uppercase tracking-widest">Recent Flows</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.slice(-4).reverse().map((session, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-5">
              <div className="w-10 h-10 rounded-full bg-accent-glow flex items-center justify-center text-accent-color">
                <TrendingUp size={18} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{session.duration}m Focus Session</span>
                <span className="text-dim text-xs">
                  {new Date(session.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <p className="col-span-2 text-center py-8 opacity-30 italic">Step into your first flow to see history here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;
