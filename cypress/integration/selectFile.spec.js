describe('cy.handsOn(".selectFile")', () => {
  beforeEach(() => cy.visit('./index.html'))

  it('selects a file for upload', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selects a file for upload simulating a drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selects a file using an aliased fixture', () => {
    cy.fixture('example.json', { encoding: null }).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selects a file for upload using an aliased fixture (workaround)', () => {
    cy.fixture('example.json', { encoding: null }).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile({
        contents: '@exampleFile',
        fileName: 'example.json'
      })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selects multiple files for upload', () => {
    cy.get('input[type="file"]')
      .selectFile([
        'cypress/fixtures/example.json',
        'cypress/fixtures/example.txt'
      ])
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
        expect(input[0].files[1].name).to.equal('example.txt')
      })
  })

  it('selects multiple files for upload simulating a drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile([
        'cypress/fixtures/example.json',
        'cypress/fixtures/example.txt'
      ], { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
        expect(input[0].files[1].name).to.equal('example.txt')
      })
  })
})
