export function convertStyleStringToObj(styleString: string): {
  [key: string]: string;
} {
  const styleObj: { [key: string]: string; } = {}
  const styleDeclarations: string[] = styleString.split(';')

  styleDeclarations.forEach((declaration: string) => {
    const [property, value] = declaration.split(':')
    const propName: string = property.trim()
    const propValue: string = value.trim()

    styleObj[propName] = propValue
  })

  return styleObj
}
