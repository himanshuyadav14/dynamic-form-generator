import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-okaidia.css'; 

const JSONEditor = ({ json, onChange, error }: { json: string; onChange: (value: string) => void; error: string | null }) => {
  const shouldShowError = json.trim() !== '' && error;

  return (
    <div className="h-full max-h-full">
      <Editor
        value={json}
        onValueChange={onChange}
        highlight={(code) => Prism.highlight(code, Prism.languages.json, 'json')}
        padding={10}
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 14,
          width: '100%',
          height: '90%',
          border: '1px solid #444',
          borderRadius: '8px',
          backgroundColor: '#1e1e1e',
          color: '#f8f8f2',
          overflowY: 'auto',
          overflowX: 'hidden', 
          caretColor: '#ffffff', 
          cursor: 'text',
        }}
      />
      {shouldShowError && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;
