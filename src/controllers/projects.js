// Import the model functions
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

// Define the number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Display the upcoming service projects
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

// Display details for a single service project
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const title = 'Project Details';

    res.render('project', { title, project });
};

// Export the controller functions
export { showProjectsPage, showProjectDetailsPage };