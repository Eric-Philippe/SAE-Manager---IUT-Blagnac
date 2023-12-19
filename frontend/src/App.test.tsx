import { render, screen } from "@testing-library/react";
import Copyright from "./components/Copyright";

describe("React Common Tests", () => {
  test("renders the right year", () => {
    render(<Copyright />);
    const currentYear = new Date().getFullYear();
    const goodYear = screen.getByText(currentYear.toString());
    expect(goodYear).toBeInTheDocument();
  });
});
