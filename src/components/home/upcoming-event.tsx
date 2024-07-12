import { CalendarOutlined } from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import { Text } from "../text";
import UpcomingEventSkeleton from "../skeleton/upcoming-events";
import { useList } from "@refinedev/core";
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from "../../graphql/queries";
import { formatEventDates } from "../../utilities/date/format-event-dates";
import dayjs from "dayjs";

const UpcomingEvent = () => {
  const { data, isLoading } = useList({
    resource: "events",
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: "startDate",
        order: "desc",
      },
    ],
    filters: [
      {
        field: "startDate",
        operator: "gte", //  Greenwich Mean Time đi qua Đài thiên văn Hoàng gia Greenwich
        value: dayjs,
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });
  // alert(JSON.stringify(data));
  // console.log("Response Data: ", data); //tôi lấy dữ liệu ở đây đã thấy rỗng rồi
  return (
    <Card
      style={{
        height: "100%",
        padding: "8px 16px",
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Upcomping Events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item) => {
            const renderDate = formatEventDates(item.startDate, item.endDate);

            // console.log("Start Date:", item.startDate);
            // console.log("End Date:", item.endDate);

            return (
              // Show list Upcomping Events
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{renderDate}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: "true" }} strong>
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
      {!isLoading && data?.data?.length === 0 && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "220px",
          }}
        >
          No Upcoming Events
        </span>
      )}
    </Card>
  );
};

export default UpcomingEvent;
