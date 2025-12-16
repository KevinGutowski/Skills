# Layout cameras

`LayoutCamera` and `LayoutOrthographicCamera` allow us to involve React Three Fiber scenes in Motion's [layout animations](/docs/react-layout-animations.md).

## Usage

Motion's [layout animations](/docs/react-layout-animations.md) work via the `transform` style. A drawback to animating `width` and `height` via `transform` is imagery can become distorted.

When involving a React Three Fiber scene into a layout animation, we can use Motion's `LayoutCamera` and `LayoutOrthographicCamera` components to pre-distort a 3D scene so that when the CSS `transform` is applied to the host `canvas` element, it looks correct throughout the animation.

To implement a camera, we first nee to replace `Canvas` from `@react-three/fiber` with [the](/docs/react-three-fiber-motion-canvas.md) `[MotionCanvas](/docs/react-three-fiber-motion-canvas.md)` [component](/docs/react-three-fiber-motion-canvas.md). Then, one of the camera components can be added anywhere within the scene:

```
import { MotionCanvas, LayoutCamera } from "framer-motion"

function Scene() {
  <MotionCanvas>
    <LayoutCamera />
    <Box />
  </MotionCanvas>
}
```

`LayoutCamera` provides a normal perspective camera:

Whereas `LayoutOrthographicCamera` provides an orthographic view:

## Props

Internally, `LayoutCamera` renders a `<motion.perspectiveCamera />` and `LayoutOrthographicCamera` renders a `<motion.orthographicCamera />` component, so they can accept all the usual React Three Fiber props like `position` and `zoom`, as well as `motion` props like `initial` and `animate`.

```
<LayoutCamera
  position={[0, 0, 5]}
  zoom={20}
  animate={{ zoom: 100 }}
  transition={{ duration: 2 }}
/>
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-three-fiber-layout-cameras](https://motion.dev/docs/react-three-fiber-layout-cameras).
      