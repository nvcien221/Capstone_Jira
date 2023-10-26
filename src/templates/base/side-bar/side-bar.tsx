import React from "react";
import css from "./side-bar.module.scss";
import SearchIcon from "../../../assets/icons/search.icon";
import AddIcon from "../../../assets/icons/add.icon";
import { Link } from "react-router-dom";
import CardIcon from "../../../assets/icons/card.icon";
import SettingIcon from "../../../assets/icons/setting.icon";
import CreateIcon from "../../../assets/icons/create.icon";

function SideBar() {
  return (
    <div>
      <aside className={css["side-bar-first"]}>
        <Link to="#" className={css["side-bar-first-link"]}>
          <div className={css["side-bar-first-link-icon"]}>
            <SearchIcon />
          </div>
          <div className={css["side-bar-first-link-text"]}>SEARCH TASK</div>
        </Link>
        <Link to="createTask" className={css["side-bar-first-link"]}>
          <div className={css["side-bar-first-link-icon"]}>
            <AddIcon />
          </div>
          <div className={css["side-bar-first-link-text"]}>CREATE TASK</div>
        </Link>
      </aside>
      <div className={css["side-bar-second"]}>
        <div className={css["side-bar-user-profile"]}>
          <div className={css["side-bar-user-avatar"]}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8H0ip-XIURtAzNXIPdeJ5v_BfyMFW7wOnpz7WEsxT9w&s"
              alt=""
            />
          </div>
          <div className={css["side-bar-user-info"]}>
            <div className={css["side-bar-user-info-title"]}>Cyber learn</div>
            <div className={css["side-bar-user-info-content"]}>Report bugs</div>
          </div>
        </div>
        <div className={css["side-bar-section-group"]}>
          <Link to="#" className={css["side-bar-section"]}>
            <div className={css["side-bar-section-icon"]}>
              <CardIcon/>
            </div>
            <div className={css["side-bar-section-text"]}>Cyber board</div>
          </Link>
          <Link to="home" className={css["side-bar-section"]}>
            <div className={css["side-bar-section-icon"]}>
              <SettingIcon/>
            </div>
            <div className={css["side-bar-section-text"]}>
                Project management
            </div>
          </Link>
          <Link to="createProject" className={css["side-bar-section"]}>
            <div className={css["side-bar-section-icon"]}>
            <CreateIcon/>
            </div>
            <div className={css["side-bar-section-text"]}>
              Create project
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
