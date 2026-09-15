/**
 * skenario test
 *
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display validation error when email is empty', () => {
    cy.get('button').contains(/^Login$/).click();
    cy.get('input[placeholder="Email"]:invalid').should('have.length', 1);
  });

  it('should display validation error when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('button').contains(/^Login$/).click();
    cy.get('input[placeholder="Password"]:invalid').should('have.length', 1);
  });

  it('should display alert when email and password are wrong', () => {
    // Mencegat request API login dan mengembalikan response gagal
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    });

    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('wrong_password');
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // Mencegat request API login dan mengembalikan response sukses
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'dummy_token',
        },
      },
    });

    // Mencegat request API getOwnProfile dan mengembalikan response sukses
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
          },
        },
      },
    });

    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button').contains(/^Login$/).click();

    // Memastikan elemen profil muncul di top bar (menandakan berhasil login)
    cy.get('.user-profile-btn').should('be.visible');
    cy.get('.user-name').should('contain', 'John Doe');
  });
});
