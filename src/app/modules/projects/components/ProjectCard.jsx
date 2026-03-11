import { Card, CardContent, CardActions, Typography, IconButton, Tooltip, Box, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%", display: "flex", flexDirection: "column",
        cursor: "pointer", position: "relative", overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 32px rgba(6,182,212,0.12)",
          borderColor: "rgba(6,182,212,0.3)",
        },
      }}
      onClick={() => navigate(`/projects/${project._id}`)}
    >
      {/* Accent line */}
      <Box sx={{
        height: 3, width: "100%",
        background: "linear-gradient(90deg, #06B6D4, #8B5CF6)",
      }} />

      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom noWrap sx={{ letterSpacing: "-0.01em" }}>
          {project.name}
        </Typography>
        {project.description ? (
          <Typography variant="body2" color="text.secondary" sx={{
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden", mb: 2, lineHeight: 1.5,
          }}>
            {project.description}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.disabled" sx={{ mb: 2, fontStyle: "italic" }}>
            No description
          </Typography>
        )}
        <Chip
          label={new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          size="small"
          variant="outlined"
          sx={{ fontSize: "0.68rem", borderColor: "divider" }}
        />
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: "space-between" }} onClick={(e) => e.stopPropagation()}>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="Edit project">
            <IconButton size="small" onClick={() => onEdit(project)} sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}>
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete project">
            <IconButton size="small" onClick={() => onDelete(project)} sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}>
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "primary.main" }}>
          <Typography variant="caption" fontWeight={600}>Open</Typography>
          <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </Box>
      </CardActions>
    </Card>
  );
}