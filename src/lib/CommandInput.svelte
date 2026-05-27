<script lang="ts">
    import { createCommandInput } from "$lib/terminal";
    import type { CommandInputProps as BaseProps } from "$lib/terminal";

    interface CommandInputProps extends BaseProps {
        inputRef?: HTMLInputElement | undefined;
    }

    let { onSubmit, inputRef }: CommandInputProps = $props();
    let localInputRef = $state<HTMLInputElement | undefined>(undefined);
    let inputValue = $state("");

    // 1. Create reactive states to hold Melt UI's properties safely
    let inputProps = $state<any>({});
    let events = $state<any>({});

    // 2. Wrap the builder call in an $effect so it ONLY runs in the browser
    $effect(() => {
        const { props: compiledProps, events: compiledEvents } =
            createCommandInput({
                onSubmit: (value) => {
                    if (onSubmit) onSubmit(value);
                    inputValue = "";
                },
            });

        // 3. Assign them to your state variables
        inputProps = compiledProps;
        events = compiledEvents;
    });

    $effect(() => {
        if (localInputRef && inputRef !== undefined) {
            inputRef = localInputRef;
        }
    });
</script>

<div
    class="flex items-center gap-2 font-mono text-sm select-none relative w-full"
>
    <span class="text-[#00ff66]/60 font-bold shrink-0"
        >visitor@azzam-dev:~$</span
    >
    <div class="relative grow flex items-center h-5">
        <!-- Rendered text layer with the blinking custom cursor block -->
        <div
            class="absolute inset-y-0 left-0 flex items-center pointer-events-none text-[#00ff66] phosphor-glow whitespace-pre font-mono text-sm leading-none"
        >
            <span>{inputValue}</span><span
                class="animate-block-blink w-2 h-3.5 inline-block ml-0.5 align-middle"
            ></span>
        </div>

        <!-- Real input element: text transparent, caret transparent, overlaying the display layer -->
        <input
            {...inputProps}
            {...events}
            bind:value={inputValue}
            bind:this={localInputRef}
            class="w-full bg-transparent outline-none border-none text-transparent caret-transparent font-mono text-sm leading-none absolute inset-0 z-10 selection:bg-[#00ff66]/30 selection:text-[#00ff66]/10"
            aria-label="Enter command"
            aria-describedby="command-hint"
        />
    </div>
</div>
<span id="command-hint" class="sr-only"
    >Press Enter to execute command, Arrow Up/Down to navigate history</span
>
