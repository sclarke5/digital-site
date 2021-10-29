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
import { animations } from './animation'

const scale = (number, inMin, inMax, outMin, outMax) => {
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

let currentStage

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
      // declaring global variables

      this.angles = []

      for (let i = 0; i < 6; i++) {
        const xAngle = 0.001 * this.getRandomNumber(1, 5)
        const yAngle = 0.001 * this.getRandomNumber(1, 5)

        this.angles.push({ xAngle, yAngle })
      }

      this.allShapes = []

      this.sphereFloatUp = true
      this.pyramidFloatUp = true

      this.t = 0

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
      this.gridHelper.position.set(0, -0.5, -2)
      this.scene.add(this.gridHelper)

      // initialize all geometries
      const sphereGeometry = new THREE.SphereGeometry(4, 32, 16)
      const pGeometry = new THREE.ConeGeometry(5, 8, 4)
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

      this.thresholdAngle = 11

      const initialCube = animations[0].enterAnimation.movements[0]

      this.cube = new THREE.Mesh(cubeGeometry, tealGreen)
      this.scene.add(this.cube)
      this.cubes.push(this.cube)
      this.allShapes.push(this.cube)

      this.cEdges = new THREE.EdgesGeometry(cubeGeometry)
      this.cubeMesh = new THREE.LineSegments(
        this.cEdges,
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          depthWrite: false,
        })
      )
      this.scene.add(this.cubeMesh)
      this.cubes.push(this.cubeMesh)

      for (let i = 0; i < this.cubes.length; i++) {
        this.cubes[i].position.set(
          initialCube.position.x,
          initialCube.position.y,
          initialCube.position.z
        )
        this.cubes[i].rotation.set(
          initialCube.rotation.x,
          initialCube.rotation.y,
          initialCube.rotation.z
        )
        this.cubes[i].scale.set(
          initialCube.scale.x,
          initialCube.scale.y,
          initialCube.scale.z
        )
        this.cubes[i].material.needsUpdate = true
        this.cubes[i].material.transparent = true
        this.cubes[i].castShadow = true
        this.cubes[i].receiveShadow = true
      }

      this.cubes[1].material.opacity = 0

      // add pyramid

      const initialPyramid = animations[0].enterAnimation.movements[1]

      this.pyramid = new THREE.Mesh(pGeometry, tealOrange)
      this.scene.add(this.pyramid)
      this.pyramids.push(this.pyramid)
      this.allShapes.push(this.pyramid)

      this.pEdges = new THREE.EdgesGeometry(pGeometry)
      this.pMesh = new THREE.LineSegments(
        this.pEdges,
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          depthWrite: false,
        })
      )
      this.scene.add(this.pMesh)
      this.pyramids.push(this.pMesh)

      for (let i = 0; i < this.pyramids.length; i++) {
        this.pyramids[i].position.set(
          initialPyramid.position.x,
          initialPyramid.position.y,
          initialPyramid.position.z
        )
        this.pyramids[i].rotation.set(
          initialPyramid.rotation.x,
          initialPyramid.rotation.y,
          initialPyramid.rotation.z
        )
        this.pyramids[i].scale.set(
          initialPyramid.scale.x,
          initialPyramid.scale.y,
          initialPyramid.scale.z
        )
        this.pyramids[i].material.needsUpdate = true
        this.pyramids[i].material.transparent = true
        this.pyramids[i].castShadow = true
        this.pyramids[i].receiveShadow = true
      }

      this.pyramids[1].material.opacity = 0

      // add sphere

      const initialSphere = animations[0].enterAnimation.movements[2]

      this.sphere = new THREE.Mesh(sphereGeometry, greenOrange)
      this.scene.add(this.sphere)
      this.spheres.push(this.sphere)

      this.sEdges = new THREE.EdgesGeometry(sphereGeometry, this.thresholdAngle)
      this.sMesh = new THREE.LineSegments(
        this.sEdges,
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          depthWrite: false,
        })
      )
      this.scene.add(this.sMesh)
      this.spheres.push(this.sMesh)
      this.allShapes.push(this.sphere)

      for (let i = 0; i < this.spheres.length; i++) {
        this.spheres[i].position.set(
          initialSphere.position.x,
          initialSphere.position.y,
          initialSphere.position.z
        )
        this.spheres[i].rotation.set(
          initialSphere.rotation.x,
          initialSphere.rotation.y,
          initialSphere.rotation.z
        )
        this.spheres[i].scale.set(
          initialSphere.scale.x,
          initialSphere.scale.y,
          initialSphere.scale.z
        )
        this.spheres[i].material.needsUpdate = true
        this.spheres[i].material.transparent = true
        this.spheres[i].castShadow = true
        this.spheres[i].receiveShadow = true
      }

      this.spheres[1].material.opacity = 0

      // add meshes to array

      this.allShapes.push(this.cubeMesh)
      this.allShapes.push(this.pMesh)
      this.allShapes.push(this.sMesh)

      // other
      this.camera.position.z = 5

      this.container.addEventListener('mousemove', this.onmousemove, false)
      this.container.addEventListener('mouseout', this.onmouseout, false)
      document
        .getElementById('scrollEl')
        .addEventListener('wheel', this.onscroll, false)

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

      const sphereFloat = 0.001

      const pyramidFloat = 0.005

      switch (currentStage) {
        case 'digital craft':
          break
        case 'extended reality':
          this.allShapes[2].rotation.x += sphereFloat

          if (this.allShapes[2].position.y >= 0.4) {
            this.sphereFloatUp = false
          } else if (this.allShapes[2].position.y <= -0.4) {
            this.sphereFloatUp = true
          }

          if (this.sphereFloatUp === true) {
            this.allShapes[2].position.y += sphereFloat
          } else {
            this.allShapes[2].position.y -= sphereFloat
          }

          if (this.allShapes[1].position.y >= 0.32) {
            this.pyramidFloatUp = false
          } else if (this.allShapes[1].position.y <= -0.23) {
            this.pyramidFloatUp = true
          }

          if (this.pyramidFloatUp === true) {
            this.allShapes[1].position.y += pyramidFloat
          } else {
            this.allShapes[1].position.y -= pyramidFloat
          }

          break
        case 'virtual events':
          this.t += 0.05
          this.allShapes[2].rotation.x -= 0.03

          this.allShapes[2].position.x = 0.5 * Math.cos(this.t) + 0
          this.allShapes[2].position.z = 0.5 * Math.sin(this.t) + 1.5

          break

        case 'contact':
          this.bounds = 1.6

          for (let i = 0; i < this.allShapes.length; i++) {
            this.allShapes[i].position.x += this.angles[i].xAngle
            this.allShapes[i].position.y += this.angles[i].yAngle

            if (
              this.allShapes[i].position.x >= this.bounds ||
              this.allShapes[i].position.x <= -this.bounds
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
              this.allShapes[i].position.y >= this.bounds ||
              this.allShapes[i].position.y <= -this.bounds
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
          break

        default:
          break
      }

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

      this.currentScrollPos = Math.round((pos / total) * 100)

      for (let i = 0; i < animations.length; i++) {
        if (
          this.currentScrollPos >= animations[i].enterAnimation.start &&
          this.currentScrollPos <= animations[i].enterAnimation.end
        ) {
          this.startMovement(i)
          currentStage = animations[i].stage
        } else if (this.currentScrollPos > 100 && this.currentScrollPos < 110) {
          new TWEEN.Tween(this.camera.position)
            .to(
              {
                x: 0,
                y: 0,
                z: 5,
              },
              100
            )
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()
        } else if (this.currentScrollPos < 111) {
          document.getElementById('container').style.opacity = scale(
            this.currentScrollPos,
            96,
            100,
            1,
            0
          )
        } else if (
          this.currentScrollPos >= 223 &&
          this.currentScrollPos <= 230
        ) {
          document.getElementById('container').style.opacity = scale(
            this.currentScrollPos,
            223,
            230,
            0,
            1
          )

          currentStage = 'contact'

          this.startMovement(4)
          this.startContact()
        }
      }
    },
    getRandomNumber(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    startContact() {
      new TWEEN.Tween(this.camera.position)
        .to(
          {
            x: 0,
            y: 0.75,
            z: 7,
          },
          100
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
    },
    startMovement(arrPos) {
      const self = animations[arrPos]

      const anim = self.enterAnimation.movements

      if (arrPos > 0 && arrPos < 4) {
        this.serviceText.innerHTML = self.stage
      } else {
        this.serviceText.innerHTML = ''
      }

      for (let i = 0; i < 3; i++) {
        new TWEEN.Tween(this.allShapes[i].position)
          .to(
            {
              x: anim[i].position.x,
              y: anim[i].position.y,
              z: anim[i].position.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
        new TWEEN.Tween(this.allShapes[i + 3].position)
          .to(
            {
              x: anim[i].position.x,
              y: anim[i].position.y,
              z: anim[i].position.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()

        new TWEEN.Tween(this.allShapes[i].rotation)
          .to(
            {
              x: anim[i].rotation.x,
              y: anim[i].rotation.y,
              z: anim[i].rotation.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
        new TWEEN.Tween(this.allShapes[i + 3].rotation)
          .to(
            {
              x: anim[i].rotation.x,
              y: anim[i].rotation.y,
              z: anim[i].rotation.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()

        new TWEEN.Tween(this.allShapes[i].scale)
          .to(
            {
              x: anim[i].scale.x,
              y: anim[i].scale.y,
              z: anim[i].scale.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
        new TWEEN.Tween(this.allShapes[i + 3].scale)
          .to(
            {
              x: anim[i].scale.x,
              y: anim[i].scale.y,
              z: anim[i].scale.z,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()

        new TWEEN.Tween(this.allShapes[i].material)
          .to(
            {
              opacity: anim[i].opacitySolid,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()

        new TWEEN.Tween(this.allShapes[i + 3].material)
          .to(
            {
              opacity: anim[i].opacityLine,
            },
            500
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
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
