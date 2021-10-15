<template>
  <div id="threescene">
    <span id="serviceText">Hello</span>
    <div id="container"></div>
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

  whenOver(x, y) {
    this.x = x
    this.y = y

    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].material = new THREE.MeshLambertMaterial({
        color: this.color,
        transparent: true,
      })

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

      this.shapes[i].material = new THREE.MeshBasicMaterial({
        color: this.color,
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
            z: this.shapes[i].rotation.z,
          },
          1000
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()
    }
  }
}

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
      this.cylinders = []
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

      const aLight = new THREE.AmbientLight(0x404040)
      this.scene.add(aLight)

      const light = new THREE.SpotLight()
      light.position.set(5, 5, 5)
      this.scene.add(light)

      const cylinderGeometry = new THREE.SphereGeometry(5, 32, 16)

      const scaleFactor = 0.1

      const orange = new THREE.Color(0xff4e00)
      const blue = new THREE.Color(0x1dade4)
      const green = new THREE.Color(0x727d4f)

      const orangeMat = new THREE.MeshBasicMaterial({
        color: orange,
        transparent: true,
      })
      const blueMat = new THREE.MeshBasicMaterial({
        color: blue,
        transparent: true,
      })

      const greenMat = new THREE.MeshBasicMaterial({
        color: green,
        transparent: true,
      })

      for (let i = 0; i < 1; i++) {
        this.cylinder = new THREE.Mesh(cylinderGeometry, orangeMat)
        this.cylinder.scale.set(scaleFactor, scaleFactor, scaleFactor)
        this.cylinder.position.set(-1, 1, -1)
        this.cylinder.rotation.set(90, 0, 0)

        this.cylinders.push(this.cylinder)
        this.cylinders[i].initialPos = {
          x: -1,
          y: 1,
          z: -1,
        }
        this.cylinders[i].initialRot = {
          x: 90,
          y: 0,
          z: 0,
        }
        this.scene.add(this.cylinder)
      }
      this.cylinders[0].targetPos = {
        x: -1,
        y: 1,
        z: 1,
      }

      this.cylinderObject = new ShapeObject(this.cylinders, 'circle', orange)

      const pGeometry = new THREE.ConeGeometry(5, 8, 4)
      this.pyramid = new THREE.Mesh(pGeometry, blueMat)

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

      this.pyramidObject = new ShapeObject(this.pyramids, 'triangle', blue)

      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
      this.cube = new THREE.Mesh(cubeGeometry, greenMat)
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

      this.cylinders[0].material.needsUpdate = true
      this.pyramids[0].material.needsUpdate = true
      this.cubes[0].material.needsUpdate = true

      this.cylinders[0].material.transparent = true
      this.pyramids[0].material.transparent = true
      this.cubes[0].material.transparent = true

      this.cubeObject = new ShapeObject(this.cubes, 'rectangle', green)

      this.camera.position.z = 5

      window.addEventListener('mousemove', this.onmousemove, false)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)

      TWEEN.update()

      switch (this.currentOver) {
        case this.cylinders[0]:
          this.cylinderObject.update()
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

      // console.log(this.currentOver)
    },
    onmousemove(event) {
      this.mouse.x = (event.clientX / 700) * 2 - 1
      this.mouse.y = -(event.clientY / 1000) * 2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)

      this.intersects = this.raycaster.intersectObjects(this.scene.children)

      if (this.intersects.length > 0) {
        this.serviceText.style.opacity = 1

        switch (this.intersects[0].object) {
          case this.cylinders[0]:
            this.cylinderObject.whenOver(this.mouse.x, this.mouse.y)
            this.pyramidObject.becomeOther()
            this.cubeObject.becomeOther()
            this.serviceText.innerHTML = 'Digital Craft'
            break
          case this.pyramids[0]:
            this.pyramidObject.whenOver(this.mouse.x, this.mouse.y)
            this.cylinderObject.becomeOther()
            this.cubeObject.becomeOther()
            this.serviceText.innerHTML = 'Extended Reality'
            break
          case this.cubes[0]:
            this.cubeObject.whenOver(this.mouse.x, this.mouse.y)
            this.pyramidObject.becomeOther()
            this.cylinderObject.becomeOther()
            this.serviceText.innerHTML = 'Virtual Events'
            break
          default:
            break
        }

        this.currentOver = this.intersects[0].object
      } else {
        this.serviceText.style.opacity = 0
        this.currentOver = null
        this.cylinderObject.whenOut()
        this.pyramidObject.whenOut()
        this.cubeObject.whenOut()
      }
    },
  },
}
</script>

<style scoped>
#threescene {
  transform: rotate(90deg);
}

#container {
  width: 700px;
  height: 1000px;
  margin-left: 200px;
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
