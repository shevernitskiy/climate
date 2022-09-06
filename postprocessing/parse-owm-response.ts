import * as path from 'https://deno.land/std@0.154.0/path/mod.ts'

const filename = path.resolve(Deno.args[0])
const data = JSON.parse(await Deno.readTextFile(filename))

let summary_temp = 0

data.list.forEach((point) => {
  const record: string[] = []

  summary_temp += point.main.temp

  record.push(
    new Date(point.dt * 1000).toISOString(),
    point.main.temp,
    point.main.pressure,
    point.main.humidity,
    point.wind.speed,
    point.wind.deg,
    point.weather[0].main,
  )

  Deno.writeTextFile(path.resolve(`./data/${point.name}.csv`), record.join(',') + '\n', { append: true })
})

Deno.writeTextFile(
  path.resolve(`./data/Summary.csv`),
  `${new Date(data.list[0].dt * 1000).toISOString()},${Math.round((summary_temp * 100) / data.list.length) / 100}`,
  { append: true },
)
