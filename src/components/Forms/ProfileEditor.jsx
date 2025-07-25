import React from "react";
import useForm from "../../hooks/useForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import InputField from "./InputField";
import { toast } from "sonner";

const DEFAULT_USER = {
  name: "",
  email: "",
  job: "",
};

function ProfileEditor() {
  const [storedUser, setStoredUser] = useLocalStorage("Users", DEFAULT_USER);
  const { values, errors, handleChange, handleSubmit } = useForm(storedUser);

  const handleFormSubmit = (e) => {
    const validationErrors = handleSubmit(e);
    if (Object.keys(validationErrors).length === 0) {
      toast("Saving user data...");
      setStoredUser(values);
      toast.success("Data saved successfully", {
        style: { background: "#09814A", color: "white" },
      });
    }
    else{
      toast.error("Something went wrong. Please, check your info", {
        style: { background: "#EE4266", color: "white" },
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-element-light dark:bg-element-dark backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden drop-shadow-lg">
          {/* Header del formulario */}
          <div className=" backdrop-blur-sm px-8 py-10">
            <h1 className="text-3xl font-bold text-text-dark dark:text-text-light text-center mb-2">
              User Information
            </h1>
            <p className="text-text-dark dark:text-text-light text-center text-lg">
              Please complete your personal details
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleFormSubmit} className="px-8 py-10 ">
            <div className="space-y-8">
              {/* Información Personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h2 className="text-lg font-semibold text-text-dark dark:text-text-light mb-4 border-b border-gray-200 pb-2">
                    Personal Information
                  </h2>
                </div>

                <InputField
                  id="name"
                  name="name"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="example@email.com"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              {/* Información Profesional */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-text-dark dark:text-text-light mb-4 border-b border-gray-200 pb-2">
                  Professional Information
                </h2>

                <InputField
                  id="job"
                  name="job"
                  label="Job Title"
                  placeholder="e.g., Software Developer, Designer, etc."
                  value={values.job}
                  onChange={handleChange}
                  error={errors.job}
                />
              </div>

              {/* Botón Submit */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full bg-[#56E39F] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#4BC08A] focus:ring-2 focus:ring-[#56E39F] focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Save Information
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer del formulario */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-dark dark:text-text-light">
            Your data is protected and secure
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditor;
