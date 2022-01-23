import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMail, AiOutlineKey } from "react-icons/ai";
import { Formik } from "formik";
import * as yup from "yup";

import FormContainer from "../components/Form/FormContainer";
import FormInput from "../components/Form/FormInput";
import { selectUserMessage, singInWithEmail } from "../store/user/userSlice";
import { auth } from "../firebase";

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
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectUserMessage);
  const naviagte = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      naviagte("/");
    }
  }, [naviagte]);

  const handleSignIn = ({ email, password }: FormValues) => {
    dispatch(singInWithEmail({ email, password }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={(value) => {
        handleSignIn(value);
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
