import type * as Types from "./schema.types";

export type EventCategoriesQueryVariables = Types.Exact<{
  filter: Types.EventCategoryFilter;
  sorting?: Types.InputMaybe<
    Array<Types.EventCategorySort> | Types.EventCategorySort
  >;
}>;

export type EventCategoriesQuery = {
  eventCategories: Pick<Types.EventCategoryConnection, "totalCount"> & {
    nodes: Array<Pick<Types.EventCategory, "id" | "title">>;
  };
};
