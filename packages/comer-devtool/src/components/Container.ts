import { Div, styled } from "comer-dom";

export const Container = styled(Div, {
  height: "100vh",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 25%",
  "&, & *": {
    boxSizing: "border-box",
  },
  fontSize: "13px",
  color: "#555",
});
