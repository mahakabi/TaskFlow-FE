import {
  AppBar, Toolbar, Typography, IconButton, Box, Button, Tooltip, Avatar,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, NavLink } from "react-router-dom";
import useAuthStore from "@store/authStore";
import useThemeStore from "@store/themeStore";

const navLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Projects", to: "/projects" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { clearAuth, user } = useAuthStore();
  const { mode, toggleMode } = useThemeStore();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: mode === "dark" ? "rgba(8,13,26,0.85)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: "56px !important" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 3 }}>
          <Box
            sx={{
              width: 28, height: 28, borderRadius: "7px",
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: 900, color: "#fff",
            }}
          >
            T
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ letterSpacing: "-0.03em", color: "text.primary" }}
          >
            TaskFlow
          </Typography>
        </Box>

        {/* Nav links */}
        <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.to}
              component={NavLink}
              to={link.to}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                color: "text.secondary",
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                "&.active": {
                  color: "primary.main",
                  bgcolor: "rgba(6,182,212,0.08)",
                  fontWeight: 600,
                },
                "&:hover": { bgcolor: "action.hover", color: "text.primary" },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Actions */}
        <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
          <IconButton onClick={toggleMode} size="small" sx={{ color: "text.secondary" }}>
            {mode === "dark" ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Logout">
          <IconButton onClick={handleLogout} size="small" sx={{ color: "text.secondary" }}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {user?.name && (
          <Avatar
            sx={{
              width: 30, height: 30, fontSize: "0.75rem", fontWeight: 700,
              background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              ml: 0.5,
            }}
          >
            {user.name[0].toUpperCase()}
          </Avatar>
        )}
      </Toolbar>
    </AppBar>
  );
}