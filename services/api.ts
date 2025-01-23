import { useQuery } from "@tanstack/react-query";
import http from "./axios";

export const useGetChat = (userId: string | null) => {
  return useQuery({
    queryKey: ["chat", userId],
    queryFn: async () => {
      const res = await http.get(`/chat/${userId}`);
      return res.data;
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};
