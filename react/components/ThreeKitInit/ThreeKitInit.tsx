import React from "react";
import { ThreekitProvider, Player } from "@threekit-tools/treble";

import ProductHeader from "../Product/ProductHeader/ProductHeader";
import styles from "./ThreeKitInit.css";
import Cards from "../Cards/Cards";
import Title from "../Title/Title";
import { Input } from "../Input/Input";
import { Attributes } from "../Attributes/Attributes";
//import Dropdown  from '../Dropdown/Dropdown'
//test

type TThreekitInit = {
  assetId: string;
  settings: {
    mode: string;
    orgId: string;
    publicToken: string;
  };
};

const ThreekitInit = (props: TThreekitInit) => {
  const {
    settings: { mode, orgId, publicToken },
    assetId,
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
    <ThreekitProvider project={project} threekitEnv={mode} playerConfig={playerConfig}>
      <div className={styles.threekit__wrapper}>
        <div className={styles.player__wrapper}>
          <Player />
        </div>
        <div className={styles.controls__wrapper}>
          <ProductHeader />

          <Title title="Styles Available" type="title" />
          <Cards attribute="Style" />

          <Title title="Pick Your Color" type="title" />
          <Cards attribute="Blind Color" />

          {/*  <Title title="Start Customizing" />
          <Title title="Height (cm)" type="subtitle" />
          <Dropdown attribute="Height (cm)" />
          <Title title="Width (cm)" type="subtitle" />
          <Dropdown attribute="Width (cm)" /> */}

          <Title title="Enter Measurements" type="title" />
          <Cards attribute="Measurement System" section={{ title: "Measurement System", type: "subtitle" }} />

          <Input attribute="Product Measurements - Height" section={{ title: "Product Measurements - Height", type: "subtitle" }} />

          <Input attribute="Product Measurements - Width" section={{ title: "Product Measurements - Width", type: "subtitle" }} />

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

          <Cards attribute="Are you afraid of being wrong?" section={{ title: "Are you afraid of being wrong?", type: "subtitle" }} />

          <Attributes />
        </div>
      </div>
    </ThreekitProvider>
  );
};

export default ThreekitInit;
