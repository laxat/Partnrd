const color = {
  brightBlue: "#3498db",
  darkGrayishBlue: "#8b8d94",
  darkRed: "#a90000",
  lightBlue: "#3751FF",
  lightGrayishBlue: "#F7F8FC", // background color
  lightGrayishBlue2: "#DFE0EB",
  paleBlue: "#DDE2FF",
  paleBlueTransparent: "rgba(221, 226, 255, 0.08)",
  veryDarkGrayishBlue: "#373a47",
  white: "#FFFFFF", 
  black: "#000000",
  grey: "#777777"

};

const typography = {
  cardTitle: {
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: "24px",
    letterSpacing: "0.4px",
  },
  smallSubtitle: {
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.1px",
  },
  link: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.2px",
    color: color.lightBlue,
    textAlign: "right",
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": {
      color: color.grayishBlue,
    },
  },
  itemTitle: {
    fontSize: 16,
    lineHeight: "20px",
    letterSpacing: 0.5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: "30px",
    letterSpacing: 0.3,
  },
};

export default {
  color,
  typography,
};
