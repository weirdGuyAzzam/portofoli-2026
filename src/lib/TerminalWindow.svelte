<script lang="ts">
    import { browser } from "$app/environment"; // 1. Add this import at the top
    import TerminalOutput from "$lib/TerminalOutput.svelte";
    import CommandInput from "$lib/CommandInput.svelte";
    import { terminal } from "$lib";
    import { onMount } from "svelte";

    // Terminal lines from store - use $derived since it's a getter
    let lines = $derived(browser ? $terminal : []);

    // Refs for focus
    let inputRef = $state(undefined as HTMLInputElement | undefined);

    // Run initial commands on mount
    onMount(async () => {
        await terminal.runInitialCommands();
        // Focus input after initial commands
        setTimeout(() => {
            inputRef?.focus();
        }, 100);
    });

    const handleCommandSubmit = async (command: string) => {
        if (!command.trim()) return;
        await terminal.runCommand(command);
        // Refocus after command
        setTimeout(() => {
            inputRef?.focus();
        }, 50);
    };

    const runCommand = (command: string) => {
        handleCommandSubmit(command);
    };
</script>

<div
    role="application"
    aria-label="Interactive terminal portfolio"
    class="bg-gray-950 border border-green-500/30 rounded-lg shadow-2xl overflow-hidden max-w-2xl mx-auto my-8 md:my-10"
>
    <!-- Title bar -->
    <div
        class="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-green-500/20"
    >
        <div class="flex gap-1.5">
            <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span class="text-xs text-green-500/60 font-mono ml-2"
            >visitor@portfolio:~</span
        >
    </div>

    <!-- Output area -->
    <TerminalOutput {lines} />

    <!-- Input area -->
    <div class="px-4 py-3 bg-gray-900 border-t border-green-500/20">
        <CommandInput onSubmit={handleCommandSubmit} {inputRef} />
    </div>

    <!-- Quick command chips -->
    <div
        class="flex flex-wrap gap-2 px-4 py-2 bg-gray-950 border-t border-green-500/10"
    >
        {#each ["banner", "about", "skills", "contact", "neofetch", "help"] as cmd}
            <button
                onclick={() => runCommand(cmd)}
                class="text-xs font-mono text-green-500/70 hover:text-green-400 hover:bg-green-500/10 px-2 py-1 rounded transition-colors cursor-pointer"
            >
                {cmd}
            </button>
        {/each}
    </div>
</div>
