<script>
    import { Card, Select } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';
    import { formatTime } from '../lib/utils.js';
    const dispatch = createEventDispatcher();

    export let activity;
    export let projects; 

    let selected;
    let previouslySelected = "";
    //changes time format from pure seconds to a more readable H:MM:SS
    let duration = formatTime(activity.time);

    /**
     * When the user selects a project, that choice is dispatched to update the project times
     */
    function handleChoice() {
        dispatch('projectSelection', {
            project: selected,
            time: activity.time,
            previousProject: previouslySelected
        } );
        //store current selection for next time
        previouslySelected = selected;
    }

</script>

<Card padding="sm" class="w-full max-w-full">
    <div class="flex justify-between">
        <p class="text-lg font-bold">{activity.app}</p>
        <div class="text-xl font-semibold">{duration}</div>
    </div>
    <div class="flex justify-between mt-1">
        <p class="text-base">{activity.doc}</p>
        <Select size="sm" class="w-1/2" bind:value={selected} on:change={handleChoice} placeholder="Choose a project...">
            <!--Fills the Select object's options with all available projects.  Value is set to the project's doc name-->
            {#each projects as project}
                <option value={project.doc}>{project.doc}</option>
            {/each}
        </Select>
    </div>
</Card>