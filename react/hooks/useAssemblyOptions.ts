import { ATTRIBUTE_TYPES, IAttributeAsset, IConfigurationAsset, IConfigurationColor } from "@threekit-tools/treble/dist/types";
import { useCallback } from "react";
import { useProductDispatch } from "vtex.product-context";

const useAssemblyOptions = () => {
  const dispatch = useProductDispatch();

  const attributes = window.threekit.configurator.getAttributes();

  const setAssemblyOptions = useCallback(() => {
    const configuration = window.threekit.configurator.getConfiguration();

    // console.log("=====================");

    attributes.forEach((a) => {
      const { name, type } = a;
      const attributeConfiguration = configuration[name];

      if (!attributeConfiguration) {
        return;
      }

      const attachmentKey = name.replace("?", "");
      let attachmentValue = attributeConfiguration?.toString();

      switch (type) {
        case ATTRIBUTE_TYPES.ASSET:
          const { assetId } = attributeConfiguration as IConfigurationAsset;
          const { values } = a as IAttributeAsset;
          attachmentValue = values.find((v) => v.assetId === assetId)?.name ?? "";
          break;
        case ATTRIBUTE_TYPES.COLOR:
          const { r, g, b } = attributeConfiguration as IConfigurationColor;
          attachmentValue = `rgb(${r},${g},${b})`;
          break;
      }
      // console.log({ [attachmentKey]: attachmentValue });

      if (dispatch) {
        dispatch({
          type: "SET_ASSEMBLY_OPTIONS",
          args: {
            groupInputValues: { [attachmentKey]: attachmentValue },
            groupId: attachmentKey,
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
  }, []);

  return { setAssemblyOptions };
};

export { useAssemblyOptions };
