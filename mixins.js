export const scrollToSection = (target, behavior = 'smooth') => {
  // target parameter being pass is the element we want to see

  const distanceToTarget =
    window.innerWidth <= 1024
      ? target.getBoundingClientRect().top
      : target.getBoundingClientRect().left

  // if mobile, get the top position, if desktop, get left position

  const currentPos =
    window.innerWidth <= 1024
      ? window.scrollY
      : document.getElementById('scrollEl').scrollTop

  // if mobile, get the window scroll position, if desktop, get scrolling element scroll position

  // this is the math to figure out how many px to move to get to the target. distanceToTarget alone doesn't work, not sure why!!
  const targetPos = currentPos + distanceToTarget

  if (window.innerWidth <= 1024) {
    // on mobile, move entire window
    window.scroll({
      top: targetPos,
      left: 0,
      behavior: 'smooth',
    })
  } else {
    // on desktop move the scrolling container
    document.getElementById('scrollEl').scroll({
      top: targetPos,
      left: 0,
      behavior,
    })
  }
}

// const isElementInViewport = (elem) => {
//   const rect = elem.getBoundingClientRect()

//   // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
//   const windowHeight =
//     window.innerHeight || document.documentElement.clientHeight
//   const windowWidth = window.innerWidth || document.documentElement.clientWidth

//   // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
//   const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0
//   const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0

//   return vertInView && horInView
// }
