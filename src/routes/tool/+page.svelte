<script>
    let input;

    function getLinesFromTextarea(textareaValue) {
        // Split the textarea value by newline characters
        const lines = textareaValue.split('\n');

        // Filter out empty lines (if any)
        const nonEmptyLines = lines.filter(line => line.trim() !== '');

        return nonEmptyLines;
    }

    function rearrangeNames(namesArray) {
        return namesArray.map(name => {
            const [lastName, ...rest] = name.split(', ');
            const formattedName = rest.join(' ');
            return `${formattedName} ${lastName}`;
        });
    }

    $: rearranged = input ? rearrangeNames(getLinesFromTextarea(input)) : '';
</script>

<div>
    
    <textarea class="textarea textarea-bordered h-52 w-full text-white mt-20" bind:value={input}></textarea>
    
    <br />
    {#each rearranged as name}
        <p>{name}</p>
    {/each}

</div>
