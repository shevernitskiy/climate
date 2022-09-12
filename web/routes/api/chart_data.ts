import { HandlerContext } from '$fresh/server.ts'
import { parse } from 'https://deno.land/std@0.154.0/encoding/csv.ts'

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const resp = await fetch(`https://raw.githubusercontent.com/shevernitskiy/climate/main/data/Summary.csv`)
  if (resp.status === 404) {
    return new Response('Error')
  }
  const data = parse(await resp.text(), {
    skipFirstRow: true,
  }) as Record<string, string | number>[]

  const chart_data = data.map((item) => {
    return { x: item.datetime as string, y: Number(item.temperature) }
  })
  const output = { label: 'Summary', data: chart_data }
  return new Response(JSON.stringify(output))
}
