import { renderHook } from "@testing-library/react";
import { vi, beforeAll, afterEach, describe, it, expect } from "vitest";

// Mock global para matchMedia (se aplica para todos los tests)
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
});

afterEach(() => {
  // Limpia cualquier mock para evitar contaminación entre tests
  vi.resetModules();
});

describe("useTheme", () => {
  it("resuelve 'dark' cuando el usuario lo elige explícitamente", async () => {
    vi.doMock("../../hooks/useLocalStorage", async () => {
      const mod = await import("../mocks/useLocalStorage-dark.js");
      return mod;
    });

    const { default: useTheme } = await import("../../hooks/useTheme");

    const { result } = renderHook(() => useTheme());
    const [theme] = result.current;

    expect(theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("resuelve 'light' cuando el usuario lo elige explícitamente", async () => {
    vi.doMock("../../hooks/useLocalStorage", async () => {
      const mod = await import("../mocks/useLocalStorage-light.js");
      return mod;
    });

    const { default: useTheme } = await import("../../hooks/useTheme");

    const { result } = renderHook(() => useTheme());
    const [theme] = result.current;

    expect(theme).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("resuelve 'auto' con preferencia oscura del sistema", async () => {
    vi.doMock("../../hooks/useLocalStorage", async () => {
      const mod = await import("../mocks/useLocalStorage-auto.js");
      return mod;
    });

    const { default: useTheme } = await import("../../hooks/useTheme");

    const { result } = renderHook(() => useTheme());
    const [theme] = result.current;

    expect(theme).toBe("auto");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
