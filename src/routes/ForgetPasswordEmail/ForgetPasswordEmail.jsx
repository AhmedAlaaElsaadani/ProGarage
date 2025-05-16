import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import style from "./ForgetPasswordEmail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import ApiManager from "../../Utilies/ApiManager";
import * as Yup from "yup";
import FloatingInput from "../../Components/Ui/FloatingInput/FloatingInput";
import { motion } from "framer-motion";

export default function ForgetPasswordEmail() {
  const [responseFlag, setResponseFlag] = useState(false);
  const [resMessage, setResMessage] = useState(null);
  const navigator = useNavigate();

  const sendOtpUsingEmail = async (email) => {
    try {
      setResponseFlag(true);
      let { data } = await ApiManager.forgotPasswordSendOtpToEmail(email);
      if (data.code == 200) {
        setResMessage({
          flag: true,
          message: "OTP has been sent successfully",
        });
        setTimeout(() => {
          navigator("/forget-password-otp", {
            state: {
              email: email,
              message: "OTP has been sent successfully",
            },
          });
        }, 2000);
      }
    } catch (error) {
      let { data } = error.response;
      if (data.code == 400) {
        // otp has been sent before
        setResMessage({ flag: false, message: "OTP has been sent before" });
        setResponseFlag(false);

        setTimeout(() => {
          navigator("/forget-password-otp", {
            state: {
              email: email,
              message: "OTP has been sent before",
            },
          });
        }, 2000);
      } else if (data.code == 401) {
        // invalid email
        setResMessage({ flag: false, message: "Invalid email" });
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
    email: Yup.string().email("Invalid email address").required("Required"),
  });
  const myFormik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => {
      sendOtpUsingEmail(values.email);
    },
    validationSchema: validationSchemaYup,
  });
  const forgetInput = [
    {
      inputType: "email",
      inputName: "email",
      inputText: "email",
      icon: "fa-envelope",
    },
  ];
  return (
    <section
      className={
        style.ForgetPasswordEmail +
        " d-flex justify-content-center align-items-center my-5 "
      }
    >
      <div
        className={
          "container shadow rounded-4  p-3 my-5 " + style["parentContainer"]
        }
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={style["heading"]}
        >
          {" "}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-3"
          >
            Reset Password
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            Enter your email to receive a verification code
          </motion.p>
        </motion.div>
        <form onSubmit={myFormik.handleSubmit} className="my-5" dir="ltr">
          {forgetInput.map((input, idx) => (
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
              className="btn-web btn-web-outline-primary "
              disabled={responseFlag}
            >
              {responseFlag ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Submit OTP"
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
