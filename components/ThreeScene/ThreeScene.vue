<template>
  <div id="threescene">
    <div id="container">
      <div id="landingText" class="text-7xl">
        Human Design for a Digital World
      </div>
      <div id="scrollTextContainer">
        <div id="tagline">
          We design for the future, obsess about the present, and unlock
          potential.
        </div>
        <div id="scrollPrompt">
          <span id="scrollText"> Scroll for More</span>
          <span id="scrollLine"><span id="movingLine"></span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { animations } from './animation'

// texture imports

const tealOrangeTexture = new THREE.TextureLoader().load(
  './assets/blueOrange.png'
)
const greenOrangeTexture = new THREE.TextureLoader().load(
  './assets/tealOrange.png'
)
// const tealGreenTexture = new THREE.TextureLoader().load(
//   './assets/gradient3.png'
// )
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

const video = document.createElement('video')
video.style = 'display: none;'
video.id = 'video'
video.playsInline = true
video.autoplay = true
video.muted = true
video.loop = true
video.type = 'video/mp4'
video.src = './assets/movingGradient.mp4'
video.load()
video.pause()

const videoImage = document.createElement('canvas')
videoImage.width = 1920
videoImage.height = 1080

const videoImageContext = videoImage.getContext('2d')
videoImageContext.fillStyle = '#000000'
videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height)

const tealGreenVideoTexture = new THREE.Texture(videoImage)
tealGreenVideoTexture.minFilter = THREE.LinearFilter
tealGreenVideoTexture.magFilter = THREE.LinearFilter

const tealGreen = new THREE.MeshPhongMaterial({
  map: tealGreenVideoTexture,
  opacity: 1,
  depthWrite: false,
  side: THREE.DoubleSide,
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

      this.initialCameraPos = new THREE.Vector3(0, 0, 8)

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
      this.serviceText = document.getElementById('landingText')
      this.scrollText = document.getElementById('scrollTextContainer')

      this.container = document.getElementById('container')

      // setting up the threejs scene
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.container.clientWidth / this.container.clientHeight,
        0.01,
        100
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      )
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

      this.container.appendChild(this.renderer.domElement)
      this.scene = new THREE.Scene()
      this.clock = new THREE.Clock()

      // this.scene.background = new THREE.Color(0x000000)

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
      this.gridScale = 0.6
      this.gridHelper.scale.set(this.gridScale, this.gridScale, this.gridScale)
      this.gridHelper.rotation.x = Math.PI / 2
      this.gridHelper.position.set(0, -0.5, -2)
      this.scene.add(this.gridHelper)

      // initialize all geometries
      const sphereGeometry = new THREE.SphereGeometry(4, 32, 16)
      const pGeometry = new THREE.ConeGeometry(5, 8, 4)
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

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

      this.thresholdAngle = 11

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
      this.camera.position.set(
        this.initialCameraPos.x,
        this.initialCameraPos.y,
        this.initialCameraPos.z
      )

      document
        .getElementById('scrollEl')
        .addEventListener('wheel', this.onscroll, false)

      document
        .getElementById('scrollEl')
        .addEventListener('scroll', this.onscroll, false)

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
          this.bounds = [
            {
              // cube
              x1: 2.45,
              x2: -1.3,
              y1: 1.9,
              y2: -2,
            },
            {
              // pyramid
              x1: 2.7,
              x2: -1.25,
              y1: 2,
              y2: -2,
            },
            {
              // sphere
              x1: 3,
              x2: -1.25,
              y1: 1.9,
              y2: -1.8,
            },
          ]

          for (let i = 0; i < this.allShapes.length / 2; i++) {
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
          break

        default:
          break
      }

      TWEEN.update()
    },
    render() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        videoImageContext.drawImage(video, 0, 0)
        if (tealGreenVideoTexture) tealGreenVideoTexture.needsUpdate = true
      }
      this.renderer.render(this.scene, this.camera)
    },
    onscroll() {
      clearTimeout(this.timer)
      const self = document.getElementById('scrollEl')
      const spacer = document.getElementById('spacer')

      this.content = document.querySelector('.layout-container')
      const pos = self.scrollTop

      const total = spacer.scrollHeight

      this.currentScrollPos = Math.round((pos / total) * 100)

      // scroll effect

      // this.timer = setTimeout(() => {
      //   this.content.style.transform = `rotate(-90deg) skewY(0deg)`
      // }, 100)

      // this.content.style.transform = `rotate(-90deg) skewY(10deg)`

      //
      for (let i = 0; i < animations.length; i++) {
        if (
          this.currentScrollPos >= animations[i].enterAnimation.start &&
          this.currentScrollPos <= animations[i].enterAnimation.end
        ) {
          if (currentStage !== animations[i].stage) {
            this.startMovement(i)
            currentStage = animations[i].stage
          }

          if (currentStage === 'digital craft') {
            video.play()
          } else {
            video.pause()
            video.currentTime = 0
          }

          this.container.style.opacity = 1
        } else if (this.currentScrollPos >= 0 && this.currentScrollPos < 100) {
          this.container.style.opacity = 1

          this.serviceText.style.opacity = 1
          this.scrollText.style.opacity = 1
        } else if (
          this.currentScrollPos >= 100 &&
          this.currentScrollPos < 350
        ) {
          new TWEEN.Tween(this.camera.position)
            .to(this.initialCameraPos, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()
          this.container.style.opacity = 0
        } else if (
          this.currentScrollPos >= 350 &&
          this.currentScrollPos <= 360
        ) {
          this.container.style.opacity = 1

          if (currentStage !== 'contact') {
            this.startMovement(4)
            currentStage = 'contact'
          }

          this.startContact()

          this.serviceText.style.opacity = 0
          this.scrollText.style.opacity = 0
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
            x: 5,
            y: 2,
            z: 15,
          },
          1000
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
        this.serviceText.innerHTML = 'Human Design for a Digital World'
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
  },
}
</script>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
  transition: 0.5s linear;
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

#landingText {
  position: absolute;
  top: 8rem;
  left: 5rem;
  color: white;
  width: 600px;
  margin-top: 1rem;
  text-transform: uppercase;
  font-family: 'Gotham-Black', sans-serif;
}

#scrollTextContainer {
  position: absolute;
  bottom: 10rem;
  right: 7rem;
  color: white;
  width: 500px;
  margin-top: 1rem;
  text-transform: uppercase;
  font-family: 'DINPro-Bold', sans-serif;
}

#tagline {
  margin-right: 30%;
}

#scrollPrompt {
  margin: 1rem 0 0 0;
  font-family: 'Gotham', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

#scrollText {
  width: 100%;
  margin-left: 30%;
}

#scrollLine {
  width: 100%;
  height: 2px;
  background-color: #666;
  position: relative;
}

#movingLine {
  width: 50%;
  height: 2px;
  background: white;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  animation: moveLine 1s infinite;
}

@keyframes moveLine {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(400%);
  }
}
</style>
