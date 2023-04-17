import { useAttribute } from "@threekit-tools/treble";
import { IAttributeNumber, IAttributeString } from "@threekit-tools/treble/dist/types";
import { useAssemblyOptions } from "../../hooks/useAssemblyOptions";
import Title from "../Title/Title";
import styles from "./Input.css";

interface InputProps {
  attribute: string;
  section: { title: string; type: string };
}

export function Input(props: InputProps) {
  const { attribute, section } = props;
  const { title, type } = section;

  const [attributeValue, setAttribute] = useAttribute(props.attribute) as [
    IAttributeNumber | IAttributeString,
    (value: string | number) => Promise<void>
  ];

  if (!attribute || !attributeValue || !setAttribute) return <></>;

  const { setAssemblyOptions } = useAssemblyOptions();

  return (
    <div>
      {title !== undefined && <Title title={title} type={type} />}
      <div className={styles.inputWrapper}>
        <input onChange={(e) => setAttribute(parseInt(e.target.value)).then(setAssemblyOptions)} defaultValue={attributeValue?.value} />
      </div>
    </div>
  );
}
