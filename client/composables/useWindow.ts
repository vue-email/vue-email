import { withBase } from 'ufo'

export default function (): {
  hostname: Ref<string>
  host: Ref<string>
} {
  const hostname = useState('hostname', () => '')
  const host = useState('host', () => '')

  onMounted(() => {
    if (import.meta.client) {
      hostname.value = window.location.host
      host.value = withBase('/', `${window.location.protocol}//${hostname.value}`)
    }
  })

  return {
    hostname,
    host,
  }
}
