import React, { useState, useEffect } from "react";
import axios from "axios";
import { string } from "prop-types";
import { Row } from "simple-flexbox";
import { useHistory } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import DropdownComponent from "../Dropdown/DropdownComponent";
import SLUGS from "../../resources/slugs";
import { convertSlugUrl } from "../../resources/utils";
import Gravatar from "react-gravatar";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = createUseStyles((theme) => ({
  avatar: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 35,
    width: 35,
    minWidth: 35,
    borderRadius: 50,
    marginRight: 10,
    border: `1px solid rgb(0 0 0 / 15%)`,
    "@media (max-width: 768px)": {
      marginLeft: 7,
    },
  },
  container: {
    height: 70,
    backgroundColor: "#FFFFFF",
    width: "100vw",
    position: "absolute",
    top: 0,
    right: 0,
    boxShadow: "0 1px 0 rgb(0 0 0 / 15%)",
  },
  name: {
    ...theme.typography.itemTitle,
    textAlign: "right",
    "@media (max-width: 768px)": {
      display: "none",
    },
    marginRight: 10,
  },
  icon: {
    ...theme.typography.itemTitle,
    textAlign: "right",
    "@media (max-width: 768px)": {
      display: "none",
    },
    marginRight: 32,
    color: "rgb(0 0 0 / 30%)",
  },
  title: {
    ...theme.typography.title,
    "@media (max-width: 1080px)": {
      marginLeft: 70,
    },
    "@media (max-width: 468px)": {
      fontSize: 20,
    },
    paddingLeft: 40,
  },
  iconStyles: {
    cursor: "pointer",
    marginLeft: 25,
    "@media (max-width: 768px)": {
      marginLeft: 12,
    },
  },
}));

function HeaderComponent() {
  const theme = useTheme();
  const { push } = useHistory();
  const classes = useStyles({ theme });
  const [user, setUser] = useState([]);

  function onClick(slug, parameters = {}) {
    push(convertSlugUrl(slug, parameters));
  }

  const token = sessionStorage.getItem("xrsf");
  const api = process.env.REACT_APP_API + `/api/user`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    await axios
      .get(api, config)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  async function logout() {
    sessionStorage.clear();
    localStorage.clear();
    onClick(SLUGS.login);
  }
  return (
    <Row
      className={classes.container}
      vertical="center"
      horizontal="space-between"
    >
      <span className={classes.title}></span>
      <Row vertical="center">
        <DropdownComponent
          label={
            <>
              <Gravatar
                email={user.email}
                size={100}
                rating="pg"
                default="retro"
                // className="CustomAvatar-image"
                style={{ margin: "10px" }}
                protocol="https://"
                className={classes.avatar}
              />
              <span className={classes.name}>{user.name}</span>
              <span className={classes.icon}>
                <KeyboardArrowDownIcon />
              </span>
            </>
          }
          options={[
            {
              label: "Edit Profile",
              onClick: () => onClick(SLUGS.profileSettings),
            },

            {
              label: "Logout",
              onClick: () => logout(),
            },
          ]}
          position={{
            top: 52,
            right: 20,
          }}
        />
      </Row>
    </Row>
  );
}

HeaderComponent.propTypes = {
  title: string,
};

export default HeaderComponent;
