import { HandlerContext } from '$fresh/server.ts'
import { parse } from 'https://deno.land/std@0.154.0/encoding/csv.ts'

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  console.log(_req.url)
  console.log(getQuery(_req.url))
  const queries = getQuery(_req.url)
  const location = queries?.location ? queries.location : 'Summary'
  const resp = await fetch(`https://raw.githubusercontent.com/shevernitskiy/climate/main/data/${location}.csv`)
  if (resp.status === 404) {
    return new Response('Error')
  }
  const data = parse(await resp.text(), {
    skipFirstRow: true,
  }) as Record<string, string | number>[]

  const chart_data = data.map((item) => {
    return { x: item.datetime as string, y: Number(item.temperature) }
  })

  let output = [{ name: location, data: chart_data }]

  if (queries?.yearly === 'true') {
    let year: { x: string; y: number }[] = []
    output = []
    let memoyear = new Date(chart_data[0].x).getFullYear()

    chart_data.forEach((item) => {
      const date = new Date(item.x)
      if (date.getFullYear() != memoyear) {
        memoyear = date.getFullYear()
        output.push({ name: String(date.getFullYear() - 1), data: year })
        year = []
      }
      year.push(item)
    })
    output.push({ name: String(memoyear), data: year })
  }

  return new Response(JSON.stringify(output))
}

function getQuery(url: string): { [key: string]: string } {
  const queries = url.split('?')
  if (queries.length <= 1) {
    return {}
  }
  const items = queries[1].split('&')
  const out: { [key: string]: string } = {}
  items.forEach((item) => {
    out[item.split('=')[0]] = item.split('=')[1]
  })

  return out
}
