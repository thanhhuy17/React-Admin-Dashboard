import Modal from "antd/es/modal/Modal";
import CompanyListPage from "./list";
import { useGo } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { CREATE_COMPANY_MUTATION } from "../../graphql/mutations";

const Create = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: "companies", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modaProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });
  return (
    <CompanyListPage>
      <Modal></Modal>
    </CompanyListPage>
  );
};

export default Create;
