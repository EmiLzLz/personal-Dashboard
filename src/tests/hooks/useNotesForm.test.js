import { renderHook, act } from "@testing-library/react";
import useNotesForm from "../../hooks/useNotesForm";

describe("useNotesForm", () => {
  it("debería tener valores y errores iniciales vacíos", () => {
    const { result } = renderHook(() => useNotesForm());

    expect(result.current.values).toEqual({
      title: "",
      description: "",
      priority: "",
    });

    expect(result.current.errors).toEqual({});
  });

  it("debería actualizar valores y limpiar errores al escribir", () => {
    const { result } = renderHook(() => useNotesForm());

    // Simular que hay un error previo
    act(() => {
      result.current.handleChange({
        target: { name: "title", value: "" },
      });
    });

    // Simular escritura válida que limpia el error
    act(() => {
      result.current.handleChange({
        target: { name: "title", value: "Tarea importante" },
      });
    });

    expect(result.current.values.title).toBe("Tarea importante");
    expect(result.current.errors.title).toBeUndefined(); // no hay error
  });

  it("debería detectar errores si los campos están vacíos al enviar", () => {
    const { result } = renderHook(() => useNotesForm());

    let validationErrors;
    act(() => {
      validationErrors = result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(validationErrors).toEqual({
      title: "A name is required",
      description: "A job is required",
      priority: "Priority is required",
    });

    expect(result.current.errors.title).toBe("A name is required");
    expect(result.current.errors.description).toBe("A job is required");
    expect(result.current.errors.priority).toBe("Priority is required");
  });
});
