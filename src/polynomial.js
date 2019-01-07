function polynomial(coefficients) {
  console.log('generating polynomial with degree ', coefficients.length, ' and coefficients ', coefficients);

  return {
    degree: coefficients.length,
    coefficients: coefficients,
    description: function() {
      return this.coefficients.reduce((description, coefficient, n) => {
        if(coefficient === 0) {
          return description
        }
        let next = description + `${coefficient}x^${n}`
        if(n < this.coefficients.length-1) {
          next += " + "
        }
        return next
      }, 'f(x) = ')
    },
    calculate: function(x) {
      return this.coefficients.reduce((value, coefficient, n) => {
        return value + coefficient*Math.pow(x, n)
      }, 0)
    }
  }
}

export default polynomial
