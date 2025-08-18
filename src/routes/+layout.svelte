<script>
	export const prerender = true;
	export const ssr = true;

	import "../app.css";
	import Footer from "../components/Footer.svelte";
	import Header from "../components/Header.svelte";
	import { onMount } from "svelte";

	let y;

	function goTop() {
		// This function will only run on the client, so document is safe to use.
		document.body.scrollIntoView({ behavior: "smooth" });
	}

	// This will hold our component, but it starts as null on the server.
	// Renamed for clarity and consistency.
	let GravityComponent = null;

	// onMount only runs in the browser
	onMount(async () => {
		// Dynamically import the component only when we are on the client
		const { default: Gravity } = await import(
			"../components/Gravity.svelte"
		);
		// Assign to the correctly named variable
		GravityComponent = Gravity;
	});
</script>

<div class="absolute top-0 left-0 w-full h-screen z-[-1] opacity-70">
	{#if GravityComponent}
		<svelte:component this={GravityComponent} />
	{/if}
</div>

<div
	class="relative flex min-h-screen flex-col max-w-[1400px] mx-auto w-full text-sm sm:text-base"
>
	<div
		class="fixed bottom-0 w-full max-w-[1400px] duration-200 flex p-10 z-[20]"
		class:opacity-100={y > 200}
		class:pointer-events-auto={y > 200}
		class:opacity-0={y <= 200}
		class:pointer-events-none={y <= 200}
	>
		<button
			on:click={goTop}
			class="ml-auto rounded-full bg-slate-900 text-cyan-400 px-3 sm:px-4 text-lg hover:bg-slate-800 cursor-pointer aspect-square"
			aria-label="Scroll to toip"
		>
			<i class="fa-solid fa-arrow-up"></i>
		</button>
	</div>

	<Header {y} />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>

<svelte:window bind:scrollY={y} />
