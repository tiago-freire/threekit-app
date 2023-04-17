import React from "react";
import { useProduct } from "vtex.product-context";

import styles from "./ProductHeader.css";
import start from "../assets/premium.png";
import Price from "../Price/Price";

interface ProductHeaderProps extends React.HTMLAttributes<HTMLElement> {
  PriceReplaceComponent?: React.ComponentType;
}

export default function ProductHeader({ PriceReplaceComponent }: ProductHeaderProps) {
  const item = useProduct();
  const name = item?.product?.productName;
  const shortDescription = item?.product?.metaTagDescription;
  const productReference = item?.product?.productReference;

  return (
    <>
      <div className={styles.headerSection}>
        <div className={styles.detailsSection}>
          <div className={styles.topbarSection}>
            <i className={styles.starIcon}>
              <img src={start} alt="" />
            </i>
            <span>PREMIUM</span>
          </div>
          <div className={styles.productName}>{name}</div>
          <div className={styles.refSection}>Ref: {productReference}</div>
          <div className={styles.shortDescription}>{shortDescription}</div>
        </div>
        {PriceReplaceComponent ? <PriceReplaceComponent /> : <Price />}
      </div>
    </>
  );
}
