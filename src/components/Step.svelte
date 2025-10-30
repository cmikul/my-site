<script>
    export let step;
</script>

<a
    href={step.href}
    target={step.href.startsWith("http") ? "_blank" : null}
    class="p-4 sm:p-6 md:p-7 flex flex-col gap-4 rounded-lg border border-solid border-cyan-700 text-center group cursor-pointer hover:border-cyan-600 duration-200"
>
    <div
        class="bg-slate-950 grid place-items-center px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-14 lg:-mt-16 mx-auto duration-200"
    >
        {#if typeof step.icon === 'string'}
            <i class={step.icon}></i>
        {:else}
            <svelte:component this={step.icon} class="w-14 h-14" />
        {/if}
    </div>
    <h3 class="font-medium text-xl sm:text-2xl md:text-3xl">{step.name}</h3>
    <slot></slot>
    <div class="flex-1 flex justify-between gap-4 items-center">
        <div
            class="ml-auto cursor-pointer hover:text-slate-950 duration-200 relative after:absolute after:top-0 after:h-0 after:right-full after:w-full after:h-full after:bg-white after:duration-200 hover:after:translate-x-full after:z-[-1] overflow-hidden"
        >
            <p class="relative z-4">Github&rarr;</p>
        </div>
    </div>
</a>
