import React, { useState, useEffect } from "react";
import axios from "axios";
import { Column, Row } from "simple-flexbox";
import { createUseStyles } from "react-jss";
import CreateButton from "../../components/CreateButton";
import Gravatar from "react-gravatar";
import { FormGroup, Input } from "reactstrap";
import { CircularProgress } from "@material-ui/core";

const useStyles = createUseStyles({
  container: {
    width: "100%",
    maxWidth: "1300px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  avatar: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 50,
    width: 50,
    minWidth: 50,
    borderRadius: 50,
    marginRight: 5,
    border: `1px solid rgb(0 0 0 / 15%)`,
    // "@media (max-width: 768px)": {
    //   marginLeft: 7,
    // },
  },

  name: {
    fontSize: 26,
    textAlign: "right",
    marginRight: 5,
    marginLeft: 5,
  },

  formControl: {
    border: "1px solid #d5dae2",
    padding: "15px 20px",
    marginBottom: "20px",
    minHeight: "15px",
    fontSize: "13px",
    fontWeight: "normal",
    width: 350,
  },

  buttonRow: {
    marginTop: 10,
    "@media (max-width: 768px)": {
      marginTop: 0,
    },
  },
  lastRow: {
    marginTop: 30,
  },

  rowC: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  profile: {
    maxWidth: "800px",
    margin: "auto",
    marginTop: "20px",
  },

  rowLast: {
    display: "block !important",
    width: "100%",
  },
  customRow: {
    display: "grid !important",
    gridTemplateColumns: "80% 20%",
    "@media (max-width: 780px)": {
      display: "block !important",
      gridTemplateColumns: "unset",
    },
  },
  formGroupList: {
    display: "grid !important",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "15px",
    "@media (max-width: 780px)": {
      display: "block !important",
      gridTemplateColumns: "unset",
    },
  },
});

function ProfileSettings() {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const token = sessionStorage.getItem("xrsf");
  const api = `${process.env.REACT_APP_API}/api/user`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getUser = async () => {
    setIsLoading(true);
    await axios
      .get(api, config)
      .then((res) => {
        // console.log(res.data);
        const response = {
          errors: false,
          message: "Profile Successfully Updated",
        };
        setUser(res.data);
        setResponse(response);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(false);
      });
  };

  const putApi = `${process.env.REACT_APP_API}/api/users/${user.id}`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(putApi, values)
      .then((res) => {
        // console.log(res.data);
        setValues({
          password: "",
          new_password: "",
          conf_password: "",
        });
        getUser();
        window.location.reload(false);
      })
      .catch((err) => {
        const error = err.response.data;
        if (error.type === "password") {
          if (error.errors.conf_password) {
            setResponse({
              error: true,
              message: error.errors.conf_password[0],
            });
          }
          if (error.errors.new_password) {
            setResponse({
              error: true,
              message: error.errors.new_password[0],
            });
          }
          if (error.errors.password) {
            setResponse({
              error: true,
              message: error.errors.password[0],
            });
          }
        }
        if (error.type === "email") {
          setResponse({
            error: true,
            message: error.errors,
          });
        } else {
          setResponse({
            error: true,
            message: error.errors,
          });
        }
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setResponse({});
  };

  return !isLoading ? (
    <div className={classes.rowLast}>
      <Row className={classes.customRow}>
        <Column>
          <div className={classes.rowC}>
            <Gravatar
              email={user.email}
              size={100}
              rating="pg"
              default="retro"
              // className="CustomAvatar-image"
              protocol="https://"
              className={classes.avatar}
            />
            <span className={classes.name}>{user.name}</span>
          </div>
        </Column>
        <Column
          className={classes.container}
          vertical="center"
          horizontal="end"
        >
          <CreateButton form="profile-form" label="Update Profile" />
        </Column>
      </Row>
      <Row className={classes.rowLast}>
        <Input type="hidden" value="prayer" />
        <div>
          <form
            id="profile-form"
            className={classes.profile}
            onSubmit={handleSubmit}
          >
            <h2>Update Profile</h2>
            {response.error && <p>{response.message}</p>}
            {!response.error && <p>{response.message}</p>}
            <FormGroup>
              <div className={classes.formGroupList}>
                <div>
                  <label>Full Name</label>
                  <input type="hidden" value="something" />
                  <Input
                    type="text"
                    name="name"
                    autoComplete="off"
                    defaultValue={user.name}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <Input
                    type="email"
                    name="email"
                    autoComplete="user-email"
                    defaultValue={user.email}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <label>Current Password</label>
              <Input
                required
                type="password"
                name="password"
                value={values.password}
                autoComplete="old-password"
                onChange={handleInput}
              />
              <div className={classes.formGroupList}>
                <div>
                  <label>New Password</label>
                  <Input
                    type="password"
                    name="new_password"
                    autoComplete="new-password"
                    value={values.new_password}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label>Repeat Password</label>
                  <Input
                    type="password"
                    name="conf_password"
                    autoComplete="conf-password"
                    value={values.conf_password}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </FormGroup>
          </form>
        </div>
      </Row>
    </div>
  ) : (
      <div horizontal="center">
        <CircularProgress color="inherit"/>
    </div>
  );
}

export default ProfileSettings;
