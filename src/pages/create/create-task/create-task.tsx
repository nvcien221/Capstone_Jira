import React, { useRef, useEffect, useState } from "react";
import css from "./create-task.module.scss";
import type { SelectProps } from "antd";
import { Select, Space, Slider } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import * as Y from "yup";
import { useAppSelector } from "../../../redux/config-store";
import { getAllProject } from "../../../services/project.service";
import { useDispatch } from "react-redux";
import { setListProject } from "../../../redux/slice/project.slice";

interface Creator {
  id: number;
  name: string;
}

interface Members {
  userId: number;
  name: string;
  avatar: string;
}

interface DataType {
  id: number;
  projectName: string;
  categoryName: string;
  creator: Creator;
  members: Members[];
  deleted: boolean;
  categoryId: number;
  alias: string;
  description: any;
}

const assignessOptions: SelectProps["options"] = [];
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

for (let i = 10; i < 36; i++) {
  assignessOptions.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

function CreateTask() {
  const [value, setValue] = useState("");
  const editorRef: any = useRef(null);
  const log = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };
  const dispatch = useDispatch();

  const projectArr: DataType[] = useAppSelector((state) => {
    return state.projectSlice.listProject;
  });

  useEffect(() => {
    const getListProject = async () => {
      const resp = await getAllProject();

      const action = setListProject(resp.content);

      dispatch(action);
    };
    getListProject();
  }, []);

  

  // const formik: any = useFormik({
  //   initialValues: {
  //
  //   },

  //   enableReinitialize: true,

  //   onSubmit: (value) => {
  //     const taskData: any = {
  //
  //     };

  //
  //
  // });

  return (
    <div>
      <h1>Create Task</h1>
      <form>
        <div className="row mt-3">
          <div className="col-6">
            <div className="form-group">
              <p className="fs-4">Project</p>
              <select className="form-control fs-4">
              {projectArr?.map((project: any, index: any) => {
                  return (
                    <option key={index} value={project.id}>
                      {project.projectName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="fs-4">Task name</p>
              <input type="text" className="form-control fs-4" />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <div className="form-group">
              <p className="fs-4">Status</p>
              <select className="form-control fs-4">
                
              </select>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <p className="fs-4">Priority</p>
              <select className="form-control fs-4"></select>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <p className="fs-4">Task type</p>
              <select className="form-control fs-4"></select>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <div className="form-group">
              <p className="fs-4">Assignees</p>
              <Space style={{ width: "100%" }} direction="vertical">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={["a10", "c12"]}
                  options={assignessOptions}
                  onSearch={()=>{}}
                  onChange={()=>{}}
                  onSelect={()=>{}}
                />
              </Space>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p style={{ fontWeight: "bold" }} className="fs-4">
                TIME TRACKING
              </p>
              <Slider defaultValue={30} tooltip={{ open: true }} />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <div className="form-group">
              <p className="fs-4">Originial Estimate</p>
              <input type="text" className="form-control fs-4" />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <p className="fs-4">Time spent</p>
              <input type="text" className="form-control fs-4" />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <p className="fs-4">Time remaining</p>
              <input type="text" className="form-control fs-4" />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="form-group">
            <p className="fs-4">Desciption</p>
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
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary fs-4 mt-3">
            Create task
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
