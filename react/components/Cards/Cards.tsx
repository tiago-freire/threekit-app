import { useAttribute } from "@threekit-tools/treble";
import { IHydratedAttributeAsset } from "@threekit-tools/treble/dist/types";
import { useAssemblyOptions } from "../../hooks/useAssemblyOptions";
import Title from "../Title/Title";
import styles from "./Cards.css";
import checkmark from "./assets/checkmark_white.png";

interface CardsProps {
  attribute: IHydratedAttributeAsset;
  section: { title: string; type: string };
}

export function Cards({ attribute, section: { title, type } }: CardsProps) {
  if (!attribute) return <></>;

  const { setAssemblyOptions } = useAssemblyOptions();

  return (
    <>
      {attribute?.values.length ? (
        <div>
          {title !== undefined && <Title title={title} type={type} />}
          <div className={styles.cardWrapper}>
            {attribute?.values.map((item, i: number) => (
              <button
                key={i}
                type="button"
                title={item.label}
                onClick={() => {
                  // console.log(`Select "${attribute.name}": Old value = ${JSON.stringify(attribute.value)} | New value = ${item.label}`);
                  item.handleSelect();
                  setAssemblyOptions();
                }}
                className={`${styles.buttonWrapper} ${item.selected ? styles.selected : styles.unselected} ${
                  item.metadata?._thumbnail ? styles.hasThumbnail : ""
                }`}
              >
                {item.selected && (
                  <span className={styles.flag__selected}>
                    <img src={checkmark} alt="" />
                  </span>
                )}
                {item.metadata?._thumbnail && <span className={styles.card} style={{ background: `url(${item.metadata?._thumbnail})` }} />}
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

export default function CardsAttribute({ attribute, section }: any) {
  const [attr] = useAttribute(attribute);
  if (!attribute || !attr) return <></>;

  return <Cards section={section || { title: undefined, type: undefined }} attribute={attr as IHydratedAttributeAsset} />;
}
