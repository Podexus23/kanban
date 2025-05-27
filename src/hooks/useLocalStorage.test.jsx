import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import useLocalStorage from "./useLocalStorage";
import { renderHook } from "@testing-library/react";
import { act } from "react";

describe("localStorage hook test", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test("initializes with default value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  test("reads existing value from localStorage", () => {
    localStorage.setItem("key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("stored");
  });

  test("updates value and localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "key",
      JSON.stringify("updated")
    );
  });

  test("handles errors gracefully", () => {
    Storage.prototype.getItem.mockImplementation(() => {
      throw new Error("Failed");
    });

    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
    expect(console.error).toHaveBeenCalled();
  });
});
