import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Column, Row } from "simple-flexbox";
import HeaderComponent from "../components/Header/HeaderComponent";
import PrivatePages from "./PrivatePages";
import SidebarContext from "../components/Sidebar/SidebarContext";
import SidebarComponent from "../components/Sidebar/Sidebar";

const useStyles = createUseStyles({
  container: {
    height: "100vh",
  },
  mainBlock: {
    marginLeft: 200,
    "@media (max-width: 1080px)": {
      marginLeft: 10,
    },
    color: "#00000",
  },
  contentBlock: {
    padding: "110px 40px 80px 40px",
    maxWidth: "1300px",
    width: "100%",
    margin: "0 auto 0 auto",
  },
});

function PrivateSection() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <SidebarContext>
      <Row className={classes.container}>
        <SidebarComponent />
        <Column flexGrow={1} className={classes.mainBlock}>
          <HeaderComponent />
          <div className={[classes.contentBlock, "contentArea"].join(" ")}>
            <PrivatePages />
          </div>
        </Column>
      </Row>
    </SidebarContext>
  );
}

export default PrivateSection;
