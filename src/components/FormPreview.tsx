import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const FormPreview = ({ schema }: { schema: FormSchema | null }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!schema) {
    return (
      <p className="text-gray-500">
        Enter a valid JSON schema to preview the form.
      </p>
    );
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [fieldId]: "", // Clear the error for this field
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    schema?.fields?.forEach((field) => {
      if (field?.required && !formData[field.id]?.trim()) {
        newErrors[field?.id] = `${field?.label} is required.`;
      }
      if (field?.type === "email" && formData[field?.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex?.test(formData[field?.id])) {
          newErrors[field?.id] = "Invalid email format.";
        }
      }
    });

    setErrors(newErrors);
    return Object?.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setSuccessMessage("Form submitted successfully!");
      setIsSubmitting(false);
      setFormData({});
      setErrors({});
    }, 1000); // Simulate API call delay
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-gray-800 text-white max-h-[85vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>

      {schema?.fields?.map((field) => (
        <div key={field?.id} className="mb-4">
          <label htmlFor={field?.id} className="block font-medium mb-1">
            {field?.label}{" "}
            {field?.required && <span className="text-red-500">*</span>}
          </label>

          {/* Render input types based on schema */}
          {field?.type === "text" && (
            <input
              type="text"
              id={field?.id}
              placeholder={field?.placeholder}
              value={formData[field?.id] || ""}
              onChange={(e) => handleInputChange(field?.id, e.target.value)}
              required={field?.required}
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          )}

          {field?.type === "email" && (
            <input
              type="email"
              id={field?.id}
              placeholder={field?.placeholder}
              value={formData[field?.id] || ""}
              onChange={(e) => handleInputChange(field?.id, e.target.value)}
              required={field?.required}
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          )}

          {field?.type === "textarea" && (
            <textarea
              id={field?.id}
              placeholder={field?.placeholder}
              value={formData[field?.id] || ""}
              onChange={(e) => handleInputChange(field?.id, e.target.value)}
              required={field?.required}
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          )}

          {field?.type === "select" && field?.options && (
            <select
              id={field?.id}
              value={formData[field?.id] || ""}
              onChange={(e) => handleInputChange(field?.id, e.target.value)}
              required={field?.required}
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            >
              <option value="">Select an option</option>
              {field?.options?.map((option, index) => (
                <option key={index} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          )}

          {field?.type === "radio" && field?.options && (
            <div>
              {field?.options?.map((option, index) => (
                <span key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${field?.id}-${option?.value}`}
                    name={field?.id}
                    value={option?.value}
                    checked={formData[field.id] === option?.value}
                    onChange={(e) => handleInputChange(field?.id, e?.target?.value)}
                    required={field?.required}
                    className="text-white"
                  />
                  <label htmlFor={`${field?.id}-${option?.value}`} className="ml-2 text-white">
                    {option?.label}
                  </label>
                </span>
              ))}
            </div>
          )}

          {errors[field?.id] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-2 text-white rounded ${
          isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </form>
  );
};

export default FormPreview;
