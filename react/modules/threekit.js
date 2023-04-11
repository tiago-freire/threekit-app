export function configuration() {
  return window.threekit.configurator.getConfiguration()
}

export function getAttributes() {
  return window.threekit.configurator.getAttributes();
}

export function getConfiguration() {
  let config = window.threekit.configurator.getConfiguration();
  config["Blind Color"] = getBlindColor(config["Blind Color"]);
  return config;
}

export function getBlindColor(config) {
  let blindColor;

  switch (config.assetId) {
    case '004b1a87-32e7-4a80-8509-ee65ecd4ef63':
      blindColor = 'Charcoal'
      break

    case '38265fed-f40d-4021-acc5-32cddb0446cf':
      blindColor = 'Bright White'
      break

    case 'a5d624a6-516a-4e07-85f0-bb302d964212':
      blindColor = 'Birch'
      break

    default:
      break
  }

  return blindColor;
}

export function getPrice() {
  return window.threekit.configurator.getPrice(
    'f63383c4-ff87-4d90-850a-f5680fcf0907',
    'USD'
  )
}

export function packagedConfig() {
  let str = ''
  const config = configuration()

  let blindColor

  switch (config['Blind Color'].assetId) {
    case '004b1a87-32e7-4a80-8509-ee65ecd4ef63':
      blindColor = 'Charcoal'
      break

    case '38265fed-f40d-4021-acc5-32cddb0446cf':
      blindColor = 'Bright White'
      break

    case 'a5d624a6-516a-4e07-85f0-bb302d964212':
      blindColor = 'Birch'
      break

    default:
      break
  }

  str += `Blind Color: ${blindColor}; `
  str += `Height: ${config['Height (cm)']}; `
  str += `Width: ${config['Width (cm)']}; `
  str += `Style: ${config['Style']}; `
  str += `Slat Size: ${config['Select your slat size:']}; `
  str += `Fitting Option: ${config['Select your fitting option:']}; `
  str += `Drive Position: ${config['Drive Position']}; `
  str += `5 Year Warranty: ${'5 Year Warranty'}; `
  return str
}
