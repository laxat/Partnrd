import React, { useState } from "react";
import { useTheme } from "react-jss";
import { slide as Menu } from "react-burger-menu";

const getMenuStyles = ({ theme }) => ({
  bmBurgerButton: {
    position: "absolute",
    width: 20,
    height: 16,
    left: 20,
    top: 26,
    zIndex: 19,
  },
  bmBurgerBars: {
    background: theme.color.grey,
  },
  bmBurgerBarsHover: {
    background: theme.color.grey,
  },
  bmCrossButton: {
    display: "none",
  },
  bmCross: {
    background: theme.color.grayishBlue3,
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    width: 200,
    zIndex: 30,
  },
  bmMenu: {
    background: theme.color.white,
    boxShadow: "1px 0 3px rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 10%)",
  },
  bmItem: {
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
  bmMorphShape: {
    fill: theme.color.veryDarkGrayishBlue,
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    zIndex: 20,
  },
});

function MenuComponent({ children, isMobile }) {
  const theme = useTheme();
  const menuStyles = getMenuStyles({ theme });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      isOpen={!isMobile || isOpen}
      noOverlay={!isMobile}
      disableCloseOnEsc
      styles={menuStyles}
      onStateChange={(state) => setIsOpen(state.isOpen)}
    >
      {children}
    </Menu>
  );
}

export default MenuComponent;
