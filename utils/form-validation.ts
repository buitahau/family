import { z } from 'zod';

export const familyMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  role: z.string().min(1, 'Role is required'),
  thumbnail: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio is too long').optional(),
  carouselImages: z.array(z.string().url('Must be a valid URL')).optional(),
});

export const eventFolderSchema = z.object({
  name: z.string().min(1, 'Event name is required').max(100, 'Name is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  year: z.number().min(1900, 'Year must be after 1900').max(2100, 'Year must be before 2100'),
  color: z.string().min(1, 'Color is required'),
  icon: z.string().min(1, 'Icon is required'),
});

export const timelineEventSchema = z.object({
  year: z.number().min(1900).max(2100),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['milestone', 'achievement', 'memory', 'celebration']),
});

export const galleryImageSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  year: z.number().min(1900).max(2100),
  caption: z.string().optional(),
});

export const addPhotosSchema = z.object({
  images: z.array(z.string().url('Must be a valid URL')).min(1, 'At least one image is required'),
});

export type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;
export type EventFolderFormData = z.infer<typeof eventFolderSchema>;
export type TimelineEventFormData = z.infer<typeof timelineEventSchema>;
export type GalleryImageFormData = z.infer<typeof galleryImageSchema>;
export type AddPhotosFormData = z.infer<typeof addPhotosSchema>;