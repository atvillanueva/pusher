import { useLocation, Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

import useUserId from "../hooks/use-user-id";

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
  const { pathname } = useLocation();
  const [userId] = useUserId();

  const isRestrictedRoute = /^\/(messages).*/.test(pathname);

  if (isRestrictedRoute && !userId) return <Navigate to="/auth" replace />;
  if (!isRestrictedRoute && userId) return <Navigate to="/" replace />;

  return (
    <Layout>
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
}

export default RootLayout;
