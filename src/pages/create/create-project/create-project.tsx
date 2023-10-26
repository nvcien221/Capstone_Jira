import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../redux/config-store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProjectAuthorize,
  getProjectCategory,
} from "../../../services/project.service";
import { setprojectCategoryArr } from "../../../redux/slice/project.slice";
import css from "./create-project.module.scss";



function CreateProject() {
  const editorRef: any = useRef(null);
  const log = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const projectCategoryArr: any[] = useAppSelector((state) => {
    return state.projectSlice.projectCategoryArr;
  });

  useEffect(() => {
    const getListProject = async () => {
      const resp = await getProjectCategory();

      const action = setprojectCategoryArr(resp.content);

      dispatch(action);
    };
    getListProject();
  }, []);

  return (
    <div className="container">
      <h1 className="mb-5">Create project</h1>
      <form
        className="container"
        onSubmit={(event) => {
          event.preventDefault();
          let projectName = (
            document.querySelector("#projectName") as HTMLSelectElement
          ).value;
          let description = log();
          let categoryId = (
            document.querySelector("#categoryId") as HTMLSelectElement
          ).value;

          let data = {
            projectName: projectName,
            description: description,
            categoryId: categoryId,
            alias: "",
          };

          createProjectAuthorize(data)
            .then((resp) => {
              alert("Create project successfully");
              navigate("/home");
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        <div className="form-group mb-3">
          <p className="fs-4">Project name</p>
          <input id="projectName" className="form-control fs-4" />
        </div>
        <div className="form-group mb-3">
          <p className="fs-4">Description</p>
          <Editor
            id="description"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="form-group mb-3">
          <p className="fs-4">Category</p>
          <select id="categoryId" className="form-control fs-4">
            {projectCategoryArr.map((category, index) => {
              return (
                <option key={index} value={category.id}>
                  {category.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-primary fs-4 mt-3">
          Create project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
