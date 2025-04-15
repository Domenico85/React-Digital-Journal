import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import Navbar from './Navbar';

const moods = ['😊 Happy', '😢 Sad', '😐 Neutral', '😠 Angry', '😴 Tired'];

const Journal = () => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSave = () => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      mood,
      content
    };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setContent('');
    setMood('');
  };

  const handleDelete = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
  };

  return (
    <div>
      <Navbar />
      <div className="container pt-5 mt-5 main">
        <h2 className="mb-4 text-center">📓 Digital Journal</h2>

        <div className="mb-3">
          <label className="form-label">How are you feeling?</label>
          <select
            className="form-select"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">Select mood...</option>
            {moods.map((m, idx) => (
              <option key={idx} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <button className="btn btn-primary" onClick={handleSave} disabled={!content || !mood}>
          Save Entry
        </button>

        <hr className="my-4" />

        <h4>Your Entries</h4>
        {entries.length === 0 && <p>No entries yet.</p>}
        {entries.map(entry => (
          <div key={entry.id} className="card my-3">
            <div className="card-body">
              <h5 className="card-title">{entry.mood}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{entry.date}</h6>
              <div dangerouslySetInnerHTML={{ __html: entry.content }}></div>
              <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => handleDelete(entry.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
