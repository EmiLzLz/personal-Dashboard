import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import useLocalStorage from "../../hooks/useLocalStorage";
import { act } from "react";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("debería devolver el valor inicial si no hay nada guardado", () => {
    // ...
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "valorInicial")
    );
    expect(result.current[0]).toBe("valorInicial");
  });

  it("debería guardar el valor actualizado en localStorage", () => {
    // ...
    // Simulamos su uso en un componente
    const { result } = renderHook(() => useLocalStorage("testKey", []));

    //Usamos `act` para simular un cambio de estado (como lo haría React internamente)
    // Llamamos a la función setValues (result.current[1]) y le pasamos un nuevo valor
    act(() => {
      result.current[1](["newValue"]);
    });
    //Verificamos que el valor se haya actualizado correctamente
    // Aquí esperamos que el primer valor del array (result.current[0]) sea ["newValue"]
    expect(result.current[0]).toEqual(["newValue"]);
  });

  it("debería leer el valor ya existente desde localStorage", () => {
    // ...
    localStorage.setItem("testKey", JSON.stringify(["savedValue"]));

    const { result } = renderHook(() => useLocalStorage("testKey", []));

    expect(result.current[0]).toEqual(["savedValue"]);
  });
});
