<script lang="ts">
	interface Props {
		type?: 'input' | 'output' | 'error' | 'info' | 'ascii';
		content: string;
	}

	let { type = 'output', content }: Props = $props();

	const getClass = () => {
		switch (type) {
			case 'input':
				return 'text-green-400';
			case 'error':
				return 'text-red-400';
			case 'ascii':
				return 'text-green-300 font-bold';
			case 'info':
				return 'text-green-500';
			default:
				return 'text-green-300';
		}
	};

	const getPrefix = () => {
		switch (type) {
			case 'input':
				return '$ ';
			default:
				return '';
		}
	};
</script>

<div class="flex items-start gap-2 mb-1">
	{#if type === 'input'}
		<span class="text-green-600 mt-0.5">{getPrefix()}</span>
		<span class="{getClass()} whitespace-pre-wrap">{content}</span>
	{:else}
		<span class="{getClass()} whitespace-pre-wrap">{content}</span>
	{/if}
</div>
