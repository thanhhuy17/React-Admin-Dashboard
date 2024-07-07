
const mapDealsData = (data: any) => {
  if (!data || !data.dealStages || !data.dealStages.nodes) {
    return [];
  }

  return data.dealStages.nodes.map((dealStage: any) => {
    const dealsAggregate = dealStage.dealsAggregate;
    if (!dealsAggregate || !dealsAggregate.groupBy) {
      return null;
    }

    const groupBy = dealsAggregate.groupBy;
    if (!groupBy.month || !groupBy.year) {
      return null;
    }

    const timeText = `${groupBy.month}-${groupBy.year}`;
    const value = dealsAggregate.sum.value;

    return {
      timeText,
      value,
    };
  }) //.filter(item => item !== null);
};

export default mapDealsData;