import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as service from "../service";
import useProjectStore from "@store/projectStore";
import ProjectCard from "@modules/projects/components/ProjectCard";
import ProjectFormModal from "@modules/projects/components/ProjectFormModal";
import ConfirmDialog from "@components/ConfirmDialog";
import PageLoader from "@components/PageLoader";
import EmptyState from "@components/EmptyState";
import { extractError } from "@utils/error-wrapper";

export default function ProjectsPage() {
  const { projects, setProjects, addProject, updateProject, removeProject, loading, setLoading } =
    useProjectStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await service.getProjects();
        setProjects(data);
      } catch (e) {
        setError(extractError(e));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [setLoading, setProjects]);

  const handleCreate = async (form) => {
    try {
      const data = await service.createProject(form);
      addProject(data);
    } catch (e) {
      setError(extractError(e));
    }
  };

  const handleEdit = async (form) => {
    try {
      const data = await service.updateProject(editTarget._id, form);
      updateProject(editTarget._id, data);
    } catch (e) {
      setError(extractError(e));
    }
  };

  const handleDelete = async () => {
    try {
      await service.deleteProject(deleteTarget._id);
      removeProject(deleteTarget._id);
      setDeleteTarget(null);
    } catch (e) {
      setError(extractError(e));
    }
  };

  const openEdit = (project) => {
    setEditTarget(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
  };

  if (loading) return <PageLoader />;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          New Project
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      {projects.length === 0 ? (
        <EmptyState message="No projects yet. Create your first project!" />
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <ProjectCard
                project={project}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ProjectFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={editTarget ? handleEdit : handleCreate}
        initialData={editTarget}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? All tasks in this project will also be deleted.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}