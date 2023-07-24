import fs from 'fs'
import gradient from 'gradient-string'

const banner = gradient([
  { color: '#42d392', pos: 0 },
  { color: '#818cf8', pos: 1 },
])('Vue Email')

console.log(banner)

fs.writeFile('banner.txt', banner, 'utf8', (err) => {
  if (err) return console.log(err)
  console.log('Hello World > helloworld.txt')
})
