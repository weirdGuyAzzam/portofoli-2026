<script lang="ts">
	import TerminalWindow from '$lib/TerminalWindow.svelte';
</script>

<svelte:head>
	<title>Azzam - Terminal Portfolio</title>
	<meta name="description" content="An interactive terminal portfolio emulator" />
</svelte:head>

<div class="min-h-screen bg-[#070707] text-[#00ff66]/70 font-mono p-4 md:p-8 flex flex-col items-center justify-center">
	<!-- Main terminal emulator -->
	<main class="w-full max-w-3xl my-auto">
		<TerminalWindow />
	</main>

	<!-- Very clean, authentic console footer -->
	<footer class="mt-8 text-center text-xs text-[#00ff66]/30">
		<p>[ Azzam Portfolio OS v2.26 • Built with SvelteKit ]</p>
	</footer>
</div>
