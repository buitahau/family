import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/services/api-client';

const QUERY_KEYS = {
  FAMILY_MEMBERS: 'family-members',
  FAMILY_MEMBER: 'family-member',
};

export function useFamilyMembers() {
  return useQuery({
    queryKey: [QUERY_KEYS.FAMILY_MEMBERS],
    queryFn: ApiClient.getFamilyMembers,
  });
}

export function useFamilyMember(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.FAMILY_MEMBER, id],
    queryFn: () => ApiClient.getFamilyMemberById(id),
    enabled: !!id,
  });
}

export function useCreateFamilyMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (memberData: any) => ApiClient.createFamilyMember(memberData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAMILY_MEMBERS] });
    },
  });
}

export function useUpdateFamilyMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      ApiClient.updateFamilyMember(id, data),
    onSuccess: (updatedMember) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAMILY_MEMBERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAMILY_MEMBER, updatedMember.id] });
    },
  });
}

export function useDeleteFamilyMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => ApiClient.deleteFamilyMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAMILY_MEMBERS] });
    },
  });
}

export function useAddGalleryImages() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ memberId, images }: { memberId: string; images: any[] }) =>
      ApiClient.addGalleryImages(memberId, images),
    onSuccess: (updatedMember) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAMILY_MEMBERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAMILY_MEMBER, updatedMember.id] });
    },
  });
}