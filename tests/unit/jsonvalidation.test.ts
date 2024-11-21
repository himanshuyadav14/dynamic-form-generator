import { render, fireEvent } from "@testing-library/react";
import JSONEditor from "../../src/components/JSONEditor";

describe("JSON Validation", () => {
  it("should show an error for invalid JSON", () => {
    const mockOnChange = jest.fn();
    const { getByRole, getByText } = render(
      <JSONEditor json="" onChange={mockOnChange} error="Invalid JSON format" />
    );

    const editor = getByRole("textbox");
    fireEvent.change(editor, { target: { value: "{invalidJson}" } });

    expect(getByText("Invalid JSON format")).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith("{invalidJson}");
  });

  it("should not show an error for valid JSON", () => {
    const mockOnChange = jest.fn();
    const { queryByText } = render(
      <JSONEditor json='{"key":"value"}' onChange={mockOnChange} error={null} />
    );

    expect(queryByText("Invalid JSON format")).not.toBeInTheDocument();
  });
});
