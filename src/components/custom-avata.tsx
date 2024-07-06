import { Avatar as AntdAvatar, AvatarProps } from "antd";
import { getNameInitials } from "../utilities";
type Props = AvatarProps & {
  // Thuộc djang custom type và  "AvatarProps &" goin là Intersection
  name?: string; // Nếu có dấu ? khi khai báo thì có cũng đc không có cũng đc.
};
const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name}
      size={"small"}
      style={{
        backgroundColor: "#234567",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(name || "")}
    </AntdAvatar>
  );
};

export default CustomAvatar;
