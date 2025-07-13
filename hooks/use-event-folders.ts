import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/services/api-client';

const QUERY_KEYS = {
  EVENT_FOLDERS: 'event-folders',
  EVENT_FOLDER: 'event-folder',
};

export function useEventFolders() {
  return useQuery({
    queryKey: [QUERY_KEYS.EVENT_FOLDERS],
    queryFn: ApiClient.getEventFolders,
  });
}

export function useEventFolder(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.EVENT_FOLDER, id],
    queryFn: () => ApiClient.getEventFolderById(id),
    enabled: !!id,
  });
}

export function useCreateEventFolder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (folderData: any) => ApiClient.createEventFolder(folderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT_FOLDERS] });
    },
  });
}

export function useUpdateEventFolder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      ApiClient.updateEventFolder(id, data),
    onSuccess: (updatedFolder) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT_FOLDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT_FOLDER, updatedFolder.id] });
    },
  });
}

export function useDeleteEventFolder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => ApiClient.deleteEventFolder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT_FOLDERS] });
    },
  });
}

export function useAddEventImages() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ eventId, images }: { eventId: string; images: string[] }) =>
      ApiClient.addEventImages(eventId, images),
    onSuccess: (updatedFolder) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT_FOLDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT_FOLDER, updatedFolder.id] });
    },
  });
}

export function useUploadImages() {
  return useMutation({
    mutationFn: (files: File[]) => ApiClient.uploadImages(files),
  });
}