'use client';

import { useState } from 'react';

interface Habit {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  completed: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const addHabit = () => {
    if (!newHabit.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      frequency,
      streak: 0,
      completed: false,
    };
    
    setHabits([...habits, habit]);
    setNewHabit('');
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed, streak: !h.completed ? h.streak + 1 : h.streak } : h
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/.netlify/functions/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          context: { habits, totalHabits: habits.length }
        }),
      });

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I could not connect to the AI coach. Please check your API keys.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Life Tracker</h1>
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showChat ? 'Hide Chat' : '💬 AI Coach'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Habits Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">My Habits</h2>
              
              {/* Add Habit Form */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                  placeholder="Add a new habit..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </select>
                <button
                  onClick={addHabit}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Add
                </button>
              </div>

              {/* Habits Table */}
              {habits.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No habits yet. Add your first habit above!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Habit</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Frequency</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Streak</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {habits.map((habit) => (
                        <tr key={habit.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{habit.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 capitalize">{habit.frequency}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                              🔥 {habit.streak} days
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toggleHabit(habit.id)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                habit.completed
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {habit.completed ? '✓ Done' : 'Pending'}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => deleteHabit(habit.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">Total Habits</p>
                <p className="text-2xl font-bold text-blue-600">{habits.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {habits.filter(h => h.completed).length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-sm text-gray-600">Best Streak</p>
                <p className="text-2xl font-bold text-orange-600">
                  {habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0}
                </p>
              </div>
            </div>
          </div>

          {/* AI Chat Section */}
          {showChat && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 h-[600px] flex flex-col">
                <h2 className="text-xl font-bold mb-4">🤖 AI Coach</h2>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <p>Ask me anything about your habits, goals, or health!</p>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-blue-100 ml-8'
                            : 'bg-gray-100 mr-8'
                        }`}
                      >
                        <p className="text-sm font-semibold mb-1">
                          {msg.role === 'user' ? 'You' : 'AI Coach'}
                        </p>
                        <p className="text-sm text-gray-800">{msg.content}</p>
                      </div>
                    ))
                  )}
                  {loading && (
                    <div className="bg-gray-100 mr-8 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">AI is thinking...</p>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask your AI coach..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
