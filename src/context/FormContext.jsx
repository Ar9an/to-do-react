import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const submitForm = (data) => {
    setFormData(data);
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData(null);
    setSubmitted(false);
  };

  return (
    <FormContext.Provider value={{ formData, submitted, submitForm, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};
