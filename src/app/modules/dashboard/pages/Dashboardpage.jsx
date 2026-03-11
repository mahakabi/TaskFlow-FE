import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import * as service from "../service";
import PageLoader from "@components/PageLoader";
import { extractError } from "@utils/error-wrapper";

function StatCard({ icon, label, value, color }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ color: `${color}.main`, display: "flex" }}>{icon}</Box>
          <Box>
            <Typography variant="h4" fontWeight={700}>{value}</Typography>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await service.getDashboard();
        setStats(data);
      } catch (e) {
        setError(extractError(e));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Dashboard</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {stats && (
        <>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={4}>
              <StatCard
                icon={<AssignmentIcon sx={{ fontSize: 36 }} />}
                label="Total Tasks"
                value={stats.totalTasks ?? 0}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                icon={<CheckCircleIcon sx={{ fontSize: 36 }} />}
                label="Completed"
                value={stats.completedTasks ?? 0}
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                icon={<WarningAmberIcon sx={{ fontSize: 36 }} />}
                label="Overdue"
                value={stats.overdueTasks ?? 0}
                color="error"
              />
            </Grid>
          </Grid>

          {stats.overdueList?.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Overdue Tasks
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {stats.overdueList.map((task) => (
                    <Box
                      key={task._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: "action.hover",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{task.title}</Typography>
                        {task.project?.name && (
                          <Typography variant="caption" color="text.secondary">
                            {task.project.name}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Chip label={task.priority} size="small" color="error" />
                        <Typography variant="caption" color="error">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Box>
  );
}