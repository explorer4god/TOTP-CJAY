describe('2FA Interface Accessibility', () => {
    it('should be navigable with a keyboard', () => {
      renderApp(); // Function to mount the application in a test environment
      const loginButton = screen.getByRole('button', {name: /log in/i});
      userEvent.tab(); // Simulates tab key to navigate
      expect(loginButton).toHaveFocus();
    });
  
    it('should have proper alt text for all images', () => {
      renderApp();
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt');
      expect(image.alt.length).toBeGreaterThan(0);
    });
  });
  