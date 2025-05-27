import { describe, expect, test, vi } from "vitest";
import NewTask from "./NewTask";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";

describe("new task component tests", () => {
  test("close of creating new task", async () => {
    const onClose = vi.fn();
    render(<NewTask onCloseAddNewTask={onClose} />);

    const closeBtn = screen.getByRole("button", { name: "❌" });
    await userEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
  test("correct submit entered data", async () => {
    const onClose = vi.fn();
    const data = { description: null, title: null };
    const onSubmit = ({ description, title }) => {
      data.description = description;
      data.title = title;
    };
    render(<NewTask onCloseAddNewTask={onClose} onSubmitTask={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: "✔️" });
    const textAreas = screen.getAllByRole("textbox");
    fireEvent.change(textAreas[0], { target: { value: "New Title" } });
    fireEvent.change(textAreas[1], { target: { value: "New Description" } });
    await userEvent.click(submitButton);

    expect(data).toEqual({
      description: "New Description",
      title: "New Title",
    });
  });
});
