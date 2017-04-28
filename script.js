var total = ''
var num = ''
var operand = false;

(function () {
  const buttons = document.querySelectorAll('button')
  const screen = document.querySelector('.screen')

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      

      
      let input = e.target.dataset.val
      if (isNumber(input) || input === '.') {
        if (operand) {
          num = num + input
          screen.value = num
        } else {
          total = total + input
          screen.value = total
        }
        
      } else if (isOperand(input)) {
        screen.value = input
        if (operand) {
          total = eval(`${total} ${operand} ${num}`)
          operand = input
        } else {
          operand = input
        }
        num = ''
      }
      
      
      
      
      console.log(total)
    })
  })


  function isNumber (str) {
    return !isNaN(str)
  }
  
  function isOperand (str) {
    return str === '+' || str === '-' || str === '*' || str === '%'
  }
})()