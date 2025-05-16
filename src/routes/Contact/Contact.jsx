import React, { useState } from "react";
import style from "./Contact.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInput from "../../Components/Ui/FloatingInput/FloatingInput";
import Textarea from "../../Components/Ui/Textarea/Textarea";
import Lottie from "lottie-react";
import contactAnimation from "../../assets/animations/Contact.json";
import ApiManager from "../../Utilies/ApiManager";
import { motion } from "framer-motion";

export default function Contact() {
  const [responseFlag, setResponseFlag] = useState(false);
  const [resMessage, setResMessage] = useState({ flag: false, message: "" });

  // Assuming you have a translation function
  const t = (text) => text; // Replace with your actual translation function if needed

  const validationSchemaYup = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),

    email: Yup.string().email("Invalid email address").required("Required"),

    phonNumber: Yup.string()
      .matches(
        /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
        "Phone number is not valid"
      )
      .required("Required"),

    message: Yup.string()
      .min(10, "Must be 10 characters or more")
      .required("Required"),
  });

  // send message to the server
  const sendMessage = async (values) => {
    let data = JSON.stringify({
      Name: values.name,
      Email: values.email,
      Phone: values.phonNumber,
      Message: values.message,
    });

    setResponseFlag(true);

    // Replace this with your actual API call
    try {
      await ApiManager.contactUs(data);
      // Simulating API call for now
      setTimeout(() => {
        setResMessage({
          flag: true,
          message: "message sent successfully",
        });
        setResponseFlag(false);
      }, 1000);
    } catch (error) {
      console.error("There was an error sending the message!", error);
      setResponseFlag(false);
      setResMessage({
        flag: false,
        message: "Something went wrong, please try again later",
      });
    }
  };

  const myFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phonNumber: "",
      message: "",
    },
    onSubmit: sendMessage,
    validationSchema: validationSchemaYup,
  });
  const contactInputs = [
    {
      inputType: "text",
      inputName: "name",
      inputText: "Your Name",
      icon: "fa-user",
    },
    {
      inputType: "email",
      inputName: "email",
      inputText: "Your Email",
      icon: "fa-envelope",
    },
    {
      inputType: "tel",
      inputName: "phonNumber",
      inputText: "Your Phone Number",
      icon: "fa-phone",
    },
  ];
  const contactDate = [
    {
      icon: <i class="fa-solid fa-phone-volume"></i>,
      text: "+20 11 548 22 78",
    },
    {
      icon: <i class="fa-solid fa-envelope"></i>,
      text: "info@progarage.com",
    },
    {
      icon: <i class="fa-solid fa-location-dot"></i>,
      text: "456 Auto Lane, Cairo, Egypt",
    },
  ];
  return (
    <section id="Contact" className={"container  " + style.contact}>
      <div className="row justify-content-between">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={"col-md-5 " + style.animationSection}
        >
          <div className={style.imageContainer}>
            <Lottie animationData={contactAnimation} className="w-100" />
            {/* Red contact info section - matching the Figma design */}
          </div>
          <div className={style.contactInfoSection}>
            <h3>Contact Us</h3>
            <div className={style.contactDetails}>
              {contactDate.map((item, index) => (
                <div className={style.contactItem} key={index}>
                  <div className={style.icon}>{item.icon}</div>
                  <div className={style.text}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-md-6 d-flex flex-column justify-content-center align-items-center"
          onSubmit={myFormik.handleSubmit}
        >
          <h2 className={style.heading}>We'd Love to Hear From You!</h2>
          {contactInputs.map((input, idx) => {
            return (
              <div className="w-100" key={idx}>
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
            );
          })}
          <div className="w-100">
            <Textarea
              myFormik={myFormik}
              inputName="message"
              inputText="Your Message"
              icon="fa-comment"
              error={myFormik.errors.message}
              touched={myFormik.touched.message}
              onChange={myFormik.handleChange}
              defaultValue={myFormik.values.message}
              disabled={responseFlag}
              idx={contactInputs.length}
            />
          </div>

          <button
            type="submit"
            className="btn-web btn-web-primary"
            disabled={responseFlag}
          >
            {responseFlag ? "Sending..." : "Submit"}
          </button>

          {resMessage.message && (
            <div
              className={`mt-3 ${
                resMessage.flag ? style.successMessage : style.errorMessage
              }`}
            >
              {resMessage.message}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
