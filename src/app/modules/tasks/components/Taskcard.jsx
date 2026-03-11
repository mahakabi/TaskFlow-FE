import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Chip,
  MenuItem,
  Select,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PRIORITY_COLORS = { Low: "success", Medium: "warning", High: "error" };
const STATUS_COLORS = { "To Do": "default", "In Progress": "info", Done: "success" };

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {task.title}
        </Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{
            mb: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {task.description}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
          <Chip label={task.priority} size="small" color={PRIORITY_COLORS[task.priority]} />
          {task.dueDate && (
            <Chip
              label={new Date(task.dueDate).toLocaleDateString()}
              size="small"
              color={isOverdue ? "error" : "default"}
              variant={isOverdue ? "filled" : "outlined"}
            />
          )}
        </Box>
        <Select
          value={task.status}
          size="small"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          sx={{ minWidth: 130 }}
        >
          {["To Do", "In Progress", "Done"].map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => onEdit(task)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" color="error" onClick={() => onDelete(task)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}