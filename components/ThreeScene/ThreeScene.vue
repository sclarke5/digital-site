<template>
  <div id="threescene">
    <div id="container">
      <span id="serviceText">Some Text</span>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

// helper functions
// const lerp = (value1, value2, amount) => {
//   amount = amount < 0 ? 0 : amount
//   amount = amount > 1 ? 1 : amount
//   return value1 + (value2 - value1) * amount
// }

const scale = (number, inMin, inMax, outMin, outMax) => {
  // console.log(
  //   `((${number} - ${inMin}) * (${outMax} - ${outMin})) / (${inMax} - ${inMin}) + ${outMin} = ${
  //     ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  //   }`
  // )
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

// texture imports

const tealOrangeTexture = new THREE.TextureLoader().load(
  './assets/gradient1.png'
)
const greenOrangeTexture = new THREE.TextureLoader().load(
  './assets/gradient16.png'
)
const tealGreenTexture = new THREE.TextureLoader().load(
  './assets/gradient3.png'
)
const tealOrange = new THREE.MeshPhongMaterial({
  map: tealOrangeTexture,
  transparent: true,
  opacity: 1,
})

const greenOrange = new THREE.MeshPhongMaterial({
  map: greenOrangeTexture,
  transparent: true,
  opacity: 1,
})

const tealGreen = new THREE.MeshPhongMaterial({
  map: tealGreenTexture,
  transparent: true,
  opacity: 1,
})

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
      // animation timing
      this.keyframes = {
        digitalCraft: {
          start: 5,
          end: 10,
        },
        xr: {
          start: 35,
          end: 40,
        },
        virtualEvents: {
          start: 65,
          end: 70,
        },
      }

      // declaring global variables
      this.spheres = []
      this.pyramids = []
      this.cubes = []
      this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      // access HTML elements
      this.serviceText = document.getElementById('serviceText')
      this.container = document.getElementById('container')

      // setting up the threejs scene
      this.camera = new THREE.PerspectiveCamera(
        70,
        this.container.clientWidth / this.container.clientHeight,
        0.01,
        10
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      )
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

      this.container.appendChild(this.renderer.domElement)
      this.scene = new THREE.Scene()
      this.clock = new THREE.Clock()

      this.scene.background = new THREE.Color(0x000000)

      // adding lights to the scene
      const aLight = new THREE.AmbientLight(0x888888)
      this.scene.add(aLight)
      aLight.castShadow = true // default false

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
      this.gridHelper.position.set(0, -0.5, -2)
      this.scene.add(this.gridHelper)

      // initialize all geometries
      const sphereGeometry = new THREE.SphereGeometry(4, 32, 16)
      const pGeometry = new THREE.ConeGeometry(5, 8, 4)
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

      // add the Sphere
      const sphereScale = 0.1

      for (let i = 0; i < 1; i++) {
        this.sphere = new THREE.Mesh(sphereGeometry, greenOrange)
        this.sphere.scale.set(sphereScale, sphereScale, sphereScale)
        this.sphere.position.set(-1, 1, 1)
        this.sphere.rotation.set(Math.PI / 4, 0, Math.PI / 4)
        this.sphere.material.needsUpdate = true
        this.sphere.material.transparent = true
        this.sphere.castShadow = true
        this.sphere.receiveShadow = true
        this.spheres.push(this.sphere)

        this.spheres[i].initialPos = this.sphere.position
        this.spheres[i].initialRot = this.sphere.rotation
        this.spheres[i].scaleFactor = this.sphere.scale

        this.spheres[i].targetPos = {
          x: -1,
          y: 1,
          z: 1,
        }

        this.scene.add(this.sphere)
      }

      // add pyramid

      const pyramidScale = 0.15

      for (let i = 0; i < 1; i++) {
        this.pyramid = new THREE.Mesh(pGeometry, tealOrange)
        this.pyramid.scale.set(pyramidScale, pyramidScale, pyramidScale)
        this.pyramid.position.set(-1, -1, 1)
        this.pyramid.rotation.set(0.2, Math.PI / 4, -Math.PI / 4)
        this.pyramid.material.needsUpdate = true
        this.pyramid.material.transparent = true
        this.pyramid.castShadow = true
        this.pyramid.receiveShadow = true

        this.pyramids.push(this.pyramid)
        this.scene.add(this.pyramid)
        this.pyramids[i].initialPos = this.pyramid.position
        this.pyramids[i].initialRot = this.pyramid.rotation
        this.pyramids[i].scaleFactor = this.pyramid.scale
        this.pyramids[i].targetPos = {
          x: 0,
          y: 0,
          z: 2,
        }
      }

      // this.pEdges = new THREE.EdgesGeometry(pGeometry)
      // this.pMesh = new THREE.LineSegments(
      //   this.pEdges,
      //   new THREE.LineBasicMaterial({
      //     color: 0xffffff,
      //   })
      // )
      // this.scene.add(this.pMesh)
      // this.pyramids.push(this.pMesh)

      this.cube = new THREE.Mesh(cubeGeometry, tealGreen)
      this.scene.add(this.cube)
      this.cubes.push(this.cube)

      this.edges = new THREE.EdgesGeometry(cubeGeometry)
      this.cubeMesh = new THREE.LineSegments(
        this.edges,
        new THREE.LineBasicMaterial({
          color: 0xffffff,
        })
      )
      this.scene.add(this.cubeMesh)
      this.cubes.push(this.cubeMesh)

      const cubeScale = 0.9

      for (let i = 0; i < 2; i++) {
        this.cubes[i].position.set(0.75, 0, 1)
        this.cubes[i].rotation.set(0, 0, Math.PI / 4)
        this.cubes[i].scale.set(cubeScale, cubeScale, cubeScale)
        this.cubes[i].material.needsUpdate = true
        this.cubes[i].material.transparent = true
        this.cubes[i].castShadow = true
        this.cubes[i].receiveShadow = true

        this.cubes[i].initialPos = this.cube.position
        this.cubes[i].initialRot = this.cube.rotation
        this.cubes[i].scaleFactor = this.cube.scale

        this.cubes[i].targetPos = {
          x: 0,
          y: 0,
          z: 2,
        }
      }

      this.cubes[1].material.opacity = 0

      this.camera.position.z = 5

      this.container.addEventListener('mousemove', this.onmousemove, false)
      this.container.addEventListener('mouseout', this.onmouseout, false)
      document
        .getElementById('scrollEl')
        .addEventListener('wheel', this.onscroll, false)

      this.count = 0

      window.addEventListener('resize', this.onresize, true)
    },
    onresize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.render()
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.render()
      TWEEN.update()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    onscroll() {
      const self = document.getElementById('scrollEl')
      const spacer = document.getElementById('spacer')

      const pos = self.scrollTop

      const total = spacer.scrollHeight

      // console.log(
      //   `${spacer.scrollHeight} - ${self.offsetWidth} = ${
      //     spacer.scrollHeight - self.offsetWidth
      //   }
      //   \n
      //   ${pos}/${total} = ${(pos / total) * 100}
      //   `
      // )

      this.currentScrollPos = Math.round((pos / total) * 100)

      this.serviceText.innerHTML = this.currentScrollPos

      if (
        this.currentScrollPos >= this.keyframes.digitalCraft.start &&
        this.currentScrollPos <= this.keyframes.digitalCraft.end
      ) {
        this.startDigitalCraft()
      } else if (
        this.currentScrollPos >= this.keyframes.xr.start &&
        this.currentScrollPos <= this.keyframes.xr.end
      ) {
        this.startXR()
      }
      if (
        this.currentScrollPos >= this.keyframes.virtualEvents.start &&
        this.currentScrollPos <= this.keyframes.virtualEvents.end
      ) {
        this.startVirtualEvents()
      } else if (
        this.currentScrollPos > this.keyframes.virtualEvents.end &&
        this.currentScrollPos < 111
      ) {
        document.getElementById('container').style.opacity = scale(
          this.currentScrollPos,
          96,
          100,
          1,
          0
        )
        // TODO scale the opacity for the container to fade out as user scrolls
      } else {
        // this.cubes[0].rotation.x = lerp(
        //   this.cubes[0].rotation.x,
        //   this.currentScrollPos,
        //   0.1
        // )
      }
    },
    startDigitalCraft() {
      console.log('digital craft')

      // CUBE ACTIONS

      for (let i = 0; i < this.cubes.length; i++) {
        // CUBE MEASUREMENTS
        const xPos = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          0.75,
          0
        )

        const xScale = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          1,
          3
        )

        const yScale = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          1,
          2
        )

        const zRot = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          Math.PI / 4,
          0
        )

        // CUBE MOVEMENTS

        const moveCube = new TWEEN.Tween(this.cubes[i].position)
          .to(
            {
              x: xPos,
              y: this.cubes[i].position.y,
              z: this.cubes[i].position.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const scaleCube = new TWEEN.Tween(this.cubes[i].scale)
          .to(
            {
              x: xScale,
              y: yScale,
              z: this.cubes[i].scale.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const rotateCube = new TWEEN.Tween(this.cubes[i].rotation)
          .to(
            {
              x: this.cubes[i].rotation.x,
              y: this.cubes[i].rotation.y,
              z: zRot,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        // CUBE CONTROLLERS
        moveCube.start()
        scaleCube.start()
        rotateCube.start()
      }

      // SPHERE ACTIONS
      for (let i = 0; i < this.spheres.length; i++) {
        // SPHERE MEASUREMENTS

        const xPos = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          -1,
          0.75
        )

        const yPos = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          1,
          0.3
        )

        const zPos = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          1,
          2
        )

        const allScale = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          0.1,
          0.07
        )
        // SPHERE MOVEMENTS

        const moveSphere = new TWEEN.Tween(this.spheres[i].position)
          .to(
            {
              x: xPos,
              y: yPos,
              z: zPos,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const scaleSphere = new TWEEN.Tween(this.spheres[i].scale)
          .to(
            {
              x: allScale,
              y: allScale,
              z: allScale,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
        // SPHERE CONTROLLERS

        moveSphere.start()
        scaleSphere.start()
      }

      // PYRAMID ACTIONS

      for (let i = 0; i < this.pyramids.length; i++) {
        // PYRAMID MEASUREMENTS

        const xPos = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          -1,
          -0.75
        )

        const yPos = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          -1,
          -0.25
        )

        const zPos = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          1,
          2
        )

        const xRot = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          0.2,
          0
        )
        const yRot = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          Math.PI / 4,
          Math.PI / 3
        )
        const zRot = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          -Math.PI / 4,
          0
        )

        const allScale = scale(
          this.currentScrollPos,
          this.keyframes.digitalCraft.start,
          this.keyframes.digitalCraft.end,
          0.15,
          0.08
        )

        // PYRAMID MOVEMENTS
        const movePyramid = new TWEEN.Tween(this.pyramids[i].position)
          .to(
            {
              x: xPos,
              y: yPos,
              z: zPos,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const rotatePyramid = new TWEEN.Tween(this.pyramids[i].rotation)
          .to(
            {
              x: xRot,
              y: yRot,
              z: zRot,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const scalePyramid = new TWEEN.Tween(this.pyramids[i].scale)
          .to(
            {
              x: allScale,
              y: allScale,
              z: allScale,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        // PYRAMID CONTROLLERS
        movePyramid.start()
        rotatePyramid.start()
        scalePyramid.start()
      }
    },
    startXR() {
      console.log('xr')

      // CUBE ACTIONS
      for (let i = 0; i < this.cubes.length; i++) {
        // CUBE MEASUREMENTS
        const solidOpac = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          1,
          0
        )

        const meshOpac = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          0,
          1
        )

        const solidZPos = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          1,
          0
        )

        // CUBE MOVEMENTS
        const fadeSolid = new TWEEN.Tween(this.cubes[0].material)
          .to(
            {
              opacity: solidOpac,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const fadeMesh = new TWEEN.Tween(this.cubes[1].material)
          .to(
            {
              opacity: meshOpac,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const moveSolid = new TWEEN.Tween(this.cubes[0].position)
          .to(
            {
              x: this.cubes[0].position.x,
              y: this.cubes[0].position.y,
              z: solidZPos,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        // CUBE CONTROLLERS

        fadeSolid.start()
        fadeMesh.start()
        moveSolid.start()
      }

      // SPHERE ACTIONS
      for (let i = 0; i < this.spheres.length; i++) {
        // SPHERE MEASUREMENT
        const xPos = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          0.75,
          0.7
        )

        const yPos = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          0.3,
          -0.45
        )

        const allScale = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          0.07,
          0.08
        )

        // SPHERE MOVEMENTS
        const moveSphere = new TWEEN.Tween(this.spheres[i].position)
          .to(
            {
              x: xPos,
              y: yPos,
              z: this.spheres[i].position.z,
            },
            100
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const scaleSphere = new TWEEN.Tween(this.spheres[i].scale)
          .to(
            {
              x: allScale,
              y: allScale,
              z: allScale,
            },
            100
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        // SPHERE CONTROLLERS

        moveSphere.start()
        scaleSphere.start()
      }

      // PYRAMID ACTIONS
      for (let i = 0; i < this.pyramids.length; i++) {
        // PYRAMID MEASUREMENTS

        const allScale = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          0.08,
          0.09
        )

        const xRot = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          0.2,
          0
        )

        const yRot = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          Math.PI / 3,
          0
        )

        const xPos = scale(
          this.currentScrollPos,
          this.keyframes.xr.start,
          this.keyframes.xr.end,
          -0.75,
          -0.5
        )

        // PYRAMID MOVEMENTS

        const scalePyramid = new TWEEN.Tween(this.pyramids[i].scale)
          .to(
            {
              x: allScale,
              y: allScale,
              z: allScale,
            },
            100
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const rotatePyramid = new TWEEN.Tween(this.pyramids[i].rotation)
          .to(
            {
              x: xRot,
              y: yRot,
              z: this.pyramids[i].rotation.z,
            },
            100
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const movePyramid = new TWEEN.Tween(this.pyramids[i].position)
          .to(
            {
              x: xPos,
              y: -0.35,
              z: this.pyramids[i].position.z,
            },
            100
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
        // PYRAMID CONTROLLERS

        scalePyramid.start()
        rotatePyramid.start()
        movePyramid.start()
      }
    },
    startVirtualEvents() {
      console.log('virtual events')

      // CUBE ACTIONS
      for (let i = 0; i < this.cubes.length; i++) {
        const solidOpac = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          0,
          1
        )

        const meshOpac = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          1,
          0
        )

        const xRot = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          0,
          -Math.PI / 2.5
        )

        const zRot = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          Math.PI / 4,
          -Math.PI / 4
        )

        const yPos = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          0,
          -0.2
        )

        // CUBE MOVEMENTS
        const fadeSolid = new TWEEN.Tween(this.cubes[0].material)
          .to(
            {
              opacity: solidOpac,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const fadeMesh = new TWEEN.Tween(this.cubes[1].material)
          .to(
            {
              opacity: meshOpac,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const moveSolid = new TWEEN.Tween(this.cubes[i].position)
          .to(
            {
              x: 0,
              y: yPos,
              z: 1,
            },
            100
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const scaleCube = new TWEEN.Tween(this.cubes[i].scale)
          .to(
            {
              x: 2,
              y: 2,
              z: 0.2,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const rotateCube = new TWEEN.Tween(this.cubes[i].rotation)
          .to(
            {
              x: xRot,
              y: this.cubes[i].rotation.y,
              z: zRot,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        // CUBE CONTROLLERS

        fadeSolid.start()
        fadeMesh.start()
        scaleCube.start()
        moveSolid.start()
        rotateCube.start()
      }

      // SPHERE ACTIONS
      for (let i = 0; i < this.spheres.length; i++) {
        // SPHERE MEASUREMENTS

        const xPos = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          0.75,
          0.5
        )

        const yPos = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          -0.27,
          0.1
        )

        const allScale = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          0.13,
          0.04
        )
        // SPHERE MOVEMENTS

        const moveSphere = new TWEEN.Tween(this.spheres[i].position)
          .to(
            {
              x: xPos,
              y: yPos,
              z: 1,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const scaleSphere = new TWEEN.Tween(this.spheres[i].scale)
          .to(
            {
              x: allScale,
              y: allScale,
              z: allScale,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        // SPHERE CONTROLLERS

        moveSphere.start()
        scaleSphere.start()
      }

      // PYRAMID ACTIONS
      for (let i = 0; i < this.pyramids.length; i++) {
        // PYRAMID MEASUREMENTS
        const allScale = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          0.09,
          0.07
        )

        const xRot = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          0,
          Math.PI / 6
        )
        const xPos = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          -0.5,
          0
        )

        const yPos = scale(
          this.currentScrollPos,
          this.keyframes.virtualEvents.start,
          this.keyframes.virtualEvents.end,
          -0.25,
          0.1
        )

        // PYRAMID MOVEMENTS
        const scalePyramid = new TWEEN.Tween(this.pyramids[i].scale)
          .to(
            {
              x: allScale,
              y: allScale,
              z: allScale,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const rotatePyramid = new TWEEN.Tween(this.pyramids[i].rotation)
          .to(
            {
              x: xRot,
              y: this.pyramids[i].rotation.y,
              z: this.pyramids[i].rotation.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)

        const movePyramid = new TWEEN.Tween(this.pyramids[i].position)
          .to(
            {
              x: xPos,
              y: yPos,
              z: 1.5,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
        // PYRAMID CONTROLLERS

        scalePyramid.start()
        rotatePyramid.start()
        movePyramid.start()
      }
    },
    onmouseout() {},
    onmousemove(event) {
      this.count++
      this.mouse.x = (event.offsetX / this.renderer.domElement.width) * 2 - 1
      this.mouse.y = -(event.offsetY / this.renderer.domElement.height) * 2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)

      this.intersects = this.raycaster.intersectObjects(this.scene.children)

      if (this.intersects.length > 0) {
        this.currentOver = this.intersects[0].object
        this.serviceText.style.opacity = 1
      } else {
        //
      }
    },
  },
}
</script>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
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
  transition: linear 1s;
}
</style>
