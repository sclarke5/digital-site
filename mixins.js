export const scrollToSection = (target) => {
  const distanceToTarget =
    window.innerWidth <= 799
      ? target.getBoundingClientRect().top
      : target.getBoundingClientRect().left

  const currentPos =
    window.innerWidth <= 799
      ? window.scrollY
      : document.getElementById('scrollEl').scrollTop

  const targetPos = currentPos + distanceToTarget

  console.log(currentPos, distanceToTarget)

  if (window.innerWidth <= 799) {
    window.scroll({
      top: targetPos,
      left: 0,
      behavior: 'smooth',
    })
  } else {
    document.getElementById('scrollEl').scroll({
      top: targetPos,
      left: 0,
      behavior: 'smooth',
    })
  }
}
