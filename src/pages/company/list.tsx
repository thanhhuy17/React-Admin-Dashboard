import { CreateButton, FilterDropdown, List, useTable } from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";

import { COMPANIES_LIST_QUERY } from "../../graphql/queries";
import { Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CustomAvatar from "../../components/custom-avata";
import { Text } from "../../components/text";

const CompanyListPage = () => {
  const go = useGo();
  const { tableProps, fillter } = useTable({
    resource: "companies",
    pagination: {
      pageSize: 12,
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  // console.log("checkTableCompany: ", {tableProps, fillter})
  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: "companies",
                action: "create",
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        />
      )}
    >
      <Table {...tableProps} pagination={{ ...tableProps.pagination }}>
        <Table.Column<Company>
          dataIndex="name"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter("id", fillter)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Company" />
            </FilterDropdown>
          )}
          render={(value, record) => (
            <Space>
              <CustomAvatar
                shape="square"
                name={record.name}
                src={record.avatarUrl}
              />
              <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
            </Space>
          )}
        />

        <Table.Column title="Open deals amount" />

        <Table.Column title="Actions" />
      </Table>
    </List>
  );
};

export default CompanyListPage;
