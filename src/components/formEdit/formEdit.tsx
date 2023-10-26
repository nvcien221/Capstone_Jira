import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAppSelector } from "../../redux/config-store";
import { useFormik } from "formik";
import * as Y from "yup";
import {
  getAllProject,
  getProjectCategory,
  updateProject,
} from "../../services/project.service";
import {
  setListProject,
  setprojectCategoryArr,
} from "../../redux/slice/project.slice";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../redux/slice/drawer.slice";

function FormEdit(props: any) {
  const editorRef: any = useRef(null);
  const log = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const getListProject = async () => {
      const resp = await getProjectCategory();

      const action = setprojectCategoryArr(resp.content);

      dispatch(action);
    };
    getListProject();
  }, []);

  const projectCategoryArr: any[] = useAppSelector((state) => {
    return state.projectSlice.projectCategoryArr;
  });

  const { data } = props;

  const formik: any = useFormik({
    initialValues: {
      id: data.id,
      projectName: data.projectName,
      categoryId: data.categoryId,
      description: data.description,
      creator: data.creator,
    },

    enableReinitialize: true,

    onSubmit: (value) => {
      const updateData: any = {
        id: value.id,
        projectName: value.projectName,
        creator: data.creator,
        description: log(),
        categoryId: value.categoryId.toString(),
      };


      updateProject(updateData,data.id)
        .then(() => {
          (async () => {
            const resp = await getAllProject();
            dispatch(setListProject(resp.content));
          })();
          dispatch(closeDrawer());
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  return (
    <form id="projectEditForm" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="fs-4">Id</p>
            <input
              {...formik.getFieldProps("id")}
              className="form-control fs-4"
              readOnly
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p className="fs-4">Project name</p>
            <input
              name="projectName"
              {...formik.getFieldProps("projectName")}
              className="form-control fs-4"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="fs-4">Category</p>
            <select
              {...formik.getFieldProps("categoryId")}
              className="form-control fs-4"
            >
              {projectCategoryArr.map((category, index) => {
                return (
                  <option key={index} value={category.id}>
                    {category.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group mt-5">
        <p className="fs-4">Description</p>
        <Editor
          id="description"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={data.description}
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
    </form>
  );
}

export default FormEdit;
