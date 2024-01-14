<script>
    import { state } from '$lib/stores.js'
    import Container from '$lib/Container.svelte'

    let chatMessages = [];
    let inputStr;
    let loading = false;

    let choices = [];


    async function handleSubmit() {
    if(!inputStr){
        return
    }
    loading = true;
    const inputObj = {content: inputStr, role: "user"}
    const partInputObj = {parts: [{ text: inputStr }], role: "user"}

    


    if(inputStr.includes("ChatGPT")){
        setTimeout(() => {
            chatMessages.pop()
            chatMessages.push({content: "Sorry! I can't help you with that.", role: "model"})
           chatMessages = chatMessages;
            inputStr = "";
            loading = false;
        }, 1800)
        
        return
    }
    inputStr = "";
    
    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: chatMessages,
                message: inputObj.content
            })
        });

        chatMessages.push(partInputObj);
        
        const data = await response.json();
        console.log(JSON.stringify(data))
        chatMessages.push({parts: [{text: data.content}], role: "model"})
        
        chatMessages = chatMessages;
        loading = false;

        
    } catch (error) {
        console.error('Error:', error);
        chatMessages.pop()
        chatMessages.push({content: `Sorry! I can't answer that.`, role: "model"})
        chatMessages = chatMessages;
        loading = false;
    }
}

function removeTextInBrackets(inputString) {
  // Use a regular expression to match and remove text inside brackets
  return inputString.replace(/\[.*?\]/g, '');
}

</script>

<Container>
    {#each chatMessages as message}
        {#if message.role == "model"}
        <div class="chat chat-start">
            <div class="chat-bubble chat-bubble-secondary">{@html removeTextInBrackets(message.parts[0].text)}</div>
        </div>
        {/if}
        {#if message.role == "user"}
        <div class="chat chat-end">
            <div class="chat-bubble chat-bubble-accent">{message.parts[0].text}</div>
        </div>
        {/if}
    {/each}
</Container>

<div class="w-full grid place-items-center mt-20 absolute bottom-20 px-5">
    <div class="max-w-xl w-full h-full">
        <form on:submit|preventDefault={handleSubmit} class="flex w-full gap-2">
            <input bind:value={inputStr} type="text" placeholder="Type here" class="input input-bordered w-full" />
            <button class="btn btn-square btn-ghost" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91"/></svg>
            </button>
        </form>
    </div>
</div>
