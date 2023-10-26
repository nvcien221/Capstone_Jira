import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import {
  AutoComplete,
  Popover,
  Button,
  Input,
  Space,
  Table,
  Avatar,
} from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { Tag } from "antd";
import EditIcon from "../../assets/icons/edit.icon";
import DeleteIcon from "../../assets/icons/delete.icon";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/config-store";
import { useDispatch } from "react-redux";
import {
  deleteProject,
  getAllProject,
  removeUserFromProject,
} from "../../services/project.service";
import { setListProject } from "../../redux/slice/project.slice";
import { assignUserProject, getUser } from "../../services/user.service";
import { setListUserSearch } from "../../redux/slice/user.slice";
import { openDrawer } from "../../redux/slice/drawer.slice";

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

type DataIndex = keyof DataType;

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [value, setValue] = useState("");
  const searchInput = useRef<InputRef>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const data: DataType[] = useAppSelector((state) => {
    return state.projectSlice.listProject;
  });

  useEffect(() => {
    const getListProject = async () => {
      const resp = await getAllProject();

      const action = setListProject(resp.content);

      dispatch(action);
    };
    getListProject();
  }, [data]);

  const searchResult = useAppSelector((state) => {
    return state.userSlice.listUserSearch;
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text: any, record: any, index: any) => {
        return <Link style={{textDecoration:"none"}} to={`/projectDetail/${record.id}`}>{text}</Link>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLocaleLowerCase();
        let creator2 = item2.creator?.name.trim().toLocaleLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Category name",
      dataIndex: "categoryName",
      key: "categoryName",
      ...getColumnSearchProps("categoryName"),
    },
    {
      title: "Creator",
      key: "creator",
      render: (text: any, record: DataType, index: number) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLocaleLowerCase();
        let creator2 = item2.creator?.name.trim().toLocaleLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      key: "members",
      width: "30%",
      render: (text: any, record: DataType, index: number) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="bottom"
                  title="Members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    style={{
                                      borderRadius: "50%",
                                      width: "3rem",
                                      height: "3rem",
                                    }}
                                    alt=""
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      let data = {
                                        projectId: record.id,
                                        userId: item.userId,
                                      };
                                      removeUserFromProject(data)
                                        .then(() => {
                                          (async () => {
                                            const resp = await getAllProject();
                                            dispatch(
                                              setListProject(resp.content)
                                            );
                                          })();
                                        })
                                        .catch((e) => {
                                          console.log(e);
                                        });
                                    }}
                                    className="btn btn-danger"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="rightTop"
              title={() => {
                return <span>Add user</span>;
              }}
              content={() => {
                return (
                  <AutoComplete
                    options={searchResult?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);
                      const data = {
                        projectId: record.id,
                        userId: valueSelect,
                      };
                      assignUserProject(data)
                        .then((resp) => {
                          (async () => {
                            const resp = await getAllProject();
                            dispatch(setListProject(resp.content));
                            setValue("");
                          })();
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      (async () => {
                        const resp = await getUser(value);
                        const action = setListUserSearch(resp.content);
                        dispatch(action);
                      })();
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (text: any, record: DataType, index: number) => {
        return (
          <div>
            <button
              onClick={() => {
                const action = {
                  id: record.id,
                  projectName: record.projectName,
                  creator: record.creator.id,
                  description: record.description,
                  categoryId: record.categoryId,
                };

                dispatch(openDrawer(action));
              }}
              className="btn me-2 btn-primary"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => {
                deleteProject(record.id)
                  .then(() => {
                    (async () => {
                      const resp = await getAllProject();
                      dispatch(setListProject(resp.content));
                    })();
                    alert("Delete project successfully!");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
              className="btn btn-danger"
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3>Project management</h3>
      <Table rowKey="Id" columns={columns} dataSource={data} />;
    </div>
  );
};

export default Home;
