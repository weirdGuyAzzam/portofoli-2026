<script lang="ts">
    import TerminalLine from "$lib/TerminalLine.svelte";

    interface Props {
        lines: { type: string; content: string }[];
    }

    let { lines }: Props = $props();

    let container = $state<HTMLElement | null>(null);

    $effect(() => {
        lines; // Access lines to register it as a dependency for auto-scroll tracking
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    });
</script>

<div
    role="log"
    aria-live="polite"
    class="flex flex-col gap-0.5 overflow-y-auto h-96 md:h-125 lg:h-150 p-4 font-mono text-sm scrollbar-thin scrollbar-track-black scrollbar-thumb-green-900/30 scrollbar-thumb-hover:green-900/50"
    bind:this={container}
>
    {#each lines as line, i}
        <TerminalLine type={line.type as any} content={line.content} />
    {/each}
</div>
