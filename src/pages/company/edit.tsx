import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Row, Col, Form, Select, InputNumber, Input } from "antd";
import { UPDATE_COMPANY_MUTATION } from "../../graphql/mutations";
import CustomAvatar from "../../components/custom-avata";
import { getNameInitials } from "../../utilities";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "../../graphql/types";
import { USERS_SELECT_QUERY } from "../../graphql/queries";
import SelectOptionWithAvatar from "../../components/select-option-with-avatar";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "../../constants";
import { CompanyContactsTable } from "./contact-table";

const EditPage = () => {
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { avartarUrl, name } = queryResult?.data?.data || {};

  const { selectProps, queryResult: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avartarUrl}
                name={getNameInitials(name || "")}
                style={{ width: 80, height: 80, marginBottom: "24px" }}
              />
              <Form.Item
                label="Sales owner"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwner?.id}
              >
                <Select
                  placeholder="Please enter a sales owner"
                  {...selectProps}
                  options={
                    queryResultUsers.data?.data.map((user) => ({
                      value: user.id,
                      label: (
                        <SelectOptionWithAvatar
                          name={user.name}
                          avatarUrl={user.avatarUrl ?? undefined}
                        />
                      ),
                    })) ?? []
                  }
                />
              </Form.Item>
              <Form.Item>
                <Select options={companySizeOptions} />
              </Form.Item>
              <Form.Item>
                <InputNumber autoFocus addonBefore="$" placeholder="0,00" />
              </Form.Item>
              <Form.Item label="Industry">
                <Select options={industryOptions} />
              </Form.Item>
              <Form.Item label="Business type">
                <Select options={businessTypeOptions} />
              </Form.Item>
              <Form.Item label="Country">
                <Input placeholder="Country" />
              </Form.Item>
              <Form.Item label="Website">
                <Input placeholder="Website" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col xs={24} xl={12}>
          <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
};

export default EditPage;
