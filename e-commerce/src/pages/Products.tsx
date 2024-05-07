import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading";
import useProductsCat from "@hooks/useProductsCat";

const Products = () => {
  const { loading, error, productsFullInfo } = useProductsCat();
  return (
    <Loading status={loading} error={error}>
      <GridList
        records={productsFullInfo}
        renderItem={(record) => <Product {...record} />}
      />
    </Loading>
  );
};

export default Products;
