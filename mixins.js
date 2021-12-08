export const scrollToSection = (target) => {
  const distanceToTarget = target.getBoundingClientRect().left

  const currentPos = document.getElementById('scrollEl').scrollTop
  // const bodyPos = document.getElementById('scrollEl').scrollHeight
  // const targetPos = currentPos + distanceToTarget

  console.log(currentPos, distanceToTarget)
  // console.log(`currently at ${currentPos}, body is ${bodyPos} long`)

  // document.getElementById('scrollEl').scrollTo(0, targetPos)
}
