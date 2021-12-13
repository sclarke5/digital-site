export const scrollToSection = (target) => {
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
      behavior: 'smooth',
    })
  }
}
