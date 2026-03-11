import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Typography,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as taskService from "../../tasks/service";
import * as projectService from "../service";
import useTaskStore from "@store/taskStore";
import TaskCard from "@modules/tasks/components/TaskCard";
import TaskFormModal from "@modules/tasks/components/TaskFormModal";
import TaskFilters from "@modules/tasks/components/TaskFilters";
import ConfirmDialog from "@components/ConfirmDialog";
import PageLoader from "@components/PageLoader";
import EmptyState from "@components/EmptyState";
import { extractError } from "@utils/error-wrapper";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks, addTask, updateTask, removeTask, filters, setFilters, loading, setLoading } =
    useTaskStore();

  const [project, setProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");


  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasksByProject(id, filters);
      setTasks(data);
    } catch (e) {
      setError(extractError(e));
    } finally {
      setLoading(false);
    }
  }, [id, filters, setLoading, setTasks]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (e) {
        setError(extractError(e));
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    fetchTasks();
  }, [id, filters, fetchTasks]);

  const handleCreate = async (form) => {
    try {
      const data = await taskService.createTask(id, form);
      addTask(data);
    } catch (e) {
      setError(extractError(e));
    }
  };

  const handleEdit = async (form) => {
    try {
      const data = await taskService.updateTask(editTarget._id, form);
      updateTask(editTarget._id, data);
    } catch (e) {
      setError(extractError(e));
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      const data = await taskService.updateTask(taskId, { status });
      updateTask(taskId, data);
    } catch (e) {
      setError(extractError(e));
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(deleteTarget._id);
      removeTask(deleteTarget._id);
      setDeleteTarget(null);
    } catch (e) {
      setError(extractError(e));
    }
  };

  const openEdit = (task) => {
    setEditTarget(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
  };

  if (loading && !tasks.length) return <PageLoader />;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Tooltip title="Back to Projects">
          <IconButton onClick={() => navigate("/projects")} size="small">
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" fontWeight={700}>
          {project?.name || "Project"}
        </Typography>
      </Box>
      {project?.description && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {project.description}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <TaskFilters filters={filters} onChange={setFilters} />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          Add Task
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      {tasks.length === 0 ? (
        <EmptyState message="No tasks yet. Add your first task!" />
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <TaskCard
                task={task}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
                onStatusChange={handleStatusChange}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <TaskFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={editTarget ? handleEdit : handleCreate}
        initialData={editTarget}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}