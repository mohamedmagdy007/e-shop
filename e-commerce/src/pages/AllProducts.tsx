import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import useAllProducts from "@hooks/useAllProducts";

const AllProducts = () => {
  const { loading, error, productsFullInfo } = useAllProducts();
  return (
    <>
      <Loading status={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default AllProducts;
