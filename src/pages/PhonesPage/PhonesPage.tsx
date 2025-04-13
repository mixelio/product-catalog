import { Outlet, useSearchParams } from 'react-router-dom';
import { CurrentPath } from '../../components/CurrentPath/CurrentPath';
import { useContext } from 'react';
import { CatalogContext } from '../../CatalogContext';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { FilterProduct } from '../../components/FilterProduct/FilterProduct';
import {SortParametr} from '../../components/FilterProduct/SortParametr';
import { Pagination } from '../../components/Pagination/Pagination';
import {Product} from '../../types/Product';
import {getSomeProduct} from '../../utils/getSomeProduct';

export const PhonesPage = () => {
  const { productsFromServer, phonesFromServer } = useContext(CatalogContext);
  const [searchParams] = useSearchParams();

  // Getting search parametrs
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');

  const productForShow: Product[] = productsFromServer ? [...productsFromServer].filter(item => item.category === 'phones') : [];

  const startItem = page && perPage ? (+page - 1) * +perPage : 0;
  const endItem = page && perPage ? startItem + +perPage : productForShow.length;

  let sortedProducts: Product[] = [...productForShow];

  if (phonesFromServer && page && perPage) {
    switch (sort) {
      case SortParametr.NAME:
        sortedProducts = sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortParametr.PRICE:
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case SortParametr.DATE:
        sortedProducts = sortedProducts.sort((a, b) => b.year - a.year);
        break;
      default:
        sortedProducts = [...productForShow];
        break;
    }

    sortedProducts = sortedProducts.slice(startItem, endItem);
  };

  console.log("Prices before sorting:", sortedProducts.map(item => item.price));
  return (
    <section className="phones first-screen">
      <div className="container">
        <CurrentPath />
        <h1 className="main-title phones__title">Mobile phones</h1>
        <p className="phones__number page__number-info">
          {productForShow &&
            productForShow.length > 0 &&
            `${productForShow.length} models`}
        </p>
        <FilterProduct />
        <div className="phones__grid page__grid">
          {(sortedProducts.length > 0) &&
            sortedProducts.map(item => (
              <ProductItem key={item.id} product={getSomeProduct(item, phonesFromServer)} section="phones" />
            ))}
        </div>
        <Outlet />
        {productForShow.length > 0 &&
          perPage &&
          productForShow.length > +perPage && (<Pagination itemsNumber={productForShow.length} />)}
      </div>
    </section>
  );
};
