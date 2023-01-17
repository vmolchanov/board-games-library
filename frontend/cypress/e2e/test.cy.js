const url = 'http://127.0.0.1:5173/join/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/eyJpZCI6MywidGVsZWdyYW1JZCI6ImM1NHl2dHIzMjMiLCJmaXJzdE5hbWUiOiJWeWFjaGVzbGF2IiwibGFzdE5hbWUiOiJTY2h1a2luIiwidXNlck5hbWUiOiJ2LnNjaHVraW4iLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTA4VDE0OjQ4OjEzLjU4OFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAxLTA4VDE0OjQ4OjEzLjU4OFoiLCJpYXQiOjE2NzM4MDMyMzksImV4cCI6MTY3MzgwMzUzOX0/Dj9_HXZktRpLEQ4PoYY-3h7ncXc74TPZdDbLrOYIR_Q';

describe('fd', () => {
  it('tetststet', () => {
    cy.visit(url);

    cy.get('p').contains('Входим в систему, пожалуйста, подождите');

    cy.wait(2000);

    cy.url().then(($url) => {
      if ($url.includes('codenames')) {
        cy.log('correct url');
      }
    });

    cy.get('.logo').contains('Codenames');

    cy.get('h2').then(h2 => {
      const titles = ['Ваш ход', 'Ход капитана', 'Ходит ваша команда', 'Ход соперника']
      const isCorrectTitle = titles.includes(h2[0].textContent);
      expect(isCorrectTitle).equals(true);
    });

    cy.get('.card').then(cards => {
      expect(cards.length).equals(25);
    });
  });
});
