const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  await delay(300);

  return await fetch(`https://randomuser.me/api/?results=10&page=${pageParam}&seed=dev`)
    .then(async res => {
      if (!res.ok) throw new Error('Error en la petición');
      return await res.json();
    })
    .then(res => {
      const currentPage = Number(res.info.page);
      const nextCursor = currentPage > 9 ? undefined : currentPage + 1;

      return {
        users: res.results,
        nextCursor,
      };
    });
};
