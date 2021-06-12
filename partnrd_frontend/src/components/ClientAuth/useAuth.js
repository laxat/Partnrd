import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

/**
 * User Signup function, uses api to validate user looking to register 
 * and adds them to the database.
 * 
 * @param {*} validate 
 * @returns 
 */
export const useSignup = (validate) =>
{
    const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    });
  
  const type = useState({
    name: ""
  })  
  const [response, setResponse] = useState({
    error: false,
    message: "",
  });

   const [errors, setErrors] = useState({});
    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState({
    state: false,
    message: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setValues({
        ...values,
      [name]:value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = {
      error: false,
      message: errors,
    };
    setResponse(response);
    setErrors(validate(values));

    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const data = values;
      axios
        .post("http://127.0.0.1:8000/api/client_register", data)
        .then((res) => {
          const success = {
            state: true,
            message: "Email Verification email sent",
          };
          setSuccess(success);
        })
        .catch((err) => {
          const error = err.response.data;
          const s = Object.values(error.errors);
          s.join(" ");
          const response = {
            error: true,
            message: s,
          };
          setResponse(response);
          setIsSubmitting(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return {
    handleRegisterChange,
    values,
    handleSubmit,
    errors,
    response,
    success
  };
};

/**
 * User Login logic, uses axios to post data to the server,
 * Validation is performed client side and server side. 
 * Authentication is performed server side and messages are posted
 * to the front-end to display in the application. 
 * @param {*} validate 
 * @returns 
 */

export const useLogin = (validate) =>
{
  const [fields, setValues] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState({
    error: false,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = {
      error: false,
      message: errors,
    };
    setResponse(response);
    setErrors(validate(fields));

    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const data = fields;
      axios
        .post("http://127.0.0.1:8000/api/login", data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.token);
          history.push("/");
        })
        .catch((err) => {
          let errors = "";
          if (err.response.data.errors.email) {
            errors = err.response.data.errors.email;
          } else {
            errors = err.response.data.errors;
          }
          const response = {
            error: true,
            message: errors,
          };
          setResponse(response);
          setIsSubmitting(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return { handleLoginChange, fields, handleSubmit, errors, response };
};


export const useEmail = (validate) => {
  const [fields, setValues] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState({
    error: false,
    message: "",
  });

  const [success, setSuccess] = useState({
    state: false,
    message: "",
  });

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = {
      error: false,
      message: errors,
    };
    setResponse(response);
    setErrors(validate(fields));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const data = fields;
      axios
        .post("http://127.0.0.1:8000/api/password/email", data)
        .then((res) => {
          const success = {
            state: true,
            message: res.message,
          };
          setSuccess(success);
        })
        .catch((err) => {
          let errors;
          if (err.response.data.errors.email) {
            errors = err.response.data.errors.email[0]; 
          }
          else {
            errors = err.response.data.errors;
          }

          const response = {
            error: true,
            message: errors,
          };

          console.log(errors)
          setResponse(response);
          setIsSubmitting(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return {
    handleEmailChange,
    fields,
    handleSubmit,
    errors,
    response,
    success,
  };
};

const getToken = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("token")) {
    return params.get("token");
  }
  return "";
};

const getUserId = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("id")) {
    return params.get("id");
  }
  return "";
};

export const useResetPassword = (validate) => {
  const [fields, setValues] = useState({
    id: getUserId(),
    token: getToken(),
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState({
    error: false,
    message: "",
  });

  const [success, setSuccess] = useState({
    state: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = {
      error: false,
      message: errors,
    };
    setResponse(response);
    setErrors(validate(fields));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const data = fields;
      axios
        .post("http://127.0.0.1:8000/api/password/reset", data)
        .then((res) => {
          const success = {
            state: true,
            message: res.message,
          };
          console.log(success);
          setSuccess(success);
        })
        .catch((err) => {
          let errors = err.response.data.errors;

          const response = {
            error: true,
            message: errors,
          };

          console.log(errors);
          setResponse(response);
          setIsSubmitting(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return {
    handleChange,
    fields,
    handleSubmit,
    errors,
    response,
    success,
  };
};



