export interface Margin {
  m?: string | number
  mx?: string | number
  my?: string | number
  mt?: string | number
  mr?: string | number
  mb?: string | number
  ml?: string | number
}

export function withMargin(props: Margin) {
  return [
    withSpace(props.m, ['margin']),
    withSpace(props.mx, ['marginLeft', 'marginRight']),
    withSpace(props.my, ['marginTop', 'marginBottom']),
    withSpace(props.mt, ['marginTop']),
    withSpace(props.mr, ['marginRight']),
    withSpace(props.mb, ['marginBottom']),
    withSpace(props.ml, ['marginLeft']),
  ].filter(s => Object.keys(s).length)[0]
}

function withSpace(value: string | number | undefined, properties: string[]) {
  return properties.reduce((styles, property) => {
    if (value)
      return { ...styles, [property]: `${value}px` }

    return styles
  }, {})
}
