# Gestures
An example of using Motion's press and hover functions to animate elements as a user presses and hovers over them.

Platform: Javascript
Category: Fundamentals
Featured APIs: animate, press, hover

### Example Code
```
<div class="box"></div>

<script type="module">
    import { animate, press, hover } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm"

    const gestureState = new WeakMap()

    const transition = { type: "spring", stiffness: 500, damping: 25 }

    const initialState = {
        isHovered: false,
        isPressed: false,
    }

    function setGesture(element, update) {
        const state = gestureState.get(element) || { ...initialState }
        const newState = { ...state, ...update }
        gestureState.set(element, newState)

        let scale = 1
        if (newState.isPressed) {
            scale = 0.8
        } else if (newState.isHovered) {
            scale = 1.2
        }

        animate(element, { scale }, transition)
    }

    hover(".box", (element) => {
        setGesture(element, { isHovered: true })
        return () => setGesture(element, { isHovered: false })
    })

    press(".box", (element) => {
        setGesture(element, { isPressed: true })
        return () => setGesture(element, { isPressed: false })
    })
</script>

<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #dd00ee;
        border-radius: 10px;
        cursor: pointer;
    }

    .box:focus-visible {
        outline: 2px solid #8df0cc;
        outline-offset: 2px;
    }
</style>
```
