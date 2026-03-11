import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@store/authStore";
import Navbar from "@components/Navbar";
import { Box } from "@mui/material";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: "calc(100vh - 64px)" }}>
        <Outlet />
      </Box>
    </>
  );
}

export function GuestRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}