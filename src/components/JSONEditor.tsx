import React from 'react';
import Editor from '@monaco-editor/react';

const JSONEditor = ({ json, onChange, error }: { json: string; onChange: (value: string) => void; error: string | null }) => {
  const shouldShowError = json.trim() !== '' && error;

  return (
    <div className="h-full max-h-full flex flex-col text-white">
      {/* Wrapper div for Monaco Editor */}
      <div
        style={{
          borderRadius: '10px',
          border: '1px solid #444',
          height: '800px',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#1e1e1e',
        }}
      >
        <Editor
          height="100%" 
          width="100%"
          value={json}  // If no JSON is provided, show default blueprint (commented out)
          language="json"
          theme="vs-dark"
          onChange={(value) => onChange(value || '')}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            fontSize: 16,
            glyphMargin: false,
          }}
        />
      </div>

      {/* Error Display */}
      {shouldShowError && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;
