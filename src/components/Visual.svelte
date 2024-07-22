<script>
// @ts-nocheck
  import { Chart, Card} from 'flowbite-svelte';
  import { generatePieChartData } from '../lib/utils';

  export let URL;
  // just for updating the chart without a backend
  export let localData;

  let projectData = fetch(URL + 'projects_with_colors.json')
      .then(res => res.json())
      .then((data) => {
          // let times = data.data.map(project => project.time);
          // let colors = data.data.map(project => project.color);
          // let labels = data.data.map(project => project.doc);

          //pull data from local projects file instead of pulling from server
          let times = localData.map(project => project.time);
          let colors = localData.map(project => project.color);
          let labels = localData.map(project => project.doc);
          return generatePieChartData(times, colors, labels);
      });
</script>
  
{#await projectData then projectData}
  <Card size="lg">  
    <Chart options={projectData} class="py-6" />
  </Card>
{/await}