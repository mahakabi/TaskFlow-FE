import { Button, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavLinkButton({ to, label, icon, isMobile, isDark }) {
  const hoverBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const activeSx = {
    color: "#06B6D4",
    bgcolor: "rgba(6,182,212,0.1)",
  };

  if (isMobile) {
    return (
      <Tooltip title={label} arrow>
        <IconButton
          component={NavLink}
          to={to}
          size="small"
          sx={{
            color: "text.secondary",
            borderRadius: "10px",
            width: 34, height: 34,
            transition: "all 0.15s ease",
            "&.active": activeSx,
            "&:hover": { bgcolor: hoverBg, color: "text.primary" },
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      component={NavLink}
      to={to}
      startIcon={icon}
      sx={{
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.875rem",
        color: "text.secondary",
        px: 1.5, py: 0.75,
        borderRadius: "10px",
        minWidth: 0,
        transition: "all 0.15s ease",
        "&.active": { ...activeSx, fontWeight: 600 },
        "&:hover": { bgcolor: hoverBg, color: "text.primary" },
      }}
    >
      {label}
    </Button>
  );
}