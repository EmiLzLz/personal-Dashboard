import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useDebounce from "../../hooks/useDebounce";

beforeEach(() => {
  vi.useFakeTimers(); // Usamos timers falsos
});

afterEach(() => {
  vi.useRealTimers(); // Restauramos timers reales
});

it("debería devolver el valor inicial inmediatamente", () => {
  const { result } = renderHook(() => useDebounce("inicio", 500));

  expect(result.current).toBe("inicio");
});

it("debería actualizar el valor después del delay", () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    {
      initialProps: { value: "a", delay: 300 },
    }
  );

  // Cambiamos el valor
  rerender({ value: "b", delay: 300 });

  // Antes del delay, el valor aún no cambia
  expect(result.current).toBe("a");

  // Avanzamos el tiempo
  act(() => {
    vi.advanceTimersByTime(300);
  });

  // Ahora sí se actualiza
  expect(result.current).toBe("b");
});

it("debería ignorar valores intermedios y solo aplicar el último después del delay", () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    {
      initialProps: { value: "x", delay: 200 },
    }
  );

  // Cambio 1: x → y
  rerender({ value: "y", delay: 200 });

  // Cambio rápido: y → z antes de que pasen los 200ms
  act(() => {
    vi.advanceTimersByTime(100); // Solo 100ms
  });
  rerender({ value: "z", delay: 200 });

  // Avanzamos 200ms más
  act(() => {
    vi.advanceTimersByTime(200);
  });

  // Debe ignorar "y" y aplicar solo "z"
  expect(result.current).toBe("z");
});

