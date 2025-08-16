<script>
    import { onMount } from "svelte";

    // --- Props you can pass to the component ---
    /** The list of words to cycle through */
    export let words = [
        "Biochemist",
        "Mathematician",
        "Data Scientist",
        "Programmer",
    ];
    /** How fast to type, in milliseconds */
    export let typingSpeed = 150;
    /** How fast to delete, in milliseconds */
    export let deletingSpeed = 100;
    /** How long to pause after a word is typed, in milliseconds */
    export let pauseDuration = 1500;

    // --- Internal state variables ---
    let displayedText = "";
    let wordIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    // This function handles the logic for the typing/deleting loop
    function typeEffectLoop() {
        isPaused = false;
        const currentWord = words[wordIndex];
        let timeoutDuration = typingSpeed;

        if (isDeleting) {
            // --- Deleting phase ---
            displayedText = currentWord.substring(0, displayedText.length - 1);
            timeoutDuration = deletingSpeed;

            // If word is fully deleted, move to the next word and switch to typing
            if (displayedText === "") {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Loop back to the start
            }
        } else {
            // --- Typing phase ---
            displayedText = currentWord.substring(0, displayedText.length + 1);

            // If word is fully typed, pause, then switch to deleting
            if (displayedText === currentWord) {
                isPaused = true;
                isDeleting = true;
                timeoutDuration = pauseDuration;
            }
        }

        // Call the loop again after the calculated duration
        setTimeout(typeEffectLoop, timeoutDuration);
    }

    // onMount ensures the loop only starts when the component is loaded in the browser
    onMount(() => {
        // Start the effect
        setTimeout(typeEffectLoop, typingSpeed);
    });
</script>

<span class="flytext">
    {displayedText}
    <span class="cursor !bg-cyan-400" class:blinking={isPaused}></span>
</span>

<style>
    .cursor {
        display: inline-block;
        width: 10px;
        height: 0.75em;
        background-color: currentColor;
        vertical-align: center;
        margin-left: -5px;
    }

    .blinking {
        animation: blink 1s step-end infinite;
    }

    /* CSS Keyframe animation for the blinking effect */
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>
