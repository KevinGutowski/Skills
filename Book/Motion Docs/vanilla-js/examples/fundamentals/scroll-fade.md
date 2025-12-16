# Scroll fade in/out
An example of using Motion's scroll function with multi-keyframe animations to fade elements in and out as they enter and leave the viewport. Elements fade in as they approach, stay visible while in view, and fade out as they leave.

Platform: Javascript
Category: Scroll animations
Featured APIs: animate, scroll

### Example Code
```
<section class="img-container">
  <div>
    <img src="/photos/cityscape/1.jpg" />
    <h2>#001</h2>
  </div>
</section>
<section class="img-container">
  <div>
    <img src="/photos/cityscape/2.jpg" />
    <h2>#002</h2>
  </div>
</section>
<section class="img-container">
  <div>
    <img src="/photos/cityscape/3.jpg" />
    <h2>#003</h2>
  </div>
</section>
<section class="img-container">
  <div>
    <img src="/photos/cityscape/4.jpg" />
    <h2>#004</h2>
  </div>
</section>
<section class="img-container">
  <div>
    <img src="/photos/cityscape/5.jpg" />
    <h2>#005</h2>
  </div>
</section>
<div class="progress"></div>

<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm"

  document.querySelectorAll(".img-container > div").forEach((item) => {
    scroll(animate(item, { opacity: [0, 1, 1, 0] }), {
      target: item,
      offset: ["start end", "end end", "start start", "end start"],
    })
  })
</script>

<style>
  .img-container {
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .img-container > div {
    width: 300px;
    height: 400px;
    margin: 20px;
    background: #f5f5f5;
    overflow: hidden;
  }

  .img-container img {
    width: 300px;
    height: 400px;
  }

  .img-container h2 {
    color: #0cdcf7;
    margin: 0;
    font-family: "Azeret Mono", monospace;
    font-size: 50px;
    font-weight: 700;
    letter-spacing: -3px;
    line-height: 1.2;
    position: absolute;
    display: inline-block;
    top: calc(50% - 25px);
    left: calc(50% + 120px);
  }
</style>
```
