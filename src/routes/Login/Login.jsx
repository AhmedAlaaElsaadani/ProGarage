import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ApiManager from "../../Utilies/ApiManager";
import { authContext } from "../../Contexts/authContext";
import FloatingInput from "../../Components/Ui/FloatingInput/FloatingInput";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function Login() {
  const [responseFlag, setResponseFlag] = useState(false);
  const { setToken } = useContext(authContext);
  let navigator = useNavigate();

  const validationSchemaYup = Yup.object().shape({
    // validation for email or phone
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")
      .required("Required"),
  });

  // send message to the server
  const loginToWebsite = async (values) => {
    let data = JSON.stringify({
      emailOrPhone: values.email,
      password: values.password,
      remember: values.remember,
    });

    setResponseFlag(true);
    await ApiManager.login(data)
      .then((response) => {
        let res = response.data;
        if (res.success) {
          if (res.isVerified) {
            Swal.fire({
              icon: "success",
              title: "Login successfully",
              timer: 3000,
              showConfirmButton: false,
            });

            setTimeout(() => {
              setToken(res.token);
              navigator("/");
            }, 3000);
          } else {
            Swal.fire({
              icon: "info",
              title: "You need to verify your email",
              timer: 4000,
              showConfirmButton: false,
            });

            setTimeout(() => {
              setToken(res.token);
              navigator("/EmailConfirmOtp", { state: { token: res.token } });
            }, 4000);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong, please try again later",
          });
        }

        setResponseFlag(false);
      })
      .catch((error) => {
        console.error("There was an error sending the message!", error);
        setResponseFlag(false);
        let res = error.response?.data;
        if (res?.code && res.code == 400) {
          Swal.fire({
            icon: "error",
            title: "Invalid email or password",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong, please try again later",
          });
        }
      });
  };

  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: loginToWebsite,
    validationSchema: validationSchemaYup,
  });
  const loginInputs = [
    {
      inputType: "email",
      inputName: "email",
      inputText: "email",
      icon: "fa-user",
    },
    {
      inputType: "password",
      inputName: "password",
      inputText: "password",
      icon: "fa-lock",
    },
  ];

  return (
    <section className={style.Login + " d-flex align-items-center my-3 "} id="Login">
      <form
        onSubmit={myFormik.handleSubmit} // Changed from submitForm to handleSubmit
        className="container d-flex flex-column"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={style["heading"] + " my-5"}
        >
          <h2>
            User <spa>Login</spa>
          </h2>
          Welcome back! Please enter your details.
        </motion.div>

        {loginInputs.map((input, idx) => (
          <div key={idx} className={style["inputContainer"] + " mb-3"}>
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
          </div>
        ))}
        {/* Remember me */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={style["inputContainer"]}
        >
          <div className="form-check mb-3 d-flex align-items-center gap-5">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              name="remember"
              onChange={myFormik.handleChange}
              checked={myFormik.values.remember}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          type="submit"
          disabled={responseFlag}
          className=" object-fit-contain btn-web btn-web-primary"
        >
          <span>
            {responseFlag ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span>
                Login
                <i className="fa-solid fa-right-to-bracket mx-2"></i>
              </span>
            )}
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={"my-3 " + style["login-footer"]}
        >
          don't have an account?{" "}
          <Link to={"/Register"}> create your account </Link>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={style["login-footer"]}
        >
          <Link className="lead " to={"/forget-password-email"}>
            Forget Password?
          </Link>
        </motion.div>
      </form>
    </section>
  );
}
