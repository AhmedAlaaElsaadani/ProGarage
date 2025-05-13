// import { useTranslation } from "react-i18next";
import style from "./FloatingInput.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingInput({
  //input props
  inputType,
  inputName,
  inputText,
  defaultValue,
  icon,
  //formik props
  onChange,
  error,
  touched,
  //animation props
  disabled,
  animationFlag = true,
  // when be more than one input in the same page
  idx = 0,
}) {
  // const { t, i18n } = useTranslation();
  const [flagDirection, setFlagDirection] = useState(
    true
    // i18n.language === "en"
  );
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   setFlagDirection(i18n.language === "en");
  // }, [i18n.language]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationFlag ? 0.5 : 0,
          delay: animationFlag ? 0.4 + idx * 0.1 : 0,
        }}
        className={"form-floating " + style.floating}
        style={{ maxHeight: "65px", position: "relative" }}
      >
        <input
          dir={flagDirection ? "ltr" : "rtl"}
          type={showPassword ? "text" : inputType}
          className={"form-control mt-1 mb-3 " + style.floatingInput}
          id={inputName}
          name={inputName}
          placeholder={inputText}
          onChange={onChange}
          value={defaultValue}
          disabled={disabled}
          readOnly={disabled}
        />
        <label
          className={style["FloatingLabel"]}
          htmlFor={inputName}
          style={{
            left: flagDirection ? "0px" : "auto",
            right: flagDirection ? "auto" : "0px",
          }}
        >
          <i className={`fa-solid ${icon}`}></i>
          {inputText}
        </label>

        {inputType === "password" && (
          <i
            className={`fa-solid ${style.passwordIcon} ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } `}
            style={{
              right: flagDirection ? "10px" : "auto",
              left: flagDirection ? "auto" : "10px",
              transform: "translateY(-1%)",
            }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        )}
      </motion.div>

      {error && touched && (
        <div className="text-danger text-center">{error}</div>
      )}
    </>
  );
}
