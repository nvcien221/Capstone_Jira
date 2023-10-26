import {
  Button,
  Drawer,
} from "antd";
import { useAppSelector } from "../redux/config-store";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../redux/slice/drawer.slice";
import FormEdit from "../components/formEdit/formEdit";

function DrawerCyber(props: any) {
  let { visible,projectValue } = useAppSelector(
    (state) => state.drawerSlice
  );


  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <>
      <Drawer
        title="Project detail"
        width={720}
        onClose={onClose}
        open={visible}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <button
              className="btn btn-light fs-4 me-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="btn btn-primary fs-4" form="projectEditForm" type="submit">
              Submit
            </button>
          </div>
        }
      >
       {projectValue?(<FormEdit data={projectValue}/>):(<p>select a project</p>)}
      </Drawer>
    </>
  );
}

export default DrawerCyber;
