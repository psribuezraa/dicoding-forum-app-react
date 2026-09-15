import { MemoryRouter } from 'react-router-dom';
import '../src/styles/style.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: "todo"
    }
  },
};

export default preview;