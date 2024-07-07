import { DollarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
import { useList } from "@refinedev/core";
import { DASHBOARD_DEALS_CHART_QUERY } from "../../graphql/queries";
import React from "react";
import mapDealsData from "../../utilities/map-deals-data";

const DealsChart = () => {
  const { data } = useList({
    resource: "dealStages",
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });
  console.log("DataTest: ", data);

  // const dealData = React.useMemo(() => {
  //   return mapDealsData(data?.data);
  // }, [data?.data]);

  // console.log("test", mapDealsData(data?.data));
  const config: AreaConfig = {
    data: [],
    xField: "timeText",
    yField: "value",
  };

  return (
    <Card
      style={{ height: "100%", padding: "8px 16px" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            Deals Chart
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsChart;
