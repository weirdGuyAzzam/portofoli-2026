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
    class="crt-screen crt-flicker bg-[#080808] border-2 border-[#00ff66]/30 rounded shadow-[0_0_20px_rgba(0,255,102,0.05)] overflow-hidden w-full mx-auto font-mono"
>
    <!-- Vintage Terminal Title bar -->
    <div
        class="flex items-center justify-between px-4 py-1.5 bg-[#0d0d0d] border-b border-[#00ff66]/25 select-none"
    >
        <span class="text-[11px] text-[#00ff66]/50">azzam-terminal-session-0</span>
        <span class="text-[11px] text-[#00ff66]/80 font-bold tracking-wider">[ AZZAM-PORTFOLIO-OS v2.26 ]</span>
        <div class="flex gap-3 text-[11px] text-[#00ff66]/40">
            <span>[ _ ]</span>
            <span>[ 🗖 ]</span>
            <span class="text-red-500/70 hover:text-red-500 cursor-pointer">[ X ]</span>
        </div>
    </div>

    <!-- Output area -->
    <TerminalOutput {lines} />

    <!-- Input area -->
    <div class="px-4 py-3 bg-[#070707] border-t border-[#00ff66]/20">
        <CommandInput onSubmit={handleCommandSubmit} {inputRef} />
    </div>

    <!-- Retro TUI Function keys bar -->
    <div
        class="flex flex-wrap gap-x-4 gap-y-2 justify-center px-4 py-2 bg-[#0c0c0c] border-t border-[#00ff66]/15 text-xs text-[#00ff66]/60"
    >
        {#each [
            { key: "F1", name: "banner" },
            { key: "F2", name: "about" },
            { key: "F3", name: "skills" },
            { key: "F4", name: "contact" },
            { key: "F5", name: "neofetch" },
            { key: "F6", name: "help" }
        ] as { key, name }}
            <button
                onclick={() => runCommand(name)}
                class="hover:text-[#00ff66] transition-colors cursor-pointer flex items-center select-none text-[11px]"
            >
                <span class="bg-[#00ff66]/10 border border-[#00ff66]/30 px-1 py-0.5 rounded text-[#00ff66] text-[9px] font-bold mr-1.5">{key}</span>
                <span>{name}</span>
            </button>
        {/each}
    </div>
</div>
