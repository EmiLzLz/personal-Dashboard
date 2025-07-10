import { useState } from "react";

function useNotesForm() {
  const [values, setValues] = useState({ title: "", description: "", priority: "" });
  const [errors, setErrors] = useState({});

  //funcion para validar un campo en especifico
  const validateField = (name, value) => {
    if (name === "title") {
      if (!value) return "A name is required";
    }
    if (name === "description") {
      if (!value) return "A job is required";
    }
    if (name === "priority") {
    if (!value) return "Priority is required";
  }
    return null;
  };

  //funcion para validar todos los campos
  const validateAllFields = () => {
    const newErrors = {};

    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateAllFields();
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    setValues(newValues);
  };

  return { values, errors, handleChange, handleSubmit };
}

export default useNotesForm;
