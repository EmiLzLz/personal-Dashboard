import { renderHook, act } from "@testing-library/react";
import useForm from "../../hooks/useForm";

describe("useForm", () => {
  it("debería iniciar con los valores iniciales", () => {
    const initialValues = { name: "Juan", email: "juan@mail.com", job: "Dev" };
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });

  it("debería actualizar los valores al cambiar un input", () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Emiliano" },
      });
    });

    expect(result.current.values.name).toBe("Emiliano");
    expect(result.current.errors.name).toBeUndefined(); // Si antes había un error, se limpia
  });

  it("debería validar y retornar errores al enviar si hay campos vacíos", () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(result.current.errors).toEqual({
      name: "A name is required",
      email: "An email is required",
      job: "A job is required",
    });
  });

  it("debería detectar email inválido", () => {
    const { result } = renderHook(() =>
      useForm({ name: "Juan", email: "correo-no-valido", job: "Dev" })
    );

    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(result.current.errors.email).toBe("Invalid email");
  });
});
