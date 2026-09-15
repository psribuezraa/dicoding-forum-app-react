import RegisterInput from './RegisterInput';

export default {
  title: 'Components/RegisterInput',
  component: RegisterInput,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    register: (data) => alert(`Register with: ${JSON.stringify(data)}`),
  },
};
