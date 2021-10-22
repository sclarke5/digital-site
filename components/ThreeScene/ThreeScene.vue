<template>
  <div id="threescene">
    <div id="container">
      <span id="serviceText"></span>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

class ShapeObject {
  constructor(shapes, shapeEl, color) {
    this.shapes = shapes
    this.current = shapeEl
    this.color = color
  }

  whenOver() {
    // this.x = x
    // this.y = y

    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].material = new THREE.MeshLambertMaterial({
        map: this.color,
        transparent: true,
      })

      new TWEEN.Tween(this.shapes[i].material)
        .to({ opacity: 1 }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()

      new TWEEN.Tween(this.shapes[i].position)
        .to(this.shapes[i].targetPos, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()
    }
  }

  becomeOther() {
    for (let i = 0; i < this.shapes.length; i++) {
      new TWEEN.Tween(this.shapes[i].material)
        .to({ opacity: 0.5 }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()

      new TWEEN.Tween(this.shapes[i].position)
        .to(this.shapes[i].initialPos, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()

      new TWEEN.Tween(this.shapes[i].rotation)
        .to(this.shapes[i].initialRot, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()

      new TWEEN.Tween(this.shapes[i].scale)
        .to(
          {
            x: this.shapes[i].scaleFactor.x * 0.8,
            y: this.shapes[i].scaleFactor.y * 0.8,
            z: this.shapes[i].scaleFactor.z * 0.8,
          },
          500
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()
    }
  }

  whenOut() {
    for (let i = 0; i < this.shapes.length; i++) {
      new TWEEN.Tween(this.shapes[i].position)
        .to(this.shapes[i].initialPos, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()

      new TWEEN.Tween(this.shapes[i].rotation)
        .to(this.shapes[i].initialRot, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()

      new TWEEN.Tween(this.shapes[i].material)
        .to({ opacity: 1 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()

      new TWEEN.Tween(this.shapes[i].scale)
        .to(
          {
            x: this.shapes[i].scaleFactor.x,
            y: this.shapes[i].scaleFactor.y,
            z: this.shapes[i].scaleFactor.z,
          },
          500
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()

      this.shapes[i].material = new THREE.MeshBasicMaterial({
        map: this.color,
        transparent: true,
      })
    }
  }

  update() {
    for (let i = 0; i < this.shapes.length; i++) {
      new TWEEN.Tween(this.shapes[i].rotation)
        .to(
          {
            x: this.shapes[i].rotation.x,
            y: (this.shapes[i].rotation.y += 0.005),
            z: (this.shapes[i].rotation.z += 0.001),
          },
          1000
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()
    }
  }
}

const tealOrangeColor = new THREE.TextureLoader().load('./assets/gradient1.png')
const greenOrangeColor = new THREE.TextureLoader().load(
  './assets/gradient4.png'
)
const tealGreenColor = new THREE.TextureLoader().load('./assets/gradient3.png')

const tealOrange = new THREE.MeshBasicMaterial({
  map: tealOrangeColor,
})

const greenOrange = new THREE.MeshBasicMaterial({
  map: greenOrangeColor,
})

const tealGreen = new THREE.MeshBasicMaterial({
  map: tealGreenColor,
})

// let moving = false

export default {
  name: 'ThreeScene',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    init() {
      this.spheres = []
      this.pyramids = []
      this.cubes = []
      this.serviceText = document.getElementById('serviceText')
      this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0) // it's up to you how you will create THREE.Plane(), there are several methods
      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.container = document.getElementById('container')

      this.camera = new THREE.PerspectiveCamera(
        70,
        this.container.clientWidth / this.container.clientHeight,
        0.01,
        10
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      )
      this.container.appendChild(this.renderer.domElement)

      this.scene = new THREE.Scene()

      this.clock = new THREE.Clock()

      const aLight = new THREE.AmbientLight(0x888888)
      this.scene.add(aLight)

      const light = new THREE.SpotLight()
      light.position.set(5, 5, 5)
      this.scene.add(light)

      // GRID BACKGROUND

      this.gridHelper = new THREE.GridHelper(10, 10)
      this.gridScale = 0.75
      this.gridHelper.scale.set(this.gridScale, this.gridScale, this.gridScale)
      this.gridHelper.rotation.x = Math.PI / 2
      this.gridHelper.position.z = -2
      this.scene.add(this.gridHelper)

      const sphereGeometry = new THREE.SphereGeometry(8, 32, 16)

      const scaleFactor = 0.1

      for (let i = 0; i < 1; i++) {
        this.sphere = new THREE.Mesh(sphereGeometry, greenOrange)
        this.sphere.scale.set(scaleFactor, scaleFactor, scaleFactor)
        this.sphere.position.set(-1, 1, -1)
        this.sphere.rotation.set(90, 0, 0)

        this.spheres.push(this.sphere)
        this.spheres[i].initialPos = {
          x: -1,
          y: 1,
          z: -1,
        }
        this.spheres[i].initialRot = {
          x: 90,
          y: 0,
          z: 0,
        }

        this.spheres[i].scaleFactor = {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        }
        this.scene.add(this.sphere)
      }
      this.spheres[0].targetPos = {
        x: -1,
        y: 1,
        z: 1,
      }

      this.sphereObject = new ShapeObject(
        this.spheres,
        'circle',
        greenOrangeColor
      )

      const pGeometry = new THREE.ConeGeometry(5, 8, 4)
      this.pyramid = new THREE.Mesh(pGeometry, tealOrange)

      const pyramidScaleFactor = 0.2
      this.pyramid.scale.set(
        pyramidScaleFactor,
        pyramidScaleFactor,
        pyramidScaleFactor
      )
      this.pyramid.position.set(-1, -1, 0)
      this.pyramid.rotation.set(0, 45, 50)

      this.scene.add(this.pyramid)

      this.pyramids.push(this.pyramid)

      this.pyramids[0].scaleFactor = {
        x: 0.2,
        y: 0.2,
        z: 0.2,
      }

      this.pyramids[0].initialPos = {
        x: -1,
        y: -1,
        z: 0,
      }

      this.pyramids[0].targetPos = {
        x: 0,
        y: 0,
        z: 2,
      }
      this.pyramids[0].initialRot = {
        x: 0,
        y: 45,
        z: 50,
      }

      this.pyramidObject = new ShapeObject(
        this.pyramids,
        'triangle',
        tealOrangeColor
      )

      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
      this.cube = new THREE.Mesh(cubeGeometry, tealGreen)
      this.cube.position.set(0.75, 0, 1)
      this.cube.rotation.set(0, 0, 45)
      this.scene.add(this.cube)

      this.cubes.push(this.cube)

      this.cubes[0].initialPos = {
        x: 0.75,
        y: 0,
        z: 1,
      }

      this.cubes[0].targetPos = {
        x: 0,
        y: 0,
        z: 2,
      }
      this.cubes[0].initialRot = {
        x: 0,
        y: 0,
        z: 45,
      }
      this.cubes[0].scaleFactor = {
        x: 1,
        y: 1,
        z: 1,
      }

      this.spheres[0].material.needsUpdate = true
      this.pyramids[0].material.needsUpdate = true
      this.cubes[0].material.needsUpdate = true

      this.spheres[0].material.transparent = true
      this.pyramids[0].material.transparent = true
      this.cubes[0].material.transparent = true

      this.cubeObject = new ShapeObject(this.cubes, 'rectangle', tealGreenColor)

      this.camera.position.z = 5

      this.container.addEventListener('mousemove', this.onmousemove, false)
      this.container.addEventListener('mouseout', this.onmouseout, false)

      this.count = 0
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)

      TWEEN.update()

      switch (this.currentOver) {
        case this.spheres[0]:
          this.sphereObject.update()
          break
        case this.pyramids[0]:
          this.pyramidObject.update()
          break
        case this.cubes[0]:
          this.cubeObject.update()
          break
        default:
          break
      }
    },
    onmouseout() {
      // moving = false
    },
    onmousemove(event) {
      this.count++

      // moving = true
      this.mouse.x = (event.offsetX / this.renderer.domElement.width) * 2 - 1
      this.mouse.y = -(event.offsetY / this.renderer.domElement.height) * 2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)

      this.intersects = this.raycaster.intersectObjects(this.scene.children)

      if (this.intersects.length > 0) {
        this.currentOver = this.intersects[0].object

        if (this.currentOver === this.spheres[0]) {
          this.sphereObject.whenOver()
          this.pyramidObject.becomeOther()
          this.cubeObject.becomeOther()
          this.serviceText.style.opacity = 1
          this.serviceText.innerHTML = 'Digital Craft'
        } else if (this.currentOver === this.pyramids[0]) {
          this.pyramidObject.whenOver()
          this.sphereObject.becomeOther()
          this.cubeObject.becomeOther()
          this.serviceText.style.opacity = 1
          this.serviceText.innerHTML = 'Extended Reality'
        } else if (this.currentOver === this.cubes[0]) {
          this.cubeObject.whenOver()
          this.pyramidObject.becomeOther()
          this.sphereObject.becomeOther()
          this.serviceText.style.opacity = 1
          this.serviceText.innerHTML = 'Virtual Events'
        } else {
          this.serviceText.style.opacity = 0
          this.cubeObject.whenOut()
          this.pyramidObject.whenOut()
          this.sphereObject.whenOut()
        }
      } else {
        this.serviceText.style.opacity = 0
        this.currentOver = null
        this.sphereObject.whenOut()
        this.pyramidObject.whenOut()
        this.cubeObject.whenOut()
      }
    },
  },
}
</script>

<style scoped>
#spacer {
  width: 500px;
  height: 500px;
}

#threescene {
  transform: rotate(90deg);
  display: flex;
  justify-content: flex-start;
}

#container {
  width: 1000px;
  height: 700px;
  position: relative;
  margin-left: 700px;
}

#serviceText {
  color: white;
  font-family: 'Gotham', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  position: absolute;
  z-index: 10001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 2rem;
  opacity: 0;
  transition: linear 1s;
}
</style>
