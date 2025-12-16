# Lightbox
An example of a lightbox shared element transitionusing Motion's view function.


Platform: Javascript
Category: Fundamentals
Featured APIs: press, view animations, spring
Motion+ Exclusive

### Example Code
```
<nav>
    <ul class="items-container">
        <li>
            <img
                src="/photos/japan/1.jpg"
                alt="Japan"
                width="200"
                height="150"
            />
        </li>
        <li>
            <img
                src="/photos/japan/2.jpg"
                alt="Japan"
                width="150"
                height="200"
            />
        </li>
        <li>
            <img
                src="/photos/japan/3.jpg"
                alt="Japan"
                width="200"
                height="150"
            />
        </li>
        <li>
            <img
                src="/photos/japan/4.jpg"
                alt="Japan"
                width="200"
                height="150"
            />
        </li>
        <li>
            <img
                src="/photos/japan/5.jpg"
                alt="Japan"
                width="150"
                height="200"
            />
        </li>
        <li>
            <img
                src="/photos/japan/6.jpg"
                alt="Japan"
                width="200"
                height="150"
            />
        </li>
    </ul>
</nav>

<div id="overlay">
    <img src="" alt="" />
</div>

<script type="module">
    import { press, animateView } from "https://cdn.jsdelivr.net/npm/motion-dom@12.23.12/+esm"
    import { spring } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm"

    const overlay = document.getElementById("overlay")
    const overlayImage = overlay.querySelector("img")

    const transition = { type: spring, visualDuration: 0.5, bounce: 0.2 }

    let selectedImage = null

    async function openLightbox(image) {
        const { src } = image
        image.style.viewTransitionName = "selected"
        selectedImage = image

        animateView(() => {
            // Set overlay image URL
            overlayImage.src = src
            overlayImage.style.viewTransitionName = "selected"

            // Hide the old image
            image.style.viewTransitionName = ""
            image.style.visibility = "hidden"

            // Show the overlay
            overlay.style.display = "flex"
        }, transition).enter({ opacity: 1 })

        press(
            overlay,
            () => {
                closeLightbox()
            },
            { once: true }
        )
    }

    async function closeLightbox() {
        const animation = await animateView(() => {
            overlay.style.display = "none"
            selectedImage.style.visibility = "visible"
            selectedImage.style.viewTransitionName = "selected"
        }, transition).enter({ opacity: 1 })

        await animation.finished

        selectedImage.style.viewTransitionName = ""
        selectedImage = null
    }

    press(".items-container img", (element) => {
        openLightbox(element)
    })
</script>

<style>
    .items-container {
        display: flex;
        max-width: 700px;
        flex-wrap: wrap;
        gap: 20px;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .items-container li {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .items-container img {
        cursor: pointer;
    }

    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
    }

    #overlay img {
        width: 90vw;
        max-width: 500px;
    }
</style>
```
