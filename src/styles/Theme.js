const colors = {
  white: "#FFFFFF",
  container: "#EEEEEE",
  gray_01: "#DDDDDD",
  gray_02: "#CCCCCC",
  gray_03: "#BBBBBB",
  black: "#000000",
  main: "#62B6B7",
  main_hover: "#439A97",
  menu: "#331708",
  mains: "#5CB85C",
  content: "#999",
  title: "#373A3C",
  tag: "#818A91",
};
const sizes = {
  desktop: "1440px",
  laptop: "1280px",
  tablet: "1024px",
  mobile: "768px",
  height: "600px",
  phone: "480px",
  small: "360px",
};

const media = {
  desktop: `screen and (max-width: ${sizes.desktop})`,
  laptop: `screen and (max-width : ${sizes.laptop})`,
  tablet: `screen and (max-width : ${sizes.tablet})`,
  mobile: `screen and (max-width : ${sizes.mobile})`,
  height: `screen and (max-width : ${sizes.height})`,
  phone: `screen and (max-width : ${sizes.phone})`,
  small: `screen and (max-width : ${sizes.small})`,
};
const theme = {
  colors,
  media,
};

export default theme;
