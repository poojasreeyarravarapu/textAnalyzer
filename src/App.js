import React, { useState, useEffect } from 'react';
import './App.css'

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [uniqueWords, setUniqueWords] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [highlightedText, setHighlightedText] = useState('');

  // Handle real-time text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Real-time analysis of unique words and character count
  useEffect(() => {
    // 1. Unique word count
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWordSet = new Set(words);
    setUniqueWords(uniqueWordSet.size);

    // 2. Character count excluding spaces and punctuation
    const chars = text.replace(/[^a-zA-Z0-9]/g, '');
    setCharCount(chars.length);
  }, [text]);

  // String Replacement and Highlight
  const handleReplace = () => {
    // Replace all occurrences
    const replacedText = text.replaceAll(searchString, replaceString);
    setText(replacedText);

    // Highlight the replaced words (Bonus feature)
    const highlighted = replacedText.replaceAll(replaceString, `<span class="highlight">${replaceString}</span>`);
    setHighlightedText(highlighted);
  };

  return (
    <div style={{padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <h2 className='h1'>Real-time Text Analyzer</h2>

      {/* Textarea */}
      <textarea
        rows="10"
        cols="50"
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      ></textarea>

      {/* Real-time statistics */}
      <div style={{ marginTop: '10px' }}>
        <p className='p'>Unique Words: {uniqueWords}</p>
        <p className='p'>Character Count (Excluding Spaces & Punctuation): {charCount}</p>
      </div>

      {/* String replacement inputs */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search String"
          style={{ marginRight: '10px', padding: '5px', width: '45%' }}
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace With"
          style={{ padding: '5px', width: '45%' }}
        />
      </div>

      {/* Replace button */}
      <button onClick={handleReplace} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Replace All
      </button>

      {/* Bonus Feature: Highlight replaced text */}
      <div style={{ marginTop: '20px' }}>
        <h3>Replaced & Highlighted Text:</h3>
        <div
          dangerouslySetInnerHTML={{ __html: highlightedText }}
          style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '10px', border:'solid black 1px', borderRadius:'6px'}}
        />
      </div>
    </div>
  );
};

export default TextAnalyzer;
