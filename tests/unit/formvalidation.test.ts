import { render } from "@testing-library/react";
import FormPreview from "../../src/components/FormPreview";

describe("Real-Time Form Generation", () => {
  it("should render form elements based on JSON schema", () => {
    const schema = {
      fields: [
        { name: "username", type: "text", label: "Username" },
        { name: "password", type: "password", label: "Password" },
      ],
    };

    const { getByLabelText } = render(<FormPreview schema={schema} />);
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it("should handle empty schema gracefully", () => {
    const { queryByLabelText } = render(<FormPreview schema={{}} />);
    expect(queryByLabelText("Username")).not.toBeInTheDocument();
  });
});
