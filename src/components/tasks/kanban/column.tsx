import { useDroppable } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";
import { Text } from "../../text";
import { PlusOutlined } from "@ant-design/icons";

const KanbanColunm = ({ children }: React.PropsWithChildren) => {
  const { isOver, setNodeRef, active } = useDroppable({
    is: "",
    data: "",
  });
  const count = 5;
  const description = "Description";
  const title = "Title";

  const onAddClickHandler = () => {};
  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",

        flexDirection: "column",
        padding: "0 16px",
      }}
    >
      <div style={{ padding: "12px" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              size="xs"
              strong
              style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflow: active ? "unset" : "scroll",
          border: "2px transparent",
          borderColor: isOver ? "#000040" : "transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColunm;
