<script>
  import Activity from "./components/Activity.svelte";
  import Visual from "./components/Visual.svelte";

  //URL for the api (currently blank to pull from files instead)
  const URL = "";

  // fetch the current project data and store it locally
  let projects = [];
  fetch(URL + 'projects_with_colors.json')
      .then(res => res.json())
      .then((data) => {
          projects = data.data;
      });

  //fetch the user's activity and store it locally
  let activities = [];
  fetch(URL + 'user_activity.json')
      .then(res => res.json())
      .then((data) => {
        activities = data.docs;
      });

  /**
   * Updates the local project time totals, sends a POST request to update the server-side file,
   * and hackily updates the visual component
   * @param data svelte custom dispatch event object. contains project, time, and previousProject
   */
  function projectSelection(data) {
      // loops through the current project list checking for a match and updating the time
      for (let project of projects) {
          // adds time to newly selected project
          if (project.doc === data.detail.project) {
              project.time += data.detail.time;
          }
          // subtracts time from previously selected project
          if (project.doc === data.detail.previousProject) {
              project.time -= data.detail.time;
          }
      }

      //dummy POST request to update the project.json file
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects)
      }
      //This assumes no authentication is needed
      fetch(URL + 'projects.json', requestOptions)
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Projects could not be updated');
              }
          });
      
      //reactivity trick to rerender the visual component
      projects = [...projects]; 
    }

</script>

<header class="h-full bg-slate-900 p-4">
  <h1 class="text-slate-100 text-xl">Systecon Technical Interview</h1>
</header>
  <main class="grid grid-cols-[3fr_2fr] gap-1 justify-center p-16 mx-8">
    <div class="w-full h-screen">
      <h1 class="text-2xl mb-2">Activities</h1>
      <div class="flex flex-col gap-1 overflow-scroll h-full pr-6">
        {#each activities as activity}
            <!--on:project selection is an upstream signal that each Activity component can call to announce that a selection has been made-->
            <Activity {activity} {projects} on:projectSelection={projectSelection}/>
        {/each}
      </div>
    </div>
    <div class="w-full">
      <h1 class="text-2xl mb-2">Visualization</h1>
      {#key projects}
      <!--localData prop only for demonstration-->
      <Visual {URL} localData={projects}/>
      {/key}
    </div>
  </main>

