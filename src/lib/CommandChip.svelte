<script lang="ts">
    interface Props {
        command: string;
        onRun: (command: string) => void;
    }

    let { command, onRun }: Props = $props();

    const handleClick = () => {
        onRun(command);
    };
</script>

<button
    onclick={handleClick}
    class="border border-green-500/50 rounded px-2 py-1 text-xs hover:bg-green-500/10 transition-colors font-mono text-green-400 cursor-pointer"
>
    {command}
</button>
