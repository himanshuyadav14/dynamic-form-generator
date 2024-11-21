import React, { useState } from "react"; 
import "./App.css";
import JSONEditor from "./components/JSONEditor";
import FormPreview from "./components/FormPreview";

function App() {
  const [jsonSchema, setJsonSchema] = useState<string>("");
  const [parsedSchema, setParsedSchema] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJSONChange = (input: string) => {
    setJsonSchema(input);
    try {
      const parsed = JSON.parse(input);
      setParsedSchema(parsed);
      setError(null);
    } catch (err) {
      setParsedSchema(null);
      setError("Invalid JSON format");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Panel: JSON Editor */}
      <div className="w-full md:w-1/2 p-4 border-r">
        <h1 className="text-xl font-bold mb-4">JSON Editor</h1>
        <JSONEditor json={jsonSchema} onChange={handleJSONChange} error={error} />
      </div>

      {/* Right Panel: Form Preview */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-xl font-bold mb-4">Form Preview</h1>
        <FormPreview schema={parsedSchema} />
      </div>
    </div>
  );
}

export default App;
