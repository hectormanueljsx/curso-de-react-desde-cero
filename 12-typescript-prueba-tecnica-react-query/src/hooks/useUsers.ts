import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchUsers } from '../services/users';
import { type User } from '../types.d';

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    nextCursor?: number;
    users: User[];
  }>(['users'], fetchUsers, {
    getNextPageParam: lastPage => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 3,
  });

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap(page => page.users) ?? [],
    hasNextPage,
  };
};
