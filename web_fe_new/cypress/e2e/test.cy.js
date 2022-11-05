// describe('student login test', () => {
//   beforeEach(() => {        
//     cy.visit('http://localhost:3000')
//   })

//   it('Wrong password ', () => {
//     cy.get('#username').type("stud1")
//     cy.get('#password').type("stud1")
//     cy.get('#btn-login').click()    
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(`Wrong input!`)
//     })
//     })

//   it('Empty field ', () => {
//     cy.get('#username').type("stud1")
//     cy.get('#btn-login').click()    
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(`Enter all fields!`)
//     })
//     })

//   it('Successful login ', () => {
//     cy.get('#username').type("stud1")
//     cy.get('#password').type("stud1pw")
//     cy.get('#btn-login').click()    
//     cy.url().should('include', '/play')
//     })

// });

// describe('student create question test', () => {
//   beforeEach(() => {        
//     cy.visit('http://localhost:3000')
//     cy.get('#username').type("stud1")
//     cy.get('#password').type("stud1pw")
//     cy.get('#btn-login').click()  
//     cy.get("nav").contains("Create").click();
//   })

//   it('Any field not filled ', () => {
//     cy.get('#worldCustom').click({force:true})
//     cy.get('#level1').click({force:true})
//     cy.get('#question1').click({force:true})
//     cy.get('#inputQuestion').type("What is 1 x 1?")
//     cy.get('#optionA').type("1")
//     cy.get('#optionB').type("2")
//     cy.get('#optionC').type("3")
//     cy.get('#answerA').click({force:true})
//     cy.get('#btn-ok-create').click()    
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(`Enter all fields!`)
//     })
//     })

//   it('All field filled ', () => {
//     cy.get('#worldCustom').click({force:true})
//     cy.get('#level1').click({force:true})
//     cy.get('#question1').click({force:true})
//     cy.get('#inputQuestion').type("What is 1 x 1?")
//     cy.get('#optionA').type("1")
//     cy.get('#optionB').type("2")
//     cy.get('#optionC').type("3")
//     cy.get('#optionD').type("4")
//     cy.get('#answerA').click({force:true})
//     cy.get('#btn-ok-create').click()    
//     cy.url().should('include', '/read')
//     })
// });

// describe('student update question test', () => {
//   beforeEach(() => {        
//     cy.visit('http://localhost:3000')
//     cy.get('#username').type("stud1")
//     cy.get('#password').type("stud1pw")
//     cy.get('#btn-login').click()  
//     cy.get("nav").contains("Update").click();
//     cy.get('#49').click()
//   })

//   it('Any field not filled ', () => {
//     cy.get('#optionC').clear()
//     cy.get('#btn-ok-create').click()    
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(`Enter all fields!`)
//     })
//     })

//   it('All field updated and filled ', () => {
//     cy.get('#optionC').clear()
//     cy.get('#optionC').type("23")
//     cy.get('#btn-ok-create').click()    
//     cy.url().should('include', '/choose-update-questions')
//     })
// });

// describe('professor login test', () => {
//   beforeEach(() => {        
//     cy.visit('http://localhost:3000')
//   })

//   it('Wrong password ', () => {
//     cy.get('#username').type("prof1")
//     cy.get('#password').type("prof1")
//     cy.get('#btn-login').click()    
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(`Wrong input!`)
//     })
//     })

//   it('Empty field ', () => {
//     cy.get('#username').type("prof1")
//     cy.get('#btn-login').click()    
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(`Enter all fields!`)
//     })
//     })

//   it('Successful login ', () => {
//     cy.get('#username').type("prof1")
//     cy.get('#password').type("prof1pw")
//     cy.get('#btn-login').click()    
//     cy.url().should('include', '/summary-report')
//     })

// });

// describe('professors create question test', () => {
//   beforeEach(() => {        
//     cy.visit('http://localhost:3000')
//     cy.get('#username').type("prof1")
//     cy.get('#password').type("prof1pw")
//     cy.get('#btn-login').click()  
//     cy.get("nav").contains("Create").click();
//   })

//   it('Any field not filled ', () => {
//     cy.get('#world3').click({force:true})
//     cy.get('#level1').click({force:true})
//     cy.get('#question1').click({force:true})
//     cy.get('#inputQuestion').type("What is 10 x 10?")
//     cy.get('#optionA').type("100")
//     cy.get('#optionB').type("200")
//     cy.get('#optionC').type("300")
//     cy.get('#answerA').click({force:true})
//     cy.get('#btn-ok-create').click()    
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(`Enter all fields!`)
//     })
//     })

//   it('All field filled ', () => {
//     cy.get('#world3').click({force:true})
//     cy.get('#level1').click({force:true})
//     cy.get('#question1').click({force:true})
//     cy.get('#inputQuestion').type("What is 10 x 10?")
//     cy.get('#optionA').type("100")
//     cy.get('#optionB').type("200")
//     cy.get('#optionC').type("300")
//     cy.get('#optionD').type("400")
//     cy.get('#answerA').click({force:true})
//     cy.get('#btn-ok-create').click()    
//     cy.url().should('include', '/read')
//     })
// });

// describe('professor update question test', () => {
//   beforeEach(() => {        
//     cy.visit('http://localhost:3000')
//     cy.get('#username').type("prof1")
//     cy.get('#password').type("prof1pw")
//     cy.get('#btn-login').click()  
//     cy.get("nav").contains("Update").click();
//     cy.get('#48').click()
//   })

//   it('Any field not filled ', () => {
//     cy.get('#optionC').clear()
//     cy.get('#btn-ok-create').click()    
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(`Enter all fields!`)
//     })
//     })

//   it('All field updated and filled ', () => {
//     cy.get('#optionC').clear()
//     cy.get('#optionC').type("230")
//     cy.get('#btn-ok-create').click()    
//     cy.url().should('include', '/choose-update-questions')
//     })
// });

// describe('professor delete question test', () => {
//   beforeEach(() => {        
//     cy.visit('http://localhost:3000')
//     cy.get('#username').type("prof1")
//     cy.get('#password').type("prof1pw")
//     cy.get('#btn-login').click()  
//     cy.get("nav").contains("Delete").click();
//     cy.get('#43').click()
//   })

//   it('Question deleted ', () => {
//     cy.on('window:confirm', (str) => {
//       expect(str).to.equal("Are you sure you wish to delete this question?")
//     })   
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal("Question deleted")
//     })  
//     })
// });

describe('professor view summary report', () => {
  beforeEach(() => {        
    cy.visit('http://localhost:3000')
    cy.get('#username').type("prof1")
    cy.get('#password').type("prof1pw")
    cy.get('#btn-login').click()  
  })

  it('professor able to view overall summary report', () => {
    cy.url().should('include', '/summary-report')
  })

  it('professor able to view student summary report', () => {
    cy.get('select').select('stud1')
    cy.url().should('include', '/summary-report-student?user=stud1')
  })

})