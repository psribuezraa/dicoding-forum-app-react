import ThreadItem from './ThreadItem';

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    id: 'thread-1',
    title: 'Tips Belajar React untuk Pemula',
    body: '<p>Bagaimana cara belajar React yang efektif bagi pemula yang baru pindah dari Vanilla JS?</p>',
    category: 'react',
    createdAt: new Date().toISOString(),
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: [],
    totalComments: 5,
    user: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    },
    authUserId: 'user-2',
    onUpVote: (id) => alert(`Upvoted thread: ${id}`),
    onDownVote: (id) => alert(`Downvoted thread: ${id}`),
  },
};
