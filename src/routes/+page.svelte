<script lang="ts">
	import TerminalWindow from '$lib/TerminalWindow.svelte';
</script>

<svelte:head>
	<title>Portfolio Terminal</title>
	<meta name="description" content="An interactive terminal portfolio built with SvelteKit" />
</svelte:head>

<div class="min-h-screen bg-slate-900 text-green-400 font-mono p-4 md:p-8 flex flex-col items-center">
	<!-- Background decoration -->
	<div class="fixed inset-0 pointer-events-none opacity-5">
		<div class="absolute top-10 left-10 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
		<div class="absolute bottom-10 right-10 w-96 h-96 bg-green-600 rounded-full blur-3xl"></div>
	</div>

	<!-- Header -->
	<header class="relative z-10 mb-8 text-center">
		<h1 class="text-2xl md:text-3xl font-bold text-green-500 mb-2">Interactive Terminal Portfolio</h1>
		<p class="text-green-600/70 text-sm">
			Type <span class="text-green-400 font-bold">"help"</span> to see available commands
		</p>
	</header>

	<!-- Main terminal -->
	<TerminalWindow />

	<!-- Footer -->
	<footer class="relative z-10 mt-12 text-center text-sm text-green-700/50">
		<p>Built with SvelteKit + Melt UI + Tailwind CSS</p>
	</footer>
</div>
