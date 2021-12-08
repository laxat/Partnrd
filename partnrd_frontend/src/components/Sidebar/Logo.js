import React from "react";
import { Row } from "simple-flexbox";
import { createUseStyles } from "react-jss";
import Logo from "../../assets/partnrd_logo.png";


const useStyles = createUseStyles({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },

  logo: {
    borderRadius: 0,
    backgroundColor: "#FFFFFF",
    width: "auto",
    overflow: "hidden",
    marginRight: 10,
    
  }
});

function LogoComponent() {
  const classes = useStyles(); 
  return (
    <Row
      className={classes.container}
      horizontal="center"
      vertical="center"
    >
      <img className={classes.logo}src={Logo} alt="logo"/>
    </Row>
  );
}

export default LogoComponent;
