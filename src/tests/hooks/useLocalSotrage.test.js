import { renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import useLocalStorage from "../../hooks/useLocalStorage";

describe('useLocalStorage', () => {
  it('debería devolver el valor inicial si no hay nada guardado', () => {
    // ...
     const [value, setValues] = useLocalStorage("value", []);
     const result = renderHook(() => value)
     expect(result.current.value).toBe("")
  })

  it('debería guardar el valor actualizado en localStorage', () => {
    // ...
  })

  it('debería leer el valor ya existente desde localStorage', () => {
    // ...
  })
})
