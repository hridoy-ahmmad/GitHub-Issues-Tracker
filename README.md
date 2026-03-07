1️⃣ What is the difference between var, let, and const?\
> var is in the global scope, let and const are block scope.
> By using var, the variable can be redeclared and re-assigned
> By using let, the variable can be reassigned, but cannot be redeclared
> By using const, the variable can't be reassigned & redeclared

2️⃣ What is the spread operator (...)?
It is used when need to copy an array without changing the main array. 
example: const mainArray = [1,2,3]
        const copiedArray = [...mainArray]
        console.log('copiedArray:', copiedArray)
        output: 'copiedArray:' [1,2,3]
        
3️⃣ What is the difference between map(), filter(), and forEach()?
**map()**: Return a new array and works with each items into the array; it does not change the main array. 
      example: 
          const items = [1,2,3]
          const doubled = items.map(item => item * 2);
          console.log(doubled);
          output: 2,4,6
**filter()**: filter returns an array conditionally
        example: 
          const items = [1,2,3,4,5,6]
          const evenNumbers = items.filter(item=> item%2 === 0)
          console.log(evenNumbers);
          output: 2,4,6
**forEach()**: Calls a function for each element in an array

4️⃣ What is an arrow function?
> Arrow function is the updated and short version of function. It's a new feature of ES6. ()=>{}
5️⃣ What are template literals?
> A  template literal string is a feature of ES6 that makes strings dynamic and powerful.Use backtick(``) instid of using single quote('') or double quote("")
