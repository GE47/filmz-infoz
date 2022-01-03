import { useState } from "react";
import { AiOutlineMail, AiOutlineKey } from "react-icons/ai";
import { Formik } from "formik";
import * as yup from "yup";

import FormContainer from "../components/Form/FormContainer";
import FormInput from "../components/Form/FormInput";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const schema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters long")
    .required("Password is required"),
});

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={() => {
        setErrorMessage("Something went wrong");
      }}
    >
      {({ handleSubmit, errors }) => (
        <FormContainer
          onSubmit={handleSubmit as any}
          errorMessage={errorMessage}
          title="Sign In"
          linkPath="/register"
          linkText="Create a new account"
        >
          <FormInput
            leftIcon={<AiOutlineMail color="black" />}
            errorMessage={errors.email}
            placeholder="John@domain.com"
            name="email"
            label="Email"
          />

          <FormInput
            leftIcon={<AiOutlineKey color="black" />}
            errorMessage={errors.password}
            placeholder="Password"
            type="password"
            name="password"
            label="Password"
          />
        </FormContainer>
      )}
    </Formik>
  );
};

export default SignIn;
