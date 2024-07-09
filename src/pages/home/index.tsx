import { Col, Row } from "antd";
import {
  DashboardTotalCountCard,
  DealsChart,
  UpcomingEvent,
} from "../../components";
import { useCustom } from "@refinedev/core";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "../../graphql/queries";
import { DashboardTotalCountsQuery } from "../../graphql/types";
import DashboardLatestActivities from "../../components/home/latest-activities";

export const Home = () => {
  const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
    },
  });
  console.log("DataTestH: ", data); // have Data

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="companies"
            isLoading={isLoading}
            totalCount={data?.data.companies.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="contacts"
            isLoading={isLoading}
            totalCount={data?.data.contacts.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="deals"
            isLoading={isLoading}
            totalCount={data?.data.deals.totalCount}
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={8} style={{ height: "460px" }}>
          <UpcomingEvent />
        </Col>
        <Col xs={24} sm={24} xl={16} style={{ height: "460px" }}>
          <DealsChart />
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{marginTop: '32px'}}>
        <Col xs={24}>
          <DashboardLatestActivities />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
