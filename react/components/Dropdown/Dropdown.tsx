import React, { useState } from 'react'
import { useAttribute } from '@threekit-tools/treble'

import styles from './Dropdown.css'

export function Dropdown(props: any) {
  const { attribute } = props
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(-1)

  if (!attribute) return <></>

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  return (
    <div className={styles.customSelect}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        onClick={toggleOptions}
        className={`${styles.customSelect__button} ${
          isOptionsOpen && styles.customSelect__button_open
        }`}
      >
        {selectedOption !== -1
          ? attribute?.values[selectedOption]?.label
          : 'Select'}
        <span className={styles.dropdown__chevron}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="192"
            height="192"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none" />
            <polyline
              points="208 96 128 176 48 96"
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </span>
      </button>
      <ul
        className={`${styles.customSelect__options} ${
          isOptionsOpen ? styles.customSelect__show : ''
        }`}
        role="listbox"
        aria-activedescendant={
          selectedOption !== -1 ? attribute?.values[selectedOption]?.label : ''
        }
        tabIndex={-1}
      >
        {attribute?.values.map((item: any, i: any) => (
          <li
            key={i}
            id={i}
            role="option"
            aria-selected={selectedOption === i}
            tabIndex={0}
            onKeyUp={() => {}}
            onClick={() => {
              setSelectedOption(i)
              setIsOptionsOpen(false)
              item.handleSelect(item.label)
            }}
            className={styles.customSelect__option}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DropdownAttribute(props: any) {
  const [attribute, setAttribute] = useAttribute(props.attribute)

  if (!attribute) return <></>

  return <Dropdown attribute={attribute} setAttribute={setAttribute} />
}
