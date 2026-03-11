import { Box, CircularProgress } from "@mui/material";

export default function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}