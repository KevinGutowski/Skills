# Press
An example of using Motion's press function to animate elements as a user presses them. press() automatically filters out right clicks and secondary touch points. Every element with a press gesture is keyboard accessible by default.

Platform: Javascript
Category: Fundamentals
Featured APIs: animate, press

### Example Code
```
<div class="box"></div>

<script type="module">
    import { animate, press } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm"

    press(".box", (element) => {
        animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 })

        return () =>
            animate(element, { scale: 1 }, { type: "spring", stiffness: 500 })
    })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #8df0cc;
        border-radius: 10px;
        cursor: pointer;
    }

    .box:focus-visible {
        outline: 2px solid #8df0cc;
        outline-offset: 2px;
    }
</style>
```
