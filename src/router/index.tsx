import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import BaseTemplate from "../templates/base/base.template";
import Home from "../pages/home/home";
const CreateProject = lazy(
  () => import("../pages/create/create-project/create-project")
);
const ProjectDetail = lazy(
  () => import("../pages/detail/project-detail/project-detail")
);
const CreateTask = lazy(
  () => import("../pages/create/create-task/create-task")
);
const TaskDetail = lazy(
  () => import("../pages/detail/task-detail/task-detail")
);
const EditProject = lazy(
  () => import("../pages/edit/edit-project/edit-project")
);
const EditTask = lazy(() => import("../pages/edit/edit-task/edit-task"));
const Login = lazy(() => import("../pages/login/login"));
const Register = lazy(() => import("../pages/register/register"));

export const router = createBrowserRouter([
  {
    element: <BaseTemplate />,
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Home />
          </Suspense>
        ),
      },
      { path: "createProject", element: <CreateProject /> },
      { path: "projectDetail/:projectId", element: <ProjectDetail /> },
      { path: "createTask", element: <CreateTask /> },
      { path: "taskDetail/:taskId", element: <TaskDetail /> },
      { path: "editProject/:projectId", element: <EditProject /> },
      { path: "editTask/:taskId", element: <EditTask /> },
    ],
  },
  { index: true, path: "/", element: <Login /> },
  { path: "register", element: <Register /> },
]);
