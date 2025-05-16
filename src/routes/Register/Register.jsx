import React, { useContext, useEffect, useState } from "react";
import style from "./Register.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ApiManager from "../../Utilies/ApiManager";
import { authContext } from "../../Contexts/authContext";
import FloatingInput from "../../Components/Ui/FloatingInput/FloatingInput";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import SelectElement from "../../Components/Ui/SelectElement/SelectElement";
export default function Register() {
  const [responseFlag, setResponseFlag] = useState(false);
  const { setToken } = useContext(authContext);
  let navigator = useNavigate();

  const validationSchemaYup = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phone: Yup.string()
      .matches(
        /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
        "Phone number is not valid"
      )
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")

      .required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    birthDate: Yup.date().required("Required"),
    gender: Yup.string().required("Required"),
  });

  // send message to the server
  const registerToWebsite = async (values) => {
    let data = JSON.stringify({
      ...values,
      gender: "M" == values.gender,
    });

    setResponseFlag(true);
    await ApiManager.register(data)
      .then((response) => {
        let res = response.data;

        if (res.code == 200 && res.token) {
          Swal.fire({
            icon: "info",
            title: "You need to verify your email",
            timer: 3000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            setToken(res.token);
            navigator("/EmailConfirmOtp", { state: { token: res.token } });
          }, 3000);
        } else if (res.code == 201) {
          setTimeout(() => {
            navigator("/");
          }, 1000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong, please try again later",
          });
        }

        setResponseFlag(false);
      })
      .catch((error) => {
        setResponseFlag(false);
        let res = error.response?.data;

        if (res?.code && res.code == 400) {
          Swal.fire({
            icon: "error",
            title: res.errors[0],
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
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      gender: "",
    },
    onSubmit: registerToWebsite,
    validationSchema: validationSchemaYup,
  });
  const registerInputs = [
    {
      inputType: "text",
      inputName: "firstName",
      inputText: "firstName",
      icon: "fa-user",
    },
    {
      inputType: "text",
      inputName: "lastName",
      inputText: "lastName",
      icon: "fa-user",
    },
    {
      inputType: "tel",
      inputName: "phone",
      inputText: "phoneNumber",
      icon: "fa-phone",
    },
    {
      inputType: "email",
      inputName: "email",
      inputText: "email",
      icon: "fa-envelope",
    },
  ];

  const registerInputs2 = [
    {
      inputType: "date",
      inputName: "birthDate",
      inputText: "birthday",
      icon: "fa-calendar",
    },
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
  const registerSelect = [
    {
      selectName: "gender",
      selectTransition: "Gender",
      options: [
        {
          key: "Male",
          value: "M",
        },
        {
          key: "Female",
          value: "F",
        },
      ],
      icon: "fa-children",
    },
  ];
  return (
    <section
      className={style.Register + " d-flex align-items-center "}
      id="Register"
    >
      <form onSubmit={myFormik.handleSubmit} className="container">
        <div className="row">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={style["heading"] + " my-5"}
          >
            <h2>
              User <span> Registration</span>
            </h2>
            <p>Please fill in the details below to create your account.</p>
          </motion.div>

          {registerInputs.map((input, idx) => (
            <>
              <div key={idx} className="col-md-6  ">
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
                />{" "}
              </div>
            </>
          ))}
          {registerSelect.map((select, index) => (
            <div key={index} className="col-md-6">
              {
                <SelectElement
                  idx={index}
                  {...select}
                  searchFlag={select.selectName == "countryId"}
                  myFormik={myFormik}
                  icon={select.icon}
                />
              }
            </div>
          ))}
          {registerInputs2.map((input, idx) => (
            <div key={idx} className="col-md-6">
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="col-12"
          >
            <button
              type="submit"
              disabled={responseFlag}
              className="btn-web btn-web-primary"
            >
              {responseFlag ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>

            <p className={"my-3 " + style.haveAccount}>
              Already have an account?
              <Link to={"/Login"}> Login now </Link>
            </p>
          </motion.div>
        </div>
      </form>
    </section>
  );
}
