import React, { useState, useEffect } from 'react'
import { useAttribute } from '@threekit-tools/treble'
import { useProductDispatch } from 'vtex.product-context'

import { packagedConfig } from '../../modules/threekit'
import styles from './Room.css'
import Title from '../Title/Title'

export default function Room(props: any) {
  const { section } = props
  const { title, type } = section
  const [term, setTerm] = useState('')
  const [attribute, setAttribute] = useAttribute('Room Label')
  const dispatch = useProductDispatch()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (attribute && setAttribute) {
        setAttribute(term)
        dispatch?.({
          type: 'SET_ASSEMBLY_OPTIONS',
          args: {
            groupInputValues: { Data: packagedConfig() },
            groupId: 'Configuration',
            groupItems: [
              {
                id: '1',
                quantity: 1,
                seller: 'VTEX',
                initialQuantity: 1,
                choiceType: 'Yes',
                name: 'ben',
                price: 0,
                children: null,
              },
            ],
            isValid: true,
          },
        })
      }
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [term])

  return (
    <>
      {title !== undefined && <Title title={title} type={type} />}
      <div className={styles.roomWrapper}>
        <input
          className={styles.room__value_input}
          type="text"
          name="roomValue"
          placeholder="Ex: West Wall"
          onKeyUp={(e: any) => setTerm(e?.target?.value)}
        />
      </div>
    </>
  )
}