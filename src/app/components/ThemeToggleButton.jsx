import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggleButton({ isDark, onToggle }) {
  return (
    <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`} arrow>
      <IconButton
        onClick={onToggle}
        size="small"
        sx={{
          color: "text.secondary",
          width: 34, height: 34,
          borderRadius: "10px",
          bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
          transition: "all 0.15s ease",
          "&:hover": {
            bgcolor: isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",
            color: "text.primary",
          },
        }}
      >
        {isDark ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}