import React, { useState } from 'react';
import { Check, Trash2, Plus, GripVertical } from 'lucide-react';

const TaskSession = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="glass-card w-full max-w-md animate-fade-in" style={{ padding: '2rem', minHeight: '400px' }}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="p-2 rounded-lg bg-accent-glow" style={{ color: 'var(--accent-color)' }}>
          <Check size={20} />
        </span>
        Current Goals
      </h3>

      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask(e)}
          placeholder="What are we focusing on?"
          className="flex-1 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-color transition"
        />
        <button 
          onClick={addTask}
          className="btn-primary p-3 rounded-xl flex items-center justify-center p-0"
          style={{ width: '48px', height: '48px' }}
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`flex items-center gap-3 p-4 rounded-xl border border-white border-opacity-5 hover:border-opacity-10 transition group bg-white bg-opacity-5`}
            style={task.completed ? { opacity: 0.5, borderStyle: 'dashed' } : {}}
          >
            <button 
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-success border-success' : 'border-white border-opacity-20 hover:border-accent-color'}`}
            >
              {task.completed && <Check size={14} color="white" strokeWidth={3} />}
            </button>
            <span className={`flex-1 ${task.completed ? 'line-through text-dim' : ''}`}>
              {task.text}
            </span>
            <button 
              onClick={() => removeTask(task.id)}
              className="opacity-0 group-hover:opacity-100 transition p-2 text-error hover:bg-error hover:bg-opacity-10 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 opacity-30 text-center">
            <p>No tasks yet. Take small steps.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSession;
