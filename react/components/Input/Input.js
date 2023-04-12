import React, {useState} from 'react'
import { useAttribute } from '@threekit-tools/treble'

import styles from './Input.css'
import Title from '../Title/Title'
import { useProductDispatch } from 'vtex.product-context';
import {getConfiguration, getPrice, getAttributes} from '../../modules/threekit';

export function Input(props) {
  const { attribute, section } = props
  const { title, type } = section

  const [attributeValue, setAttribute] = useAttribute(props.attribute)

  if (!attribute) return <></>

  var dispatch = useProductDispatch();

  function handleChange() {
    const attributes = getAttributes()
    const configuration = getConfiguration();
    attributes.map((a) => {   
      if(dispatch) {     
       dispatch({
         type: 'SET_ASSEMBLY_OPTIONS', 
         args: {
           groupInputValues: {[a.name]: configuration[a.name]},
           groupId: a.name,
           groupItems: [{
             id: "1",
             quantity: 0,
             seller: "VTEX",
             initialQuantity: 1,
             choiceType: 'SINGLE',
             name: '',
             price: 10,
             children: null
           }],
           isValid: true
       }
     })
     }
     console.log(configuration)
   })
   var tag = document.getElementsByClassName("vtextitantools-threekit-app-1-x-price")[0]
   tag.innerHTML= "$" + getPrice().toFixed(2);
  }

  return (
    <>
      {attribute ? (
        <div>
          {title !== undefined && <Title title={title} type={type} />}
          <div className={styles.inputWrapper}>
            <input onChange={(e) => setAttribute(parseInt(e.target.value)).then(handleChange)} defaultValue={attributeValue?.value}/>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
