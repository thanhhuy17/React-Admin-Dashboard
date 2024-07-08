
import type { DashboardDealsChartQuery } from "../graphql/types";

type DealsChartData = {
  timeText: string;
  value: number;
  state: 'WON' | 'LOST'; 
};

const mapDealsData = (data: DashboardDealsChartQuery["dealStages"]["nodes"]) => {
  const dealData: DealsChartData[] = [];

  // Lấy data từ WON và LOST
  const wonData = data?.filter((dealStage) => dealStage.title === 'WON');
  const lostData = data?.filter((dealStage) => dealStage.title === 'LOST');

  // Xử lý WON data
  wonData?.forEach((dealStage) => {
    dealStage.dealsAggregate?.forEach((aggregate) => {
      const timeText = `${aggregate.groupBy?.closeDateMonth}-${aggregate.groupBy?.closeDateYear}`; 
      const value = aggregate.sum?.value || 0;
      dealData.push({ timeText, value, state: 'WON' });
    });
  });

  // Xử lý LOST data
  lostData?.forEach((dealStage) => {
    dealStage.dealsAggregate?.forEach((aggregate) => {
      const timeText = `${aggregate.groupBy?.closeDateMonth}-${aggregate.groupBy?.closeDateYear}`;
      const value = aggregate.sum?.value || 0;
      dealData.push({ timeText, value, state: 'LOST' });
    });
  });

  // Sắp xếp dữ liệu theo thời gian tăng dần
  dealData.sort((a, b) => {
    const [monthA, yearA] = a.timeText.split('-');
    const [monthB, yearB] = b.timeText.split('-');

    if (yearA !== yearB) {
      return Number(yearA) - Number(yearB);
    } else {
      return Number(monthA) - Number(monthB);
    }
  })

  return dealData;
};

export default mapDealsData;

