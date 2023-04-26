import { useConfigurator, usePrice, useThreekitInitStatus } from "@threekit-tools/treble";
import { ATTRIBUTE_TYPES, IHydratedAttribute } from "@threekit-tools/treble/dist/types";
import { useEffect } from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useOrderItems } from "vtex.order-items/OrderItems";
import { useProduct } from "vtex.product-context";
import Cards from "../Cards/Cards";
import Ruler from "../Ruler/Ruler";
import Skeleton from "../Skeleton/Skeleton";
import Title from "../Title/Title";

export function Attributes() {
  const [attributes] = useConfigurator() as Record<string, IHydratedAttribute>[];
  const loaded = useThreekitInitStatus();

  const productContext = useProduct() as any;
  const sku = productContext?.product?.items?.[0];
  const productAttachments = sku?.attachments.map((a) => a.name);

  const {
    orderForm: { items },
  } = useOrderForm();
  const { setManualPrice } = useOrderItems();
  const itemIndex = items.findIndex((item) => item.id === sku?.itemId) ?? -1;

  const priceContextThreekit = usePrice();
  const priceThreekit = priceContextThreekit?.price;

  useEffect(() => {
    if (itemIndex !== -1 && priceThreekit) {
      setManualPrice((priceThreekit ?? 0) * 100, itemIndex);
    }
  }, [itemIndex, priceThreekit]);

  if (!attributes || !productAttachments) return <></>;

  const allAttributeNames = Object.keys(attributes);
  const selectedAttributeNames = allAttributeNames.filter((attributeName) => productAttachments.includes(attributeName.replace("?", "")));

  const hasAttributes = selectedAttributeNames.length ? true : false;

  const render = (attribute: IHydratedAttribute) => {
    if (attribute.id) {
      if (attribute.type === ATTRIBUTE_TYPES.NUMBER) {
        return <Ruler attribute={attribute.name} key={attribute.id} />;
      } else {
        return <Cards attribute={attribute.name} key={attribute.id} />;
      }
    }
    return <></>;
  };

  return (
    <>
      {loaded ? (
        <>
          {hasAttributes &&
            selectedAttributeNames?.map((attributeName: string) => {
              return (
                <div key={attributeName}>
                  <Title title={attributeName} type="title" />
                  {render(attributes[attributeName] as any)}
                </div>
              );
            })}
          {/* <Title title="Styles Available" type="title" />
          <Cards attribute="Style" />

          <Title title="Pick Your Color" type="title" />
          <Cards attribute="Blind Color" />

          <Title title="Enter Measurements" type="title" />
          <Cards attribute="Measurement System" section={{ title: "Measurement System", type: "subtitle" }} />
          <Title title="Product Measurements - Width" type="subtitle" />
          <Ruler attribute="Product Measurements - Width" />
          <Title title="Product Measurements - Height" type="subtitle" />
          <Ruler attribute="Product Measurements - Height" />
          <Cards attribute="Where are you going to install it?" section={{ title: "Where are you going to install it?", type: "subtitle" }} />

          <Title title="Drive" type="title" />
          <Cards attribute="Drive Position" section={{ title: "Drive Position", type: "subtitle" }} />
          <Cards attribute="Drive" section={{ title: "Drive", type: "subtitle" }} />

          <Title title="Accent Colors" type="title" />
          <Cards attribute="Support Colors" section={{ title: "Support Colors", type: "subtitle" }} />
          <Cards attribute="Bottom Termination" section={{ title: "Bottom Termination", type: "subtitle" }} />

          <Title title="Miscellaneous" type="title" />
          <Cards attribute="Do you want command?" section={{ title: "Do you want command?", type: "subtitle" }} />
          <Cards attribute="Tissue Drop" section={{ title: "Tissue Drop", type: "subtitle" }} />
          <Cards attribute="Are you afraid of being wrong?" section={{ title: "Are you afraid of being wrong?", type: "subtitle" }} /> */}
        </>
      ) : (
        <>
          <Skeleton height={80} marginBottom={15} />
          <Skeleton height={80} marginBottom={15} />
          <Skeleton height={80} />
        </>
      )}
    </>
  );
}
