list.addEventListener('click', function(e) {
  let target = e.target
  while (target != list) {
    console.log(target)
    if (target.className == 'pp'){
      console.log(target)
    }
  }
})