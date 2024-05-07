import { TCategory } from "@customTypes/category";
import { Link } from "react-router-dom";

// const { category, categoryImg, categoryTitle } = styles;

const Category = ({ title, img, prefix }: TCategory) => {
  return (
    <div className="basis-1/4 mx-3 mb-5 flex flex-col items-center">
      <Link to={`/categories/products/${prefix}`}>
        <div className="rounded-full w-20 h-20 lg:w-56 lg:h-56">
          <img src={img} alt={title} className="w-full rounded-full" />
        </div>
        <h4 className="text-center text-xl font-semibold capitalize">
          {title}
        </h4>
      </Link>
    </div>
  );
};

export default Category;
