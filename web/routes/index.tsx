/** @jsxImportSource preact */

import { Chart } from "../components/Chart.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Climate
        </title>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost&display=swap"
          rel="stylesheet"
        />
      </Head>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts" />

      <div
        class="flex h-screen w-full justify-center items-center bg-gray-900"
        style="font-family: 'Jost', sans-serif;"
      >
        <Chart label="Summary" />
      </div>
    </>
  );
}
