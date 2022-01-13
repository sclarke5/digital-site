<template>
  <!-- creating a new scene for the contact form  -->
  <div id="contact3d-container"></div>
</template>

<script>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

const tealOrangeTexture = new THREE.TextureLoader().load('./assets/1.png')
const greenOrangeTexture = new THREE.TextureLoader().load('./assets/3.png')
const tealGreenTexture = new THREE.TextureLoader().load('./assets/2.png')

const tealOrange = new THREE.MeshPhongMaterial({
  map: tealOrangeTexture,
  transparent: true,
  opacity: 1,
  depthWrite: false,
})

const greenOrange = new THREE.MeshPhongMaterial({
  map: greenOrangeTexture,
  transparent: true,
  opacity: 1,
  depthWrite: false,
})

const tealGreen = new THREE.MeshPhongMaterial({
  map: tealGreenTexture,
  transparent: true,
  opacity: 1,
  depthWrite: false,
})

export default {
  name: 'ContactThreeScene',
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
      this.container = document.getElementById('contact3d-container')

      this.angles = []
      this.allShapes = []

      for (let i = 0; i < 6; i++) {
        const xAngle = 0.001 * this.getRandomNumber(1, 5)
        const yAngle = 0.001 * this.getRandomNumber(1, 5)

        this.angles.push({ xAngle, yAngle })
      }

      this.t = 0

      this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      // setting up the threejs scene
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.container.clientWidth / this.container.clientHeight,
        0.01,
        1000
      )

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight,
        false
      )

      this.container.appendChild(this.renderer.domElement)
      this.scene = new THREE.Scene()
      this.clock = new THREE.Clock()

      // adding lights to the scene
      const aLight = new THREE.AmbientLight(0x888888)
      this.scene.add(aLight)
      //  aLight.castShadow = true // default false

      const light = new THREE.SpotLight(0xffffff)
      light.position.set(5, 5, 5)
      this.scene.add(light)
      light.intensity = 0.5
      light.castShadow = true // default false

      this.gridColor = new THREE.Color(0x444444)

      // GRID BACKGROUND
      this.gridHelper = new THREE.GridHelper(
        10,
        10,
        this.gridColor,
        this.gridColor
      )
      this.gridScale = 0.7
      this.gridHelper.scale.set(this.gridScale, this.gridScale, this.gridScale)
      this.gridHelper.rotation.x = Math.PI / 2
      this.gridHelper.position.set(0, 0, -2)
      this.scene.add(this.gridHelper)

      // initialize all geometries
      const sphereGeometry = new THREE.SphereGeometry(4, 32, 16)
      const pGeometry = new THREE.ConeGeometry(5, 8, 4)
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

      this.cube = new THREE.Mesh(cubeGeometry, tealGreen)
      this.scene.add(this.cube)
      this.allShapes.push(this.cube)
      this.cube.scale.set(0.8, 0.8, 0.8)
      this.cube.position.set(0, 0, 1)

      this.pyramid = new THREE.Mesh(pGeometry, tealOrange)
      this.scene.add(this.pyramid)
      this.allShapes.push(this.pyramid)
      this.pyramid.position.set(0, 0, 1)
      this.pyramid.scale.set(0.1, 0.1, 0.1)

      this.sphere = new THREE.Mesh(sphereGeometry, greenOrange)
      this.scene.add(this.sphere)
      this.allShapes.push(this.sphere)
      this.sphere.scale.set(0.1, 0.1, 0.1)
      this.sphere.position.set(0, 0, 1)

      this.thresholdAngle = 11

      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

      this.camera.position.set(0, 0, 7)
    },

    onresize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight, false)
      this.render()
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.render()

      this.bounds = [
        {
          // cube
          x1: 1.6,
          x2: -1.3,
          y1: 1,
          y2: -2.1,
        },
        {
          // pyramid
          x1: 1.7,
          x2: -1.25,
          y1: 1.8,
          y2: -2.1,
        },
        {
          // sphere
          x1: 1.8,
          x2: -1.25,
          y1: 1.9,
          y2: -1.9,
        },
      ]

      for (let i = 0; i < this.allShapes.length; i++) {
        this.allShapes[i].position.x += this.angles[i].xAngle
        this.allShapes[i].position.y += this.angles[i].yAngle

        if (
          this.allShapes[i].position.x >= this.bounds[i].x1 ||
          this.allShapes[i].position.x <= this.bounds[i].x2
        ) {
          this.angles[i].xAngle = -this.angles[i].xAngle

          new TWEEN.Tween(this.allShapes[i].rotation)
            .to(
              {
                y: this.allShapes[i].rotation.y + Math.PI / 2,
              },
              3000
            )
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()
        }

        if (
          this.allShapes[i].position.y >= this.bounds[i].y1 ||
          this.allShapes[i].position.y <= this.bounds[i].y2
        ) {
          this.angles[i].yAngle = -this.angles[i].yAngle

          new TWEEN.Tween(this.allShapes[i].rotation)
            .to(
              {
                x: this.allShapes[i].rotation.x + Math.PI / 2,
              },
              3000
            )
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()
        }
      }

      TWEEN.update()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },

    getRandomNumber(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
  },
}
</script>

<style scoped>
#contact3d-container {
  width: 500px;
  height: 500px;
  display: none;
}

@media screen(laptop) {
  #contact3d-container {
    display: block;
  }
}
</style>
