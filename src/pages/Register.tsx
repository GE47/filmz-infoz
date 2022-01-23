import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineKey } from "react-icons/ai";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import FormContainer from "../components/Form/FormContainer";
import FormInput from "../components/Form/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { registerWithEmail, selectUserMessage } from "../store/user/userSlice";
import { auth } from "../firebase";

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
  const errorMessage = useSelector(selectUserMessage);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (auth.currentUser) {
      naviagte("/");
    }
  }, [naviagte]);

  const handleRegister = (values: FormValues) => {
    dispatch(registerWithEmail(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={handleRegister}
    >
      {({ handleSubmit, errors }) => (
        <FormContainer
          onSubmit={handleSubmit as any}
          errorMessage={errorMessage}
          title={t("Register")}
          linkPath="/signin"
          linkText={t("Sign in with an existing account")}
        >
          <FormInput
            leftIcon={<AiOutlineMail color="black" />}
            errorMessage={errors.email}
            placeholder="John@domain.com"
            name="email"
            label={t("Email")}
          />

          <FormInput
            leftIcon={<AiOutlineKey color="black" />}
            errorMessage={errors.password}
            name="password"
            type="password"
            label={t("Password")}
          />
          <FormInput
            leftIcon={<AiOutlineKey color="black" />}
            errorMessage={errors.confirmPassword}
            name="confirmPassword"
            type="password"
            label={t("Confirm Password")}
          />
        </FormContainer>
      )}
    </Formik>
  );
};

export default Register;
