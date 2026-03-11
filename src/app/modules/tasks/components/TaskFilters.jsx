import { Box, MenuItem, TextField } from "@mui/material";

const STATUS_OPTIONS = ["", "To Do", "In Progress", "Done"];
const PRIORITY_OPTIONS = ["", "Low", "Medium", "High"];

export default function TaskFilters({ filters, onChange }) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        select
        label="Status"
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value })}
        size="small"
        sx={{ minWidth: 140 }}
      >
        {STATUS_OPTIONS.map((s) => (
          <MenuItem key={s} value={s}>{s || "All Statuses"}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Priority"
        value={filters.priority}
        onChange={(e) => onChange({ priority: e.target.value })}
        size="small"
        sx={{ minWidth: 140 }}
      >
        {PRIORITY_OPTIONS.map((p) => (
          <MenuItem key={p} value={p}>{p || "All Priorities"}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
}