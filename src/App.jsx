import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ProtectedRoute, GuestRoute } from "@core/router";
import useThemeStore from "@store/themeStore";

import LoginForm from "@modules/auth/components/LoginForm";
import RegisterForm from "@modules/auth/components/RegisterForm";
import DashboardPage from "@modules/dashboard/pages/DashboardPage";
import ProjectsPage from "@modules/projects/pages/ProjectsPage";
import ProjectDetailPage from "@modules/projects/pages/ProjectDetailPage";

export default function App() {
  const mode = useThemeStore((s) => s.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#06B6D4" },
          secondary: { main: "#8B5CF6" },
          error: { main: "#F43F5E" },
          warning: { main: "#F59E0B" },
          success: { main: "#10B981" },
          ...(mode === "dark"
            ? {
                background: { default: "#080D1A", paper: "#0F1629" },
                text: { primary: "#F1F5F9", secondary: "#64748B" },
                divider: "rgba(148,163,184,0.07)",
              }
            : {
                background: { default: "#EEF2FF", paper: "#FFFFFF" },
                text: { primary: "#0F172A", secondary: "#475569" },
                divider: "rgba(15,23,42,0.07)",
              }),
        },
        typography: {
          fontFamily: "'DM Sans', sans-serif",
          h5: { fontWeight: 700, letterSpacing: "-0.02em" },
          h6: { fontWeight: 700, letterSpacing: "-0.01em" },
          subtitle1: { fontWeight: 600 },
          button: { fontWeight: 600, letterSpacing: "0.01em" },
        },
        shape: { borderRadius: 10 },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { textTransform: "none", borderRadius: 8, fontWeight: 600 },
              containedPrimary: {
                background: "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)",
                boxShadow: "0 0 20px rgba(6,182,212,0.25)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)",
                  boxShadow: "0 0 32px rgba(6,182,212,0.4)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundImage: "none",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: mode === "dark"
                  ? "0 4px 24px rgba(0,0,0,0.5)"
                  : "0 2px 16px rgba(15,23,42,0.06)",
              }),
            },
          },
          MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
          MuiAppBar: { styleOverrides: { root: { backgroundImage: "none", boxShadow: "none" } } },
          MuiOutlinedInput: {
            styleOverrides: {
              root: ({ theme }) => ({
                borderRadius: 8,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.divider },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#06B6D4" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#06B6D4", borderWidth: 2 },
              }),
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: ({ theme }) => ({
                backgroundImage: "none",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              }),
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.05em" },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Route>
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </ThemeProvider>
  );
}