import { Modal, Button } from "react-bootstrap";
import { useProjectContext } from "../context/ProjectContext";

const ProjectModel = () => {
  const { selectedProject, setSelectedProject } = useProjectContext();

  const handleClose = () => setSelectedProject(null);

  return (
    <Modal show={!!selectedProject} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedProject?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Feature</h5>
        <p>{selectedProject?.feature}</p>
        <h5>Description</h5>
        <p>{selectedProject?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {selectedProject?.githubLink && (
          <Button
            variant="outline-dark"
            href={selectedProject.githubLink}
            target="_blank"
          >
            GitHub
          </Button>
        )}
        {selectedProject?.liveLink && (
          <Button
            variant="dark"
            href={selectedProject.liveLink}
            target="_blank"
          >
            Live Demo
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModel;
