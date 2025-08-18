<script>
    import Step from "./Step.svelte";

    import Footer from "./Footer.svelte";

    import TypingEffect from "./TypingEffect.svelte";

    import { Atom } from "lucide-svelte";

    let steps = [
        {
            name: "CDS Finder",
            icon: "fa-solid fa-search",
            href: "https://github.com/Vassar-RiboLab/transcript-utils",
        },
        {
            name: "Eyetracker",
            icon: "fa-solid fa-eye",
            href: "https://github.com/jspsych/eyetracking-utils",
        },
        { name: "n-Body", icon: "fa-solid fa-circle", href: "" },
        { name: "Kinetica", icon: Atom, href: "" },
    ];

    let benefits = [
        {
            name: "a biochemist",
            description:
                "I have been captivated by biochemical systems since first learning about the central dogma of biology, which inspired me to pursue an undergraduate degree in biochemistry. Over time, this curiosity has evolved into a desire to use data science and mathematics to unravel complex biological problems, with the long-term vision of reducing disease and enhancing human health and lifespan.",
        },
        {
            name: "a mathematician",
            description:
                "My journey as a mathematician began in my freshman year of college, sparked by a fascination with dynamical systems. Courses in linear algebra and differential equations opened a new lens for understanding physics and computer science. Motivated to deepen this perspective, I pursued a second major in mathematics, exploring nonlinear dynamics, numerical methods, and statistical modeling—tools that now empower me to tackle complex research challenges.",
        },
        {
            name: "a data scientist",
            description:
                "I love exploring complex datasets and experimenting with the right mix of methods—whether simple regression, tree-based models like random forest or XGBoost, or transformer-based deep learning approaches. My focus is not just on prediction accuracy, but on uncovering the meaningful relationships hidden in data. I have trained models on high-performance clusters and automated hyperparameter tuning with tools like Weights & Biases. Recently, I applied random forest and XGBoost to reveal connections between mRNA structure and a translation initiation factor.",
        },
        {
            name: "a developer",
            description:
                "I am passionate about programming and continuously refining my skills. I thrive on turning ideas into functional, tangible solutions, adapting quickly through online learning, experimentation, and hands-on practice. I particularly enjoy learning by building projects, such as this website, created with Svelte, or my n-Body simulation built in p5.js. In addition to these tools, I have extensive experience with Python and R.",
        },
    ];
</script>

<main class="flex flex-col flex-1 p-4">
    <section
        id="introPage"
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14"
    >
        <div class="flex flex-col text-left gap-6 md:gap-8">
            <h2 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                <span class="poppins text-cyan-400"
                    >Hi! My name is Colin Mikulski</span
                >
            </h2>
            <h2 class="font-semibold text-2xl sm:text-3xl md:text-4xl">
                I am a <TypingEffect />
            </h2>
            <a
                class="inline-block md:hidden lg:hidden blueShadow mx-auto lg:mr-0 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3
                group rounded-full bg-white text-slate-950 cursor-pointer"
                href="#contact"
            >
                <div
                    class="absolute top-0 right-full w-full h-full bg-cyan-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
                ></div>
                <h4 class="relative z-9">Get in touch &rarr;</h4>
            </a>
        </div>
        <div class="relative shadow-2xl grid place-items-center">
            <!-- Insert image below: -->
            <!-- <img=("images/") -->
        </div>
    </section>

    <section id="projects" class="scroll-mt-15 py-40 flex flex-col gap-10">
        <div class="flex flex-col gap-2 text-center">
            <h6 class="text-large sm:text-xl md:text-2xl">
                A few of my creative endeavors.
            </h6>
        </div>
        <div
            class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8 text-sm"
        >
            <Step step={steps[0]}>
                <p>
                    Python tool for extracting information from long-read mRNA
                    transcripts, capable of handling multiple and overlapping
                    coding sequences (CDS), and well-suited for identifying
                    untranslated regions for translatomics. Will eventually
                    support de novo CDS identification.
                </p>
            </Step>
            <Step step={steps[1]}>
                <p>
                    High-performance webcam-based eye tracker that matches or
                    exceeds competing tools, leveraging deep learning techniques
                    to accurately predict a subject's gaze location. I designed
                    most of the data pipeline which converts raw videos of
                    subjects into usable training data.
                </p>
            </Step>
            <Step step={steps[2]}>
                <p>
                    2D browser-based gravity simulation created in p5.js
                    featuring collision detection and mouse interaction.
                    Parameter tuning enables dynamic and visually interesting
                    particle behaviors, such as the coordination shown above.
                    Stay tuned for a more interactive stand-alone version!
                </p>
            </Step>
        </div>
    </section>
    <section
        id="about"
        class="scroll-mt-20 py-20 pt-0 lg:pt-16 lg:py-20 flex flex-col gap-10 sm:gap-10 md:gap-10 relative"
    >
        <div
            class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-cyan-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-cyan-700 py-4"
        >
            <h6 class="text-lg sm:text-xl md:text-2xl">Want to learn more?</h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                A bit <span class="poppins text-cyan-400">about</span> me.
            </h3>
        </div>
        <p class="mx-auto poppins font-semibold text-lg sm:text-xl md:text-2xl">
            I am...
        </p>
        <div class="flex flex-col gap-20 w-full mx-auto max-w-[800px]">
            {#each benefits as benefit, index}
                <div class="flex gap-6 sm:gap-8">
                    <p
                        class="poppins text-4xl sm:text-5xl md:text-6xl text-slate-500 font-semibold"
                    >
                        0{index + 1}
                    </p>
                    <div class="flex flex-col gap-6 sm:gap-8">
                        <h3 class="text-2xl sm:text-3xl md:text-5xl">
                            {benefit.name}
                        </h3>
                        <p>{benefit.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</main>
