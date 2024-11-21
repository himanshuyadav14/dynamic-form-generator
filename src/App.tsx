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
    <div className="flex flex-col h-screen overflow-hidden bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 shadow-xl sticky top-0 z-50 rounded-b-lg">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-semibold text-white">Dynamic Form Generator</h1>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        {/* Left Panel: JSON Editor */}
        <div className="w-full md:w-1/2 p-4 border-b md:border-r flex flex-col bg-transparent bg-blur border-gray-700 rounded-lg shadow-lg overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">JSON Editor</h2>
          <JSONEditor json={jsonSchema} onChange={handleJSONChange} error={error} />
        </div>

        {/* Right Panel: Form Preview */}
        <div className="w-full md:w-1/2 p-4 bg-transparent bg-blur border-gray-700 rounded-lg shadow-lg overflow-y-auto max-h-[85vh]">
          <h2 className="text-xl font-bold mb-4">Form Preview</h2>
          <FormPreview schema={parsedSchema} />
        </div>
      </div>
    </div>
  );
}

export default App;
