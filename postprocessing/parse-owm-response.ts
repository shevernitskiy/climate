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

const avg_temp = Math.round((summary_temp * 10000) / data.list.length) / 10000
Deno.writeTextFile(path.resolve(`./data/Summary.csv`), `${new Date(Date.now()).toISOString()},${avg_temp}\n`, { append: true })
