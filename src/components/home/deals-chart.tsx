import { DollarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
import { useList } from "@refinedev/core";
import { DASHBOARD_DEALS_CHART_QUERY } from "../../graphql/queries";
import React from "react";
import mapDealsData from "../../utilities/map-deals-data";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardDealsChartQuery } from "../../graphql/types";

const DealsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: "dealStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["WON", "LOST"],
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });
  // console.log("DataTest: ", data?.data); // have Data
  // Dùng UserMemo để lưu giá trị, khi nào dữ liệu thay đổi thì mới cập nhật.
  const dealData = React.useMemo(() => {
    if (data?.data) {
      return mapDealsData(data?.data);
    } else {
      return []; // Trả về mảng rỗng nếu data?.data là undefined
    }
  }, [data?.data]);

  // console.log("test", mapDealsData(data?.data));
  const config: AreaConfig = {
    data: dealData,
    xField: "timeText",
    yField: "value",
    isStack: false,
    seriesField: "state",
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: { offsetY: -6 },
    yAxis: {
      tickCount: 8,
      label: {
        formatter: (v: string) => {
          return `$${Number(v) / 1000}k`;
        },
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `$${Number(data.value) / 1000}k`,
        };
      },
    },
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
