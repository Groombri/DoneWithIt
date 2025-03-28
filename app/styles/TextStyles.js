import { StyleSheet } from "react-native";

/**
 * The default layout for a page, where the header takes up 1/8th of the container, and the rest is the body.
 * This therefore applies to all pages except the home page, which has a larger header due to the donation button.
 */
export default StyleSheet.create({
  bodyTitle: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 40,
    color: "black",
  },
  bodyMain: {
    fontFamily: "Poppins",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
  },
  link: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "green",
    marginTop: 30,
  },
  small: {
    fontFamily: "Poppins",
    fontSize: 15,
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 15,
  },
  smallBold: {
    fontFamily: "Poppins",
    fontSize: 15,
    flex: 1,
    flexWrap: "wrap",
    fontWeight: "bold",
  },
});
