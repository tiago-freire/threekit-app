import { AwaitThreekitLoad, ThreekitProvider } from "@threekit-tools/treble";
import { OrderItemsProvider } from "vtex.order-items/OrderItems";
import { OrderFormProvider } from "vtex.order-manager/OrderForm";
import { Attributes } from "../Attributes/Attributes";
import PlayerWrapper from "../PlayerWrapper/PlayerWrapper";
import ProductHeader from "../Product/ProductHeader/ProductHeader";
import styles from "./ThreeKitInit.css";

type TThreekitInit = {
  assetId: string;
  settings: {
    mode: string;
    orgId: string;
    publicToken: string;
  };
  PriceReplaceComponent?: React.ComponentType;
  AddToCartButton?: React.ComponentType;
};

const ThreekitInit = (props: TThreekitInit) => {
  const {
    settings: { mode, orgId, publicToken },
    assetId,
    PriceReplaceComponent,
    AddToCartButton,
  } = props;

  const project = {
    credentials: {
      preview: {
        publicToken,
        orgId,
      },
    },
    products: {
      preview: {
        assetId,
      },
    },
  };

  const playerConfig = {
    allowMobileVerticalOrbit: true,
    showConfigurator: false,
    showAR: true,
    initialConfiguration: undefined,
    showLoadingThumbnail: true,
    showLoadingProgress: true,
    onLoadingProgress: undefined,
    showShare: false,
    locale: undefined,
    publishStage: "draft",
  };

  return (
    <OrderFormProvider>
      <OrderItemsProvider>
        <ThreekitProvider project={project} threekitEnv={mode} playerConfig={playerConfig}>
          <div className={styles.threekit__wrapper}>
            <div className={styles.player__wrapper}>
              <PlayerWrapper />
            </div>
            <div className={styles.controls__wrapper}>
              <ProductHeader PriceReplaceComponent={PriceReplaceComponent} />
              <Attributes />
            </div>
          </div>
          <AwaitThreekitLoad>{AddToCartButton && <AddToCartButton />}</AwaitThreekitLoad>
        </ThreekitProvider>
      </OrderItemsProvider>
    </OrderFormProvider>
  );
};

export default ThreekitInit;
