import { render, screen } from "@testing-library/react";
import Button from "../components/Button";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

describe("button tests", () => {
  test("matches snapshot", () => {
    const { container } = render(
      <Button
        name={"my name"}
        title="some title"
        onClick={() => console.log("test btn")}
        size={"medium"}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("renders button with text and handles click", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn(); // Mock-функция

    render(<Button name={"click me"} onClick={handleClick} />);

    // Проверка рендеринга
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();

    // Тест клика
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
