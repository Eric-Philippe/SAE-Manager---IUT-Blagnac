import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Copyright from "./components/Copyright";
import fs from "fs";
import path from "path";

describe("React Common Tests", () => {
  test("renders the right year", () => {
    render(<Copyright />);
    const currentYear = new Date().getFullYear();
    const goodYear = screen.getByText(currentYear.toString());
    expect(goodYear).toBeInTheDocument();
  });
});
