import LoginInput from './LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    login: (credentials) => alert(`Login with: ${JSON.stringify(credentials)}`),
  },
};
