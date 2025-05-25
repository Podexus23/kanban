import { describe, expect, test, vi } from "vitest";
import Task from "./Task";
import { render, screen } from "@testing-library/react";

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
});
