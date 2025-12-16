# Rotate
An example of using Motion's animate function to rotate an element. Simple rotation animation using the rotate transform property.

Platform: Javascript
Category: Fundamentals
Featured APIs: animate

### Example Code
```
<div class="box"></div>

<script type="module">
  import { animate } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm"

  animate(".box", { rotate: 360 }, { duration: 1 })
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
