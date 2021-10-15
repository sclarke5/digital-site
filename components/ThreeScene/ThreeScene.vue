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

  whenOver(x, y) {
    this.x = x
    this.y = y

    for (let i = 0; i < this.shapes.length; i++) {
      // this.shapes[i].material = new THREE.MeshLambertMaterial({
      //   color: this.color,
      //   transparent: true,
      // })

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

      this.shapes[i].material = this.color
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

const orange = new THREE.Color(0xff4e00)
const teal = new THREE.Color(0x1dade4)
const green = new THREE.Color(0x727d4f)

const tealOrange = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: orange,
    },
    color2: {
      value: teal,
    },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;

    varying vec2 vUv;

    void main() {

      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
})

const greenOrange = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: orange,
    },
    color2: {
      value: green,
    },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;

    varying vec2 vUv;

    void main() {

      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
})

const tealGreen = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: green,
    },
    color2: {
      value: teal,
    },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;

    varying vec2 vUv;

    void main() {

      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
})

let moving = false

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

      const aLight = new THREE.AmbientLight(0x404040)
      this.scene.add(aLight)

      const light = new THREE.SpotLight()
      light.position.set(5, 5, 5)
      this.scene.add(light)

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

      this.sphereObject = new ShapeObject(this.spheres, 'circle', greenOrange)

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
        tealOrange
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

      this.cubeObject = new ShapeObject(this.cubes, 'rectangle', tealGreen)

      this.camera.position.z = 5

      const vertexShader = `precision mediump float;

varying vec2 vUv;
varying float vWave;
uniform float uTime;

//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;

  vec3 pos = position;
  float noiseFreq = 3.5;
  float noiseAmp = 0.15;
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
  pos.z += snoise(noisePos) * noiseAmp;
  vWave = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`
      const fragmentShader = `varying vec2 vUv;
varying float vWave;
uniform sampler2D uTexture;

void main() {
  float wave = vWave * 0.05;
  vec3 texture = texture2D(uTexture, vUv + wave).rgb;
  gl_FragColor = vec4(texture, 1.);
}`

      this.planeGeometry = new THREE.PlaneGeometry(8, 8, 16, 16)
      this.planeMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0.0 },
          uTexture: {
            value: new THREE.TextureLoader().load('./assets/grid.png'),
          },
        },
      })

      this.mesh = new THREE.Mesh(this.planeGeometry, this.planeMaterial)
      this.mesh.position.set(0, 0, -2)
      this.scene.add(this.mesh)
      this.container.addEventListener('mousemove', this.onmousemove, false)
      this.container.addEventListener('mouseout', this.onmouseout, false)
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

      if (moving) {
        this.planeMaterial.uniforms.uTime.value = this.clock.getElapsedTime()
      }
    },
    onmouseout() {
      moving = false
    },
    onmousemove(event) {
      moving = true
      this.mouse.x = (event.offsetX / this.renderer.domElement.width) * 2 - 1
      this.mouse.y = -(event.offsetY / this.renderer.domElement.height) * 2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)

      this.intersects = this.raycaster.intersectObjects(this.scene.children)

      if (this.intersects.length > 0) {
        this.serviceText.style.opacity = 1

        switch (this.intersects[0].object) {
          case this.spheres[0]:
            this.sphereObject.whenOver(this.mouse.x, this.mouse.y)
            this.pyramidObject.becomeOther()
            this.cubeObject.becomeOther()
            this.serviceText.innerHTML = 'Digital Craft'
            break
          case this.pyramids[0]:
            this.pyramidObject.whenOver(this.mouse.x, this.mouse.y)
            this.sphereObject.becomeOther()
            this.cubeObject.becomeOther()
            this.serviceText.innerHTML = 'Extended Reality'
            break
          case this.cubes[0]:
            this.cubeObject.whenOver(this.mouse.x, this.mouse.y)
            this.pyramidObject.becomeOther()
            this.sphereObject.becomeOther()
            this.serviceText.innerHTML = 'Virtual Events'
            break
          default:
            break
        }

        this.currentOver = this.intersects[0].object
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
