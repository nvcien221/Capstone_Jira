import React from "react";
import css from "./info-main.module.scss";
import { SearchOutlined } from "@ant-design/icons";

function InfoMain(props: any) {
  const { data } = props;

  const renderAvatar=()=>{
    if(data){
        return (data.members.map((member: any, index: any) => {
            return (
              <div key={index} className={css["avatar"]}>
                <img
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                  src={member.avatar}
                  alt=""
                />
              </div>
            );
          }))
    }
  }
  return (
    <div>
      <h3 className={css["title"]}>{data.projectName}</h3>
      <div className={css["info"]}>
        <div className={css["search-block"]}>
          <input className={css["search"]} type="text" />
          <SearchOutlined style={{ fontSize: 20 }} />
        </div>
        <div className={css["avatar-group"]}>
          {renderAvatar()}
        </div>
        <div className={css["text"]}>Only My Issues</div>
        <div className={css["text"]}>Recently Updated</div>
      </div>
    </div>
  );
}

export default InfoMain;
