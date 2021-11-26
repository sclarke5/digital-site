// the data for the animations

export const animations = [
  {
    stage: 'initial',
    enterAnimation: {
      start: 0,
      end: 5,
      movements: [
        {
          object: 'cube',
          position: {
            x: 0.75,
            y: 0,
            z: 1,
          },
          rotation: {
            x: 0,
            y: 0,
            z: Math.PI / 4,
          },
          scale: {
            x: 0.9,
            y: 0.9,
            z: 0.9,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
        {
          object: 'pyramid',
          position: {
            x: -1,
            y: -1,
            z: 1,
          },
          rotation: {
            x: 0.2,
            y: Math.PI / 4,
            z: -Math.PI / 4,
          },
          scale: {
            x: 0.15,
            y: 0.15,
            z: 0.15,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
        {
          object: 'sphere',
          position: {
            x: -1,
            y: 1,
            z: 1,
          },
          rotation: {
            x: Math.PI / 4,
            y: 0,
            z: Math.PI / 4,
          },
          scale: {
            x: 0.1,
            y: 0.1,
            z: 0.1,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
      ],
    },
  },
  {
    stage: 'digital craft',
    enterAnimation: {
      start: 5,
      end: 15,
      anEnd: 30,
      movements: [
        {
          object: 'cube',
          position: {
            x: 0,
            y: 0,
            z: 1,
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          scale: {
            x: 3,
            y: 2,
            z: 0.1,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
        {
          object: 'pyramid',
          position: {
            x: -0.75,
            y: -0.25,
            z: 2,
          },
          rotation: {
            x: 0,
            y: Math.PI / 3,
            z: 0,
          },
          scale: {
            x: 0.08,
            y: 0.08,
            z: 0.08,
          },
          opacitySolid: 0,
          opacityLine: 1,
        },
        {
          object: 'sphere',
          position: {
            x: 0.75,
            y: 0.3,
            z: 2,
          },
          rotation: {
            x: Math.PI / 4,
            y: 0,
            z: Math.PI / 4,
          },
          scale: {
            x: 0.07,
            y: 0.07,
            z: 0.07,
          },
          opacitySolid: 0,
          opacityLine: 1,
        },
      ],
    },
  },
  {
    stage: 'extended reality',
    enterAnimation: {
      start: 31,
      end: 35,
      anEnd: 64,
      movements: [
        {
          object: 'cube',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          scale: {
            x: 3,
            y: 2,
            z: 2,
          },
          opacitySolid: 0,
          opacityLine: 1,
        },
        {
          object: 'pyramid',
          position: {
            x: -0.45,
            y: -0.25,
            z: 2,
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          scale: {
            x: 0.08,
            y: 0.08,
            z: 0.08,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
        {
          object: 'sphere',
          position: {
            x: 0.6,
            y: -0.4,
            z: 2,
          },
          rotation: {
            x: Math.PI / 4,
            y: 0,
            z: Math.PI / 4,
          },
          scale: {
            x: 0.06,
            y: 0.06,
            z: 0.06,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
      ],
    },
  },
  {
    stage: 'virtual events & experiences',
    enterAnimation: {
      start: 65,
      end: 70,
      anEnd: 100,
      movements: [
        {
          object: 'cube',
          position: {
            x: 0,
            y: -0.2,
            z: 1,
          },
          rotation: {
            x: -Math.PI / 2 + 0.05,
            y: 0,
            z: -Math.PI / 4,
          },
          scale: {
            x: 2.5,
            y: 2.5,
            z: 0.2,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
        {
          object: 'pyramid',
          position: {
            x: 0,
            y: 0.1,
            z: 1.5,
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          scale: {
            x: 0.07,
            y: 0.07,
            z: 0.07,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
        {
          object: 'sphere',
          position: {
            x: 0.5,
            y: 0,
            z: 1,
          },
          rotation: {
            x: Math.PI / 4,
            y: 0,
            z: Math.PI / 4,
          },
          scale: {
            x: 0.04,
            y: 0.04,
            z: 0.04,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
      ],
    },
  },
  {
    stage: 'contact',
    enterAnimation: {
      movements: [
        {
          object: 'cube',
          position: {
            x: 0.75,
            y: 0,
            z: 1,
          },
          rotation: {
            x: 0,
            y: 0,
            z: Math.PI / 4,
          },
          scale: {
            x: 0.9,
            y: 0.9,
            z: 0.9,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
        {
          object: 'pyramid',
          position: {
            x: -1,
            y: -1,
            z: 1,
          },
          rotation: {
            x: 0.2,
            y: Math.PI / 4,
            z: -Math.PI / 4,
          },
          scale: {
            x: 0.15,
            y: 0.15,
            z: 0.15,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
        {
          object: 'sphere',
          position: {
            x: -1,
            y: 1,
            z: 1,
          },
          rotation: {
            x: Math.PI / 4,
            y: 0,
            z: Math.PI / 4,
          },
          scale: {
            x: 0.13,
            y: 0.13,
            z: 0.13,
          },
          opacitySolid: 1,
          opacityLine: 0,
        },
      ],
    },
  },
]
