/* eslint-disable react/jsx-props-no-spreading */
import {
  describe, it, expect, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem';

describe('ThreadItem component', () => {
  afterEach(() => {
    cleanup();
  });

  const dummyThread = {
    id: 'thread-1',
    title: 'Tips Belajar React',
    body: 'Bagaimana cara belajar React?',
    category: 'react',
    createdAt: new Date().toISOString(),
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 10,
    user: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image.url.jpg',
    },
    authUserId: 'user-2',
    onUpVote: () => {},
    onDownVote: () => {},
  };

  it('should render thread title correctly', () => {
    render(
      <MemoryRouter>
        <ThreadItem {...dummyThread} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Tips Belajar React')).toBeInTheDocument();
  });

  it('should render thread category correctly', () => {
    render(
      <MemoryRouter>
        <ThreadItem {...dummyThread} />
      </MemoryRouter>,
    );
    expect(screen.getByText('#react')).toBeInTheDocument();
  });

  it('should render thread body correctly', () => {
    render(
      <MemoryRouter>
        <ThreadItem {...dummyThread} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Bagaimana cara belajar React?')).toBeInTheDocument();
  });
});
