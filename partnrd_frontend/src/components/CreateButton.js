import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  createButton: {
    alignItems: "center",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "12px 25px",
    display: "flex",
    fontWeight: "bold",
    borderRadius: "3px",
  },

  buttonContainer: {
    position: "relative",
    alignItems: "center",
  },
});

function CreateButton({ type, label, form, onClick }) {
  const classes = useStyles();

  return (
    <button type={type} form={form} className={classes.createButton} onClick={onClick}>
      {label}
    </button>
  );
}

export default CreateButton;
