;(function () {
  const buttons = document.querySelectorAll('button')
  const screen = document.querySelector('.screen.top')
  const screenBottom = document.querySelector('.screen.bottom')
  
  var total = ''
  var num = ''
  var operand = undefined
  var expression = ''

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      screen.style.color = '#000'
      const input = e.target.dataset.val
      
      if (isClear(input)) {
        reset()
        screen.value = ''
      }
    
      if (isOperand(input) && total) {
        handleOperand(input)
      }
      
      if (isNumber(input) || isDecimalPoint(input)) {
        handleNumber(input)
      }
      
      screen.value=expression
      
      if (isEquals(input)) {
        handleEquals()
      }
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
  
  function handleEquals () {
    if (total && num) {
      screen.value = eval(`${total} ${operand} ${num}`)
    } else {
      screen.value = total
    }
    screen.style.color = '#18aa35'
    reset ()
  }
  
  function handleOperand (input) {
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
  
  function handleNumber (input) {
    if (!operand) {
      // first number being added to equation so set 
      // it to total
      if (isDecimalPoint(input)) {
        // only allow one decimal point to be added
        // to each number
        if (!hasDecimalPoint(total)) {
          total += input
          expression = expression + input
        }
      } else {
        // maximum of one leading zeros
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
  
  function reset () {
    total = ''
    num = ''
    operand = undefined
    expression = ''
    screenBottom.value = ''
  }

})()