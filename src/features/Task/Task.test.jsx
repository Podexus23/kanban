import { describe, expect, test, vi } from "vitest";
import Task from "./Task";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("test tasks functionality", () => {
  test("render task properly", async () => {
    vi.mock("react-i18next", () => ({
      useTranslation: () => ({
        t: (key) => key,
        i18n: {
          changeLanguage: vi.fn(),
        },
      }),
    }));
    render(<Task task={{ title: "title", text: "text", id: 23 }} />);

    const buttonClose = await screen.findByRole("button", { name: "❌" });
    expect(buttonClose).toBeInTheDocument();
  });

  test("task change title", async () => {
    render(
      <Task
        task={{ title: "title", text: "text", id: 23 }}
        onEditTask={vi.fn()}
      />
    );

    //check button
    const editButtons = screen.getAllByRole("button", { name: "✏️" });
    expect(editButtons[0]).toBeInTheDocument();

    //click test
    await userEvent.click(editButtons[0]);
    const titleInput = await screen.findByRole("textbox");
    expect(titleInput).toBeInTheDocument();

    // await userEvent.type(titleInput, " updated");
    fireEvent.change(titleInput, { target: { value: "title updated" } });

    const doneEditButton = await screen.findByRole("button", { name: "✔️" });
    await userEvent.click(doneEditButton);
    const title = await screen.findByText("title updated", { exact: true });
    expect(title).toBeInTheDocument();
  });
});
