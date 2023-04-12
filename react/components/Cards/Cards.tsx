import React from "react";
import { useAttribute } from "@threekit-tools/treble";

import styles from "./Cards.css";
import Title from "../Title/Title";
import checkmark from "./assets/checkmark_white.png";
import inside from "./assets/inside_mount.svg";
import outside from "./assets/outside_mount.svg";
import { useProductDispatch } from "vtex.product-context";
import { getConfiguration, getPrice, getAttributes } from "../../modules/threekit";
// import { Spinner } from 'vtex.styleguide'

export function Cards(props: any) {
  const { attribute, section } = props;
  const { title, type } = section;

  if (!attribute) return <></>;
  const isMountType = attribute?.label.includes("Select Mount Type");

  var dispatch = useProductDispatch();
  const attributes = getAttributes();
  const configuration = getConfiguration();

  function handleClick() {
    attributes.map((a) => {
      const { name } = a;
      const attrName = name.replaceAll("?", "");

      if (dispatch) {
        dispatch({
          type: "SET_ASSEMBLY_OPTIONS",
          args: {
            groupInputValues: { [attrName]: configuration[name] },
            groupId: attrName,
            groupItems: [
              {
                id: "1",
                quantity: 0,
                seller: "VTEX",
                initialQuantity: 1,
                choiceType: "SINGLE",
                name: "",
                price: 10,
                children: null,
              },
            ],
            isValid: true,
          },
        });
      }
    });
    var tag: any = document.getElementsByClassName("vtextitantools-threekit-app-1-x-price")[0];
    tag.innerHTML = "$" + getPrice().toFixed(2);
  }

  return (
    <>
      {attribute?.values.length ? (
        <div>
          {title !== undefined && <Title title={title} type={type} />}
          <div className={styles.cardWrapper}>
            {attribute?.values.map((item: any, i: any) => (
              <button
                key={i}
                type="button"
                title={item.label}
                onClick={() => item.handleSelect(item.name).then(handleClick)}
                className={`${styles.buttonWrapper} ${item.selected ? styles.selected : styles.unselected} ${
                  item.metadata?._thumbnail || isMountType ? styles.hasThumbnail : ""
                }`}
              >
                {item.selected && (
                  <span className={styles.flag__selected}>
                    <img src={checkmark} alt="" />
                  </span>
                )}
                {item.metadata?._thumbnail && <span className={styles.card} style={{ background: `url(${item.metadata?._thumbnail})` }} />}
                {isMountType && (
                  <span
                    className={styles.card}
                    style={{
                      background: `url(${item?.label === "Inside" ? inside : outside})`,
                    }}
                  />
                )}
                <p className={styles.itemLabel}>{item.label}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default function CardsAttribute(props: any) {
  const [attribute, setAttribute] = useAttribute(props.attribute);

  if (!attribute) return <></>;

  return (
    <Cards title={props.title} section={props?.section || { title: undefined, type: undefined }} attribute={attribute} setAttribute={setAttribute} />
  );
}
