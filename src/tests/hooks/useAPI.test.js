import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useApi from "../../hooks/useAPI";

// Limpia mocks antes de cada prueba
beforeEach(() => {
  vi.restoreAllMocks();
});

describe("useApi", () => {
  it("debería obtener datos correctamente desde la API", async () => {
    const fakeData = [{ id: 1, name: "Test" }];

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(fakeData),
        })
      )
    );

    const { result } = renderHook(() =>
      useApi("https://api.example.com/success")
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(fakeData);
    expect(result.current.error).toBe(null);
  });

  it("debería manejar respuestas con error HTTP (como 500)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      )
    );

    const { result } = renderHook(() =>
      useApi("https://api.example.com/server-error")
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("HTTP error: 500");
  });

  it("debería manejar errores de red (como caídas o mal formato)", async () => {
    // Simulamos que fetch falla con un error de red
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error")))
    );

    const { result } = renderHook(() => useApi("https://api.example.com/fail"));

    // Esperamos a que el estado de 'loading' cambie a false
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });
});
