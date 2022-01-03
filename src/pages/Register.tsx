import { useState } from "react";
import { AiOutlineMail, AiOutlineKey } from "react-icons/ai";
import { Formik } from "formik";
import * as yup from "yup";

import FormContainer from "../components/Form/FormContainer";
import FormInput from "../components/Form/FormInput";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const schema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please confirm password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={() => {
        setErrorMessage("Done");
      }}
    >
      {({ handleSubmit, errors }) => (
        <FormContainer
          onSubmit={handleSubmit as any}
          errorMessage={errorMessage}
          title="Register"
          linkPath="/signin"
          linkText="Sign in with an existing account"
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
            name="password"
            type="password"
            label="Password"
          />
          <FormInput
            leftIcon={<AiOutlineKey color="black" />}
            errorMessage={errors.confirmPassword}
            name="confirmPassword"
            type="password"
            label="Confirm Password"
          />
        </FormContainer>
      )}
    </Formik>
  );
};

export default Register;
