import React from 'react'
import { useProduct } from 'vtex.product-context'
import { FormattedPrice } from 'vtex.formatted-price'

import styles from './Price.css'

export default function Price() {
  var productContextValue = useProduct();
  const selectedItem = productContextValue?.selectedItem;
  const price = selectedItem?.sellers[0].commertialOffer.Price;// item?.selectedItem?.product?.priceRange
  const listPrice = selectedItem?.sellers[0].commertialOffer.ListPrice;

  return (
    <div className={styles.priceSection}>
      <div className={styles.offering}>
        <p className={styles.priceCTA}>{`Today's Sale Price!`}</p>
        <p className={styles.price}>
          <FormattedPrice value={price} />
        </p>
        {price &&
          listPrice &&
          price < listPrice && (
            <p className={styles.oldPrice}>
              Starting at{' '}
              <span className={styles.oldPrice__lineThrough}>
                <FormattedPrice value={listPrice} />
              </span>
            </p>
          )}
      </div>
      <p className={styles.stock}>In Stock</p>
    </div>
  )
}
