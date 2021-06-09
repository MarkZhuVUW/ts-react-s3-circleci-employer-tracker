import { render } from "@testing-library/react";
import React from "react";
import LocalStorageProvider from "../../providers/LocalStorageProvider";
import ThemeProvider from "../../providers/ThemeProvider";
describe("AuthCotainer tests.", () => {
  test("bla", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider></ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();
  });
});