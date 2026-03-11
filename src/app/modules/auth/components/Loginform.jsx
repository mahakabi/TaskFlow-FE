import { useState } from "react";
import {
  Box, TextField, Button, Typography, Alert, CircularProgress, Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as service from "../service";
import useAuthStore from "@store/authStore";
import useThemeStore from "@store/themeStore";
import { extractError, extractValidationErrors } from "@utils/error-wrapper";
import { validateLogin } from "../validators";

export default function LoginForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const mode = useThemeStore((s) => s.mode);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    const errs = validateLogin(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setServerError("");
    try {
      const data = await service.login(form);
      setAuth(data.user, data.token);
      navigate("/");
    } catch (error) {
      setServerError(extractError(error));
      setErrors(extractValidationErrors(error));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box sx={{
        position: "absolute", top: "-20%", right: "-10%",
        width: 500, height: 500, borderRadius: "50%",
        background: mode === "dark"
          ? "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", bottom: "-10%", left: "-5%",
        width: 350, height: 350, borderRadius: "50%",
        background: mode === "dark"
          ? "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Box
        sx={{
          m: "auto",
          width: "100%",
          maxWidth: 400,
          px: 3,
          py: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: "9px",
            background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: 900, color: "#fff",
          }}>
            T
          </Box>
          <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: "-0.03em", color: "text.primary" }}>
            TaskFlow
          </Typography>
        </Box>

        <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: "-0.03em", color: "text.primary", mb: 0.75 }}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Sign in to continue to your workspace
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{serverError}</Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            autoComplete="email"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            autoComplete="current-password"
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            sx={{ py: 1.5, mt: 0.5 }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Sign in"}
          </Button>
        </Box>

        <Typography variant="body2" mt={3} textAlign="center" color="text.secondary">
          No account?{" "}
          <Link component={RouterLink} to="/register" sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
            Create one
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}