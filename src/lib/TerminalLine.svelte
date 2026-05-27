<script lang="ts">
	interface Props {
		type?: 'input' | 'output' | 'error' | 'info' | 'ascii';
		content: string;
	}

	let { type = 'output', content }: Props = $props();

	const getClass = () => {
		switch (type) {
			case 'input':
				return 'text-[#00ff66] phosphor-glow font-bold';
			case 'error':
				return 'text-[#ff3333] font-bold';
			case 'ascii':
				return 'text-[#00dd55] leading-none';
			case 'info':
				return 'text-[#00b34a] font-semibold';
			default:
				return 'text-[#ececec]/90';
		}
	};

	const getPrefix = () => {
		switch (type) {
			case 'input':
				return 'visitor@azzam-dev:~$ ';
			default:
				return '';
		}
	};
</script>

<div class="flex items-start gap-2 mb-1">
	{#if type === 'input'}
		<span class="text-[#00ff66]/60 font-bold mt-0.5">{getPrefix()}</span>
		<span class="{getClass()} whitespace-pre-wrap">{content}</span>
	{:else}
		<span class="{getClass()} whitespace-pre-wrap">{content}</span>
	{/if}
</div>
