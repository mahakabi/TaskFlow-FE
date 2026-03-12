import {
  AppBar, Toolbar, Typography, IconButton, Box, Tooltip, Avatar, useMediaQuery, useTheme, Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@store/authStore";
import useThemeStore from "@store/themeStore";
import NavLinkButton from "@components/NavLinkButton";
import ThemeToggleButton from "@components/ThemeToggleButton";

const navLinks = [
  { label: "Dashboard", to: "/", icon: <DashboardIcon fontSize="small" /> },
  { label: "Projects", to: "/projects", icon: <FolderIcon fontSize="small" /> },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { clearAuth, user } = useAuthStore();
  const { mode, toggleMode } = useThemeStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = mode === "dark";

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: isDark ? "rgba(8,13,26,0.90)" : "rgba(255,255,255,0.90)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
      }}
    >
      <Toolbar sx={{ minHeight: "60px !important", px: { xs: 2, sm: 3 }, gap: 1 }}>

        {/* Logo */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex", alignItems: "center", gap: 1,
            mr: { xs: 1, sm: 2 }, cursor: "pointer",
            "&:hover .logo-box": { transform: "rotate(-6deg) scale(1.05)" },
          }}
        >
          <Box
            className="logo-box"
            sx={{
              width: 32, height: 32, borderRadius: "9px",
              background: "linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px", fontWeight: 900, color: "#fff",
              flexShrink: 0, boxShadow: "0 2px 12px rgba(6,182,212,0.35)",
              transition: "transform 0.2s ease",
            }}
          >
            T
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight={800}
            sx={{
              letterSpacing: "-0.04em",
              display: { xs: "none", sm: "block" },
              background: isDark
                ? "linear-gradient(90deg, #e2e8f0, #94a3b8)"
                : "linear-gradient(90deg, #0f172a, #475569)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TaskFlow
          </Typography>
        </Box>

        {/* Divider after logo */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mr: { xs: 0.5, sm: 1.5 },
            borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
            display: { xs: "none", sm: "block" },
          }}
        />

        {/* Nav links */}
        <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
          {navLinks.map((link) => (
            <NavLinkButton
              key={link.to}
              to={link.to}
              label={link.label}
              icon={link.icon}
              isMobile={isMobile}
              isDark={isDark}
            />
          ))}
        </Box>

        {/* Right actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

          <ThemeToggleButton isDark={isDark} onToggle={toggleMode} />

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 0.5,
              borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
            }}
          />

          {/* User name + avatar */}
          {user?.name && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
                <Typography variant="caption" fontWeight={600} sx={{ color: "text.primary", lineHeight: 1, display: "block" }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.7rem" }}>
                  {user.email}
                </Typography>
              </Box>
              <Tooltip title={user.name} arrow>
                <Avatar
                  sx={{
                    width: 32, height: 32, fontSize: "0.8rem", fontWeight: 700,
                    background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                    boxShadow: "0 2px 8px rgba(6,182,212,0.3)",
                    cursor: "default", flexShrink: 0,
                    border: "2px solid",
                    borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.9)",
                  }}
                >
                  {user.name[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            </Box>
          )}

          {/* Logout */}
          <Tooltip title="Logout" arrow>
            <IconButton
              onClick={handleLogout}
              size="small"
              sx={{
                color: "text.secondary",
                width: 34, height: 34,
                borderRadius: "10px",
                transition: "all 0.15s ease",
                "&:hover": { bgcolor: "rgba(239,68,68,0.1)", color: "#ef4444" },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}