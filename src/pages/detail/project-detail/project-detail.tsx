import { useEffect } from "react";
import { useAppSelector } from "../../../redux/config-store";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetail } from "../../../services/project.service";
import InfoMain from "./info-main/info-main";
import Content from "./content/content";
import { setProjectDetail } from "../../../redux/slice/project.slice";
import { useDispatch } from "react-redux";

function ProjectDetail() {
  const params = useParams<any>();
  const {projectDetail}=useAppSelector((state)=>state.projectSlice);

  const dispatch=useDispatch();

  useEffect(() => {
    if (!params.projectId) return;

    getProjectDetail(params.projectId)
      .then((resp) => {
        dispatch(setProjectDetail(resp.content));   
      })
      .catch((err) => {
        console.log(err);
      });   
  }, [params.projectId]);
  console.log(projectDetail);

  return <div>
    {projectDetail?(<InfoMain data={projectDetail}/>):(<p>wait a minute...</p>)}
    <Content/>
  </div>;
}

export default ProjectDetail;
