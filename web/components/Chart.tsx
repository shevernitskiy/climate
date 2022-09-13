/** @jsxImportSource preact */

export interface ChartProps {
  label: string;
}

export function Chart(props: ChartProps) {
  const id = Math.random().toString();

  return (
    <>
      <div id={id} class="flex w-full m-auto items-center justify-center" />
      <script
        id={id + "Data"}
        type="application/json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        var chart = new ApexCharts(document.getElementById("${id}"), {
          chart: {
            height: '90%',
            width: '90%',
            fontFamily: 'Jost, sans-serif',
            fontSize: '20px',
            type: "scatter",
            foreColor: '#fff',
            toolbar: {
              show: true,
            },
            zoom: {
              autoScaleYaxis: true
            },
            animations: {
              enabled: false,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                  enabled: true,
                  delay: 150
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350
              }
            },
          },
          grid: {
            borderColor: '#90A4AE88',
          },
          // colors: ['#FCCF31', '#17ead9', '#f02fc2'],
          noData: {
            text: 'Loading...'
          },
          series: [],
          stroke: {
            width: 0.5,
            curve: "straight",
          },
          markers: {
            size: 3,
            strokeWidth: 0,
            hover: {
              size: 9
            }
          },
          legend: {
            show: true,
            showForSingleSeries: false,
            position: "left",
          },
          tooltip: {

          },
          yaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '22px',
              }
            },
            tooltip: {
              enabled: true,
            },
            decimalsInFloat: false,
          },
          xaxis: {
            type: 'datetime',
            labels: {
              show: true,
              style: {
                fontSize: '18px',
              }
            },
            tooltip: {
              enabled: true,
            },
          },
        });

        Promise.all([chart.render(), fetch('/api/chart_data')]).then((values) => {
          return values[1].json()
        }).then(data => {
          console.log(data)
          chart.updateSeries([{
            name: data.label,
            data: data.data
          }])
        })

      `,
        }}
      />
    </>
  );
}

//JSON.parse(document.getElementById("${id}Data").text),
