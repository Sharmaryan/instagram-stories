import { storiesMock } from "../../app/components/StoriesSection/StoriesSection.mock";

describe('Storygram - Basic Story Thumbnails', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display story thumbnails with profile images and names', () => {
        cy.get('[data-testid^="story-button-"]')
            .should('have.length.gt', 0)
            .each(($el) => {
                cy.wrap($el).find('img').should('exist');
                cy.wrap($el).find('[data-testid="story-name"]').should('not.be.empty');
            });
    });

    it('should show loading spinner when story is clicked', () => {
        cy.get('[data-testid^="story-button-"]').should('exist')
        cy.get('[data-testid^="story-button-"]').first().click();
        cy.get('[data-testid="story-spinner"]')
            .should('exist')
            .and('be.visible');
        cy.get('[data-testid="story-spinner"]', { timeout: 1000 })
            .should('not.exist');
    });

    it('should open story viewer with correct content', () => {
        cy.get('[data-testid^="story-button-"]').first().click();
        cy.get('[data-testid="story-profile-image"]')
            .should('exist')
            .and('be.visible');
        cy.get('[data-testid="story-profile-name"]')
            .should('be.visible')
            .invoke('text')
            .should('match', /bill|user/i);
        cy.get('[data-testid="story-profile-image"]')
            .should('have.prop', 'naturalWidth')
            .and('be.greaterThan', 0);
        cy.get('[data-testid="story-progress-bar"]')
            .should('have.length.gt', 0);
    });

    it('should navigate to next user story', () => {
        cy.get('[data-testid^="story-button-"]').first().click();
        cy.get('[data-testid="story-profile-name"]').should('contain', 'bill');
        const billImageCount = storiesMock[0].bill.images.length;
        Cypress._.times(billImageCount, () => {
            cy.get('[data-testid="story-next-arrow"]').click();
        });
        cy.get('[data-testid="story-profile-name"]')
            .invoke('text')
            .should('match', /virat|ronaldo|tata|sadhguru/i);
    });
});

describe('Closing Story Viewer', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid^="story-button-"]').first().click();
        cy.get('[data-testid="story-viewer"]').should('be.visible');
    });

    it('should close when clicking X button', () => {
        cy.get('[data-testid="story-close-button"]').click();
        cy.get('[data-testid="story-viewer"]').should('not.exist');
    });

    it('should close when pressing ESC key', () => {
        cy.get('body').type('{esc}');
        cy.get('[data-testid="story-viewer"]').should('not.exist');
    });
});

describe('Mobile Touch Gestures', () => {
    beforeEach(() => {
        cy.viewport('iphone-6');
        cy.visit('/');
        cy.get('[data-testid^="story-button-"]').first().click();
    });

    it('should navigate to next image on swipe left', () => {
        cy.get('[data-testid="story-image"]')
            .invoke('attr', 'alt')
            .then((initialAlt) => {
                cy.get('[data-testid="story-viewer"]')
                    .trigger('touchstart', { touches: [{ clientX: 300, clientY: 200 }] })
                    .trigger('touchmove', { touches: [{ clientX: 50, clientY: 200 }] })
                    .trigger('touchend');
                cy.wait(500);
                cy.get('[data-testid="story-image"]')
                    .invoke('attr', 'alt')
                    .should('not.equal', initialAlt);
            });
    });

    it('should navigate to previous image on swipe right', () => {
        cy.get('[data-testid="story-viewer"]')
            .trigger('touchstart', { touches: [{ clientX: 300, clientY: 200 }] })
            .trigger('touchmove', { touches: [{ clientX: 50, clientY: 200 }] })
            .trigger('touchend');
        cy.wait(500);
        cy.get('[data-testid="story-image"]')
            .invoke('attr', 'alt')
            .then((afterLeftAlt) => {
                cy.get('[data-testid="story-viewer"]')
                    .trigger('touchstart', { touches: [{ clientX: 50, clientY: 200 }] })
                    .trigger('touchmove', { touches: [{ clientX: 300, clientY: 200 }] })
                    .trigger('touchend');
                cy.wait(500);
                cy.get('[data-testid="story-image"]')
                    .invoke('attr', 'alt')
                    .should('not.equal', afterLeftAlt);
            });
    });
});

describe('Story Viewer - Edge Navigation Cases', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should handle first and last story edge cases', () => {
        cy.get('[data-testid^="story-button-"]').first().click();

        cy.get('[data-testid="story-prev-arrow"]').should('not.exist');
        cy.get('[data-testid="story-profile-name"]')
            .invoke('text')
            .then((firstName) => {
                cy.log(`First story: ${firstName}`);
            });

        cy.get('body').type('{esc}');
        cy.get('[data-testid^="story-button-"]').last().click({ force: true });

        cy.get('[data-testid="story-progress-bar"]')
            .its('length')
            .then((imageCount) => {
                Cypress._.times(imageCount - 1, () => {
                    cy.get('[data-testid="story-next-arrow"]').click({ force: true });
                    cy.wait(300);
                });

                cy.get('[data-testid="story-next-arrow"]').should('not.exist');
                cy.get('[data-testid="story-profile-name"]')
                    .invoke('text')
                    .should('match', /sadhguru/i);
            });
    });
});
