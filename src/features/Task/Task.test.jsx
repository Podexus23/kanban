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

  test("task change description", async () => {
    render(
      <Task
        task={{ title: "title", text: "text", id: 23 }}
        onEditTask={vi.fn()}
      />
    );

    //check button
    const editButtons = screen.getAllByRole("button", { name: "✏️" });
    expect(editButtons[1]).toBeInTheDocument();

    //click test
    await userEvent.click(editButtons[1]);
    const titleInput = await screen.findByRole("textbox");
    expect(titleInput).toBeInTheDocument();

    // await userEvent.type(titleInput, " updated");
    fireEvent.change(titleInput, { target: { value: "Description updated" } });

    const doneEditButton = await screen.findByRole("button", { name: "✔️" });
    await userEvent.click(doneEditButton);
    const description = await screen.findByText("Description updated", {
      exact: true,
    });
    expect(description).toBeInTheDocument();
  });

  test("task drag over new", async () => {
    const dragOver = { current: 90 };
    render(
      <div>
        <Task
          task={{ title: "title 1", text: "text 1", id: 23 }}
          onEditTask={vi.fn()}
          dragOver={dragOver}
        />
      </div>
    );

    const elem1 = screen.getByText("text 1", { exact: true });
    fireEvent.dragOver(elem1);

    expect(dragOver.current).equal(23);
  });

  test("task drag over same task", async () => {
    const dragOver = { current: 23 };
    render(
      <div>
        <Task
          task={{ title: "title 1", text: "text 1", id: 23 }}
          onEditTask={vi.fn()}
          dragOver={dragOver}
        />
      </div>
    );

    const elem1 = screen.getByText("text 1", { exact: true });
    fireEvent.dragOver(elem1);

    expect(dragOver.current).equal(23);
  });
});
