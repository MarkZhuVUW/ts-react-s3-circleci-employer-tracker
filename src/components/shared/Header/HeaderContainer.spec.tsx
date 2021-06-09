import { findByLabelText, findByText, render } from "@testing-library/react";
import React from "react";
import LocalStorageProvider from "../../../providers/LocalStorageProvider";
import ThemeProvider from "../../../providers/ThemeProvider";
import HeaderContainer from "./HeaderContainer";
import userEvent from "@testing-library/user-event";
import HeaderView from "./HeaderView";
import { Theme } from "../../../contexts/ThemeContext";
describe("HeaderCotainer tests.", () => {
  test("HeaderView renders correctly", async () => {
    const { container } = render(
      <HeaderView theme={Theme.Light} toggleLightDarkTheme={() => ({})} />
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );

    await findByLabelText(container, "Contact the developer", { exact: true });
    await findByText(
      container,
      "Source codes and contact can be found on the right.",
      { exact: true }
    );
  });

  test("HeaderContainer theme toggling works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <HeaderContainer />
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );

    await findByLabelText(
      container,
      "Toggle light/dark mode - Currently dark mode.",
      { exact: true }
    );

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently dark mode.",
        { exact: true }
      )
    );

    await findByLabelText(
      container,
      "Toggle light/dark mode - Currently light mode.",
      { exact: true }
    );
  });
});