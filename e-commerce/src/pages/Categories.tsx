import GridList from "@components/common/GridList/GridList";
import Category from "@components/eCommerce/category/Category";
import Loading from "@components/feedback/Loading";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { loading, error, records } = useCategories();
  return (
    <Loading status={loading} error={error}>
      <GridList
        records={records}
        renderItem={(record) => <Category {...record} />}
      />
    </Loading>
  );
};

export default Categories;
