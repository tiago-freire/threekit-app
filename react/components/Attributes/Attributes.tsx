import React from 'react'
import { useConfigurator } from '@threekit-tools/treble'
/* import Dropdown from '../Dropdown/Dropdown'
import Ruler from '../Ruler/Ruler' */

export function Attributes() {
  const [attributes] = useConfigurator() as any

  if (!attributes) return <></>

  // eslint-disable-next-line no-console
  console.log('attributes', attributes)
  // const attributesName = Object.keys(attributes)
  // const hasAttributes = attributesName.length ? true : false

  /* const render = (attribute:any) => {
    if (attributes[attribute].visible) {
      if (attribute.includes('Product Measurements')) {
        return (<Ruler key={attributes[attribute].id} {...attributes[attribute]} />)
      } else {
        return (<Dropdown key={attributes[attribute].id} attribute={attributes[attribute]} />)
      }
    }
    return<></>
  } */

  return (
    <>
      {/* {hasAttributes &&
        attributesName?.map(( attribute:string )=> {
          return render(attribute)
        })
      } */}
    </>
  )
}
