<script lang="ts">
    import { createCommandInput } from "$lib/terminal";
    import type { CommandInputProps as BaseProps } from "$lib/terminal";

    // 1. Keep your extended type interface
    interface CommandInputProps extends BaseProps {
        inputRef?: HTMLInputElement | undefined;
    }

    // 2. Destructure your props normally
    let { onSubmit, inputRef }: CommandInputProps = $props();

    // 3. Create a dedicated LOCAL mutable state variable for the DOM ref
    let localInputRef = $state<HTMLInputElement | undefined>(undefined);

    const { props: inputProps, events } = createCommandInput({
        onSubmit: (value) => {
            if (onSubmit) onSubmit(value);
        },
    });

    // 4. Use an effect to link them: when localInputRef changes, update the parent's prop
    $effect(() => {
        if (localInputRef && inputRef !== undefined) {
            inputRef = localInputRef;
        }
    });
    // this still has the same error
</script>

<div class="flex items-center gap-2 font-mono">
    <span class="text-green-600">azzam@portfolio:~$</span>
    <input
        {...inputProps}
        {...events}
        bind:this={inputRef}
        aria-label="Enter command"
        aria-describedby="command-hint"
    />
</div>
<span id="command-hint" class="sr-only"
    >Press Enter to execute command, Arrow Up/Down to navigate history</span
>
