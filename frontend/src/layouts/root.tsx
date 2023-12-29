import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

const Layout = styled("div")({
  display: "flex",
  minHeight: "100vh",
});

const Main = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.grey["50"],
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: "100%",
  overflow: "hidden",
}));

function RootLayout() {
  return (
    <Layout>
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
}

export default RootLayout;
