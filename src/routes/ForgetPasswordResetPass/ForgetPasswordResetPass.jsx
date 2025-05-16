import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import style from "./ForgetPasswordResetPass.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import ApiManager from "../../Utilies/ApiManager";
import * as Yup from "yup";
import FloatingInput from "../../Components/Ui/FloatingInput/FloatingInput";
import { motion } from "framer-motion";

export default function ForgetPasswordResetPass() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [responseFlag, setResponseFlag] = useState(false);
  const [resMessage, setResMessage] = useState(null);
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    if (location.state && location.state.token) {
      setToken(location.state.token);
      setEmail(location.state.email);
    } else {
      navigator("/");
    }
  }, []);
  const resetPassword = async (newPassword) => {
    try {
      setResponseFlag(true);
      let { data } = await ApiManager.resetPassword(email, newPassword, token);
      if (data.code == 200) {
        setResMessage({
          flag: true,
          message: "Password has been reset successfully",
        });
        setTimeout(() => {
          navigator("/");
        }, 3000);
      }
    } catch (error) {
      let { data } = error.response;
      if (data.code == 400) {
        // otp has been sent before
        setResMessage({
          flag: false,
          message: t(
            "Please retake the previous steps because the session is off"
          ),
        });
        setResponseFlag(false);
      } else {
        setResMessage({
          flag: false,
          message: "Something went wrong, please try again later",
        });
        setResponseFlag(false);
      }
    }
  };

  const validationSchemaYup = Yup.object({
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")

      .required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const myFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      resetPassword(values.password);
    },
    validationSchema: validationSchemaYup,
  });
  const forgetPasswordResetPassInputs = [
    {
      inputType: "password",
      inputName: "password",
      inputText: "password",
      icon: "fa-lock",
    },
    {
      inputType: "password",
      inputName: "confirmPassword",
      inputText: "confirmPassword",
      icon: "fa-lock",
    },
  ];
  return (
    <section
      className={
        style.ForgetPasswordResetPass +
        " d-flex justify-content-center align-items-center"
      }
    >
      <div
        className={
          "container shadow rounded-4  p-3 my-5 " + style["parentContainer"]
        }
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={style["heading"]}
        >
          {" "}
          <h2 className="text-center py-3">Reset Password</h2>
          <p className="text-center">
            Enter your new password to reset your password
          </p>
        </motion.div>
        <form onSubmit={myFormik.handleSubmit} className="my-5" dir="ltr">
          {forgetPasswordResetPassInputs.map((input, idx) => (
            <FloatingInput
              inputType={input.inputType}
              inputName={input.inputName}
              inputText={input.inputText}
              defaultValue={myFormik.values[input.inputName]}
              icon={input.icon}
              onChange={myFormik.handleChange}
              error={myFormik.errors[input.inputName]}
              touched={myFormik.touched[input.inputName]}
              animationFlag={true}
              disabled={responseFlag}
              idx={idx}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <button
              type="submit"
              className="btn-web btn-web-primary "
              disabled={responseFlag}
            >
              {responseFlag ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "changePassword"
              )}
            </button>

            {resMessage && (
              <div
                className={`my-3 text-center ${
                  resMessage.flag ? "text-success" : "text-danger"
                }`}
              >
                {resMessage.message}
              </div>
            )}
          </motion.div>
        </form>
      </div>
    </section>
  );
}
