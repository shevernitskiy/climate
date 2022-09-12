/** @jsxImportSource preact */

import { Chart } from "../components/Chart.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Graph
        </title>
        <link
          href="https://fonts.googleapis.com/css2?family=Commissioner:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts" />
      <div
        class="p-4 flex h-screen justify-center items-center bg-blue-900"
        style="font-family: 'Commissioner', sans-serif;"
      >
        <Chart label="Summary" />
      </div>
    </>
  );
}
