import React, { useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'

import GET_APP_SETTINGS from './gql/GET_APP_SETTINGS.gql'
import ThreeKitInit from './components/ThreeKitInit/ThreeKitInit'

const Threekit = () => {
  const item = useProduct()
  const [getAppSettings, { data }] = useLazyQuery(GET_APP_SETTINGS, {
    variables: {
      app: 'vtextitantools.threekit-app',
    },
  })

  const getAssetID = () => {
    const asset = item?.product?.properties?.filter(
      (property: any) => property?.name === 'Asset ID'
    )

    const assetID =
      asset?.length && asset[0]?.values.length ? asset[0]?.values[0] : ''

    return assetID
  }

  useEffect(() => {
    getAppSettings()
  }, [])

  if (!data) return <></>

  return (
    <ThreeKitInit
      settings={JSON.parse(data?.appSettings?.message)}
      assetId={getAssetID()}
    />
  )
}

export default Threekit
