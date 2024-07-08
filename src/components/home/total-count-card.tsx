import {
  ContactsOutlined,
  DollarOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Area, AreaConfig } from "@ant-design/plots";
import { Card } from "antd";

type Props = {
  resource: "companies" | "contacts" | "deals";
  isLoading: boolean;
  totalCount: number;
};

const DashboardTotalCountCard = ({
  resource,
  isLoading,
  totalCount,
}: Props) => {
  const styleOk = {
    color:
      resource === "companies"
        ? "#67BEEA"
        : resource === "contacts"
        ? "#73C991"
        : "#CE9178",
    fontSize: "1.3rem",
  };
  const config: AreaConfig = {
    data: [],
    xField: "index",
    yField: "value",
    isStack: false,
    seriesField: "state",
    animation: true,
    startOnZero: false,
    smooth: true,
  };
  return (
    <Card
      style={{
        height: "96px",
        padding: 0,
        display: "flex",
        // alignItems: "center",
      }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          whiteSpace: "nowrap",
          marginTop: "-15px",
        }}
      >
        {resource === "companies" ? (
          <SolutionOutlined style={styleOk} />
        ) : resource === "contacts" ? (
          <ContactsOutlined style={styleOk} />
        ) : (
          <DollarOutlined style={styleOk} />
        )}

        <h4 style={{ marginTop: "8px" }}>
          Number of {resource.charAt(0).toUpperCase() + resource.substring(1)}
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          marginTop: "0px",
        }}
      >
        <span
          style={{
            fontWeight: "700",
            color:
              resource === "companies"
                ? "#67BEEA"
                : resource === "contacts"
                ? "#73C991"
                : "#CE9178",
            fontSize: "2.5rem",
            marginBottom: "-10px",
          }}
        >
          {totalCount}
        </span>
        <Area {...config} height={50} width={200} />
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;

//===================huy
