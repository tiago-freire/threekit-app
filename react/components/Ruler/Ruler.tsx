import React, { useEffect, useState, useRef } from 'react'
import { useAttribute } from '@threekit-tools/treble'
import Draggable from 'react-draggable'
import { useProductDispatch } from 'vtex.product-context'

import styles from './Ruler.css'
import imgWidth from './assets/blind-width.svg'
import imgHeight from './assets/blind-height.svg'
import { getAttributes, getConfiguration, getPrice } from '../../modules/threekit'

const sizePosition = {} as any

export function Ruler(props: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { label } = props?.attribute
  const min = 40;
  const max = 100;
  const setAttribute = props?.setAttribute

  const dispatch = useProductDispatch()
  //const name = label.split(' ( ')[1]
  const name = label
  const [inch, setInch] = useState(min) as any
  const [eighth, setEighth] = useState(0) as any
  const [scrollClass, setScrollClass] = useState(false) as any
  const rulerContainerRef = useRef(null) as any
  const rulerWrapperRef = useRef(null) as any
  const rulerMark = useRef(null) as any
  const attributes = getAttributes();
  const configuration = getConfiguration();

  const setRulerPos = (data: any) => {
    setPosition({ x: data.x, y: 0 })
    rulerWrapperRef.current.scrollLeft = data.x - 60
  }

  const handleStart = () => {
    setScrollClass(true)
  }

  function handleClick() {
    attributes.map((a) => {   
      if(dispatch) {     
       dispatch({
         type: 'SET_ASSEMBLY_OPTIONS', 
         args: {
           groupInputValues: {[a.name]: configuration[a.name]},
           groupId: a.name,
           groupItems: [{
             id: "1",
             quantity: 1,
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
   }) 
   var tag : any = document.getElementsByClassName("vtextitantools-threekit-app-1-x-price")[0]
   tag.innerHTML= "$" + getPrice().toFixed(2);
  }

  useEffect(() => {
    const finalVal = `${inch}.${eighth}`

    setAttribute(finalVal)
    
    setRulerPos({ x: sizePosition[inch][eighth], y: 0 })
  }, [inch, eighth])

  const isOnTop = () => {
    const element = rulerWrapperRef.current.querySelector(
      `.${styles.rulerPicker}`
    )

    const inchsContainers = rulerWrapperRef.current.querySelectorAll(
      `.${styles.inchContainer}`
    )

    if (!element || !inchsContainers) return false
    const elementLeftPosition = element?.getBoundingClientRect()?.left
    const elementRightPosition = element?.getBoundingClientRect()?.right

    return [...inchsContainers].some((inchContainer) => {
      if (
        elementLeftPosition >= inchContainer?.getBoundingClientRect()?.left &&
        elementRightPosition < inchContainer?.getBoundingClientRect()?.right
      ) {
        const eighths = inchContainer.querySelectorAll(`.${styles.eighth}`)

        return [...eighths].some((eighthCurr) => {
          if (
            elementLeftPosition >= eighthCurr?.getBoundingClientRect()?.left &&
            elementRightPosition < eighthCurr?.getBoundingClientRect()?.right
          ) {
            setInch(eighthCurr.getAttribute('data-inch'))
            setEighth(eighthCurr.getAttribute('data-eighth'))

            return true
          }

          return false
        })
      }

      return false
    })
  }

  const handleStop = (_event: any, data: any) => {
    isOnTop()
    setScrollClass(false)
    setRulerPos(data)
  }

  const fullInch = (index: any) => {
    return (
      <div key={index} className={styles.inchContainer}>
        <div
          className={`${styles.eighth} ${styles.inch}`}
          data-inch={index}
          data-eighth="0"
        >
          <span className={styles.mark} />
          <span className={styles.inchNumber}>{index}</span>
        </div>
        <div className={`${styles.eighth}`} data-inch={index} data-eighth="125">
          <span className={styles.mark} />
        </div>
        <div
          className={`${styles.eighth} ${styles.forth}`}
          data-inch={index}
          data-eighth="25"
        >
          <span className={styles.mark} />
          <span className={`${styles.measurement} ${styles.forthNumber}`}>
            1/4
          </span>
        </div>
        <div className={`${styles.eighth}`} data-inch={index} data-eighth="375">
          <span className={styles.mark} />
        </div>
        <div
          className={`${styles.eighth} ${styles.forth} ${styles.half}`}
          data-inch={index}
          data-eighth="5"
        >
          <span className={styles.mark} />
          <span className={`${styles.measurement} ${styles.halfNumber}`}>
            1/2
          </span>
        </div>
        <div className={`${styles.eighth}`} data-inch={index} data-eighth="625">
          <span className={styles.mark} />
        </div>
        <div
          className={`${styles.eighth} ${styles.forth}`}
          data-inch={index}
          data-eighth="75"
        >
          <span className={styles.mark} />
          <span className={`${styles.measurement} ${styles.forthNumber}`}>
            3/4
          </span>
        </div>
        <div className={`${styles.eighth}`} data-inch={index} data-eighth="875">
          <span className={styles.mark} />
        </div>
      </div>
    )
  }

  const lastInch = (index: any) => {
    return (
      <div key={index} className={styles.inchContainer}>
        <div
          className={`${styles.eighth} ${styles.inch} ${styles.lastInch}`}
          data-inch={index}
          data-eighth="0"
        >
          <span className={styles.mark} />
          <span className={styles.inchNumber}>{index}</span>
        </div>
      </div>
    )
  }

  const rulerBuilder = () => {
    const content: any[] = []
    let positionCounter = 0

    for (let index = min; index <= max; index++) {
      if (index === max) {
        content.push(lastInch(index))
        sizePosition[index] = {
          0: positionCounter,
        }
      } else {
        content.push(fullInch(index))
        sizePosition[index] = {
          0: positionCounter,
          125: positionCounter + 15,
          25: positionCounter + 30,
          375: positionCounter + 45,
          5: positionCounter + 60,
          625: positionCounter + 75,
          75: positionCounter + 90,
          875: positionCounter + 105,
        }
        positionCounter += 120
      }
    }

    return content
  }

  const selectInchOptionsBuilder = () => {
    const content: any[] = []

    for (let index = min; index <= max; index++) {
      content.push(
        <option key={index} value={index}>
          {index}
        </option>
      )
    }

    return content
  }

  return (
    <>
      <div className={styles.measure}>
        <div className={styles.sizeImage}>
          <img src={name.includes('Width') ? imgWidth : imgHeight} alt="" />
        </div>
        <div className={styles.measures}>
          <div className={styles.sizeSelector}>
            <p className={styles.sizeTitle}>{name}</p>
            <div className={styles.selectorWrapper}>
              <select
                className={styles.measureSelect}
                name=""
                id="inch"
                value={inch}
                onChange={(event) =>
                  {setInch(parseInt(event?.target?.value, 10)); handleClick()}
                }
              >
                {selectInchOptionsBuilder()}
              </select>
              <select
                className={styles.measureSelect}
                name=""
                id="eighth"
                value={eighth}
                onChange={(event) =>
                  setEighth(parseInt(event?.target?.value, 10))
                }
              >
                <option value="0">0</option>
                <option value="125">1/8</option>
                <option value="25">1/4</option>
                <option value="375">3/8</option>
                <option value="5">1/2</option>
                <option value="625">5/8</option>
                <option value="75">3/4</option>
                <option value="875">7/8</option>
              </select>
            </div>
          </div>
          <div className={styles.ruler}>
            <div
              ref={rulerWrapperRef}
              className={`${styles.rulerWrapper} ${
                scrollClass ? styles.scroll : ''
              }`}
            >
              <div className={styles.rulerContainer} ref={rulerContainerRef}>
                <Draggable
                  axis="x"
                  bounds={`.${styles.rulerContainer}`}
                  defaultPosition={{ x: 0, y: 0 }}
                  grid={[15, 0]}
                  position={{ x: position.x, y: 0 }}
                  onStart={() => handleStart()}
                  onStop={(event, data) => handleStop(event, data)}
                >
                  <div ref={rulerMark} className={styles.rulerPicker}>
                    <div className={styles.rulerPicker__barArrowTop} />
                    <div className={styles.rulerPicker__bar} />
                    <div className={styles.rulerPicker__barArrowBottom} />
                  </div>
                </Draggable>
                {rulerBuilder()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function RulerAttribute(props: any) {
  const [attribute, setAttribute] = useAttribute(props.attribute)

  if (!attribute) return <></>

  return <Ruler attribute={attribute} setAttribute={setAttribute} />
}