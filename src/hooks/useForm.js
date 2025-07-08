import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(
    initialValues || {
      name: "",
      email: "",
      job: "",
    }
  );
  const [errors, setErrors] = useState({});

  //funcion para validar un campo en especifico
  const validateField = (name, value) => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return "An email is required";
      //test revisa si en el string existe algun patron, en este caso de la regex
      if (!emailRegex.test(value)) return "Invalid email";
    }
    if (name === "name") {
      if (!value) return "A name is required";
    }
    if (name === "job") {
      if (!value) return "A job is required";
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

export default useForm;
