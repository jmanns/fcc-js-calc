var total = ''
var num = ''
var operand = undefined
var expression = ''

;;(function () {
  const buttons = document.querySelectorAll('button')
  const screen = document.querySelector('.screen.top')
  const screenBottom = document.querySelector('.screen.bottom')

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const input = e.target.dataset.val
      
      if (isClear(input)) {
        reset()
      }
    
      // handle operand
      if (isOperand(input) && total) {
        if (isOperand(expression.slice(-1))) {
          expression = expression.slice(0, -1) + input
        } else {
          expression = expression + input
        }
        if (operand && num) {
          total = eval(`${total} ${operand} ${num}`)
          screenBottom.value = total
          num = ''
        }
        operand = input
      }
      
      // handle number
      if (isNumber(input) || isDecimalPoint(input)) {
        if (!operand) {
          if (isDecimalPoint(input)) {
            if (!hasDecimalPoint(total)) {
              total += input
              expression = expression + input
            }
          } else {
            if (total === '0') {
              total = input
            } else {
              total = total + input
            }
            expression = expression + input
          }
            
        } else {
          if (isDecimalPoint(input)) {
            if (!hasDecimalPoint(num)) {
              num += input
              expression = expression + input
            }
          } else {
            if (num === '0') {
              num = input
            } else {
              num = num + input
            }
            expression = expression + input
          }
          screenBottom.value = eval(`${total} ${operand} ${num}`)
        }
      }
      
      // handleEquals
      if (isEquals(input)) {
        if (total && num) {
          total = eval(`${total} ${operand} ${num}`)
          num = ''
          operand = undefined
          expression = total + ''
          screenBottom.value = ''
        } else {
          expression = total
        }
        
      }
      
      
      screen.value=expression
      
      console.log('TOTAL', total)
      console.log('NUM', num)
      console.log('OPERAND', operand)
    })
  })
  
  function isClear (str) {
    return str === 'C'
  }


  function isNumber (str) {
    return !isNaN(str)
  }
  
  function isOperand (str) {
    return str === '+' || str === '-' || str === '*' || str === '/' || str === '%'
  }
  
  function isEquals (str) {
    return str === '='
  }
  
  function isDecimalPoint (str) {
    return str === '.'
  }
  
  function hasDecimalPoint (str) {
    console.log(str.includes('.'))
    return str.includes('.')
  }
  
  function reset () {
    total = ''
    num = ''
    operand = undefined
    expression = ''
    screen.value = ''
    screenBottom.value = ''
  }
})()