// import { usePrice } from "@threekit-tools/treble";
import { FormattedPrice } from "vtex.formatted-price";
import { useProduct } from "vtex.product-context";
// import { Spinner } from "vtex.styleguide";

import styles from "./Price.css";

export default function Price() {
  // const priceThreekit = usePrice();

  const productContextValue = useProduct();
  const selectedItem = productContextValue?.selectedItem;
  const price = selectedItem?.sellers[0].commertialOffer.Price; // item?.selectedItem?.product?.priceRange
  const listPrice = selectedItem?.sellers[0].commertialOffer.ListPrice;

  return (
    <div className={styles.priceSection}>
      <div className={styles.offering}>
        <p className={styles.priceCTA}>{`Today's Sale Price!`}</p>
        <div className={styles.price}>
          <FormattedPrice value={price} />
          {/* {priceThreekit ? <FormattedPrice value={priceThreekit?.price} /> : <Spinner />} */}
        </div>
        {price && listPrice && price < listPrice && (
          <p className={styles.oldPrice}>
            Starting at{" "}
            <span className={styles.oldPrice__lineThrough}>
              <FormattedPrice value={listPrice} />
            </span>
          </p>
        )}
      </div>
      <p className={styles.stock}>In Stock</p>
    </div>
  );
}
