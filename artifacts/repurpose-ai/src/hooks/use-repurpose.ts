import { useQueryClient } from "@tanstack/react-query";
import { useGenerateContent, useGetHistory } from "@workspace/api-client-react";

export function useGenerate() {
  const queryClient = useQueryClient();
  
  return useGenerateContent({
    mutation: {
      onSuccess: () => {
        // Invalidate history so the new generation shows up in the history page immediately
        queryClient.invalidateQueries({ queryKey: ["/api/history"] });
      }
    }
  });
}

export function useHistory() {
  return useGetHistory();
}
