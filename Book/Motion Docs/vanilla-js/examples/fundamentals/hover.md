# Hover
An example of using Motion's hover function to animate elements as a user hovers over them. hover() automatically filters out polyfilled hover events from touch screens, which can normally lead to broken visual states.

Platform: Javascript
Category: Fundamentals
Featured APIs: animate, hover

### Example Code
```
<div class="box"></div>

<script type="module">
    import { animate, hover } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm"

    hover(".box", (element) => {
        animate(element, { scale: 1.3 })

        return () => animate(element, { scale: 1 })
    })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #9911ff;
        border-radius: 10px;
    }
</style>
```
