import { motion } from "framer-motion";
import style from "./Textarea.module.css";

export default function Textarea({
  inputName,
  inputText,
  defaultValue = "",
  icon,
  rows = 6,
  //formik props
  onChange,
  error,
  touched,
  //animation props
  disabled = false,
  animationFlag = true,
  // when be more than one input in the same page
  idx = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationFlag ? 0.5 : 0,
        delay: animationFlag ? 0.4 + idx * 0.1 : 0,
      }}
      className={style.floating}
    >
      <textarea
        id={inputName}
        name={inputName}
        placeholder=" "
        defaultValue={defaultValue}
        onChange={onChange}
        className={style.textarea}
        disabled={disabled}
        rows={rows}
        dir="auto"
      />
      <label
        htmlFor={inputName}
        className={style.floatingLabel}
        style={{
          left: "0px",
          right: "auto",
        }}
      >
        {<i className={`fa-solid ${icon}`}></i>}
        {inputText}
      </label>

      {error && touched && <div className={style.errorText}>{error}</div>}
    </motion.div>
  );
}
