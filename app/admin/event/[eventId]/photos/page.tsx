"use client";
export const runtime = 'edge'
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEventFolder, useAddEventImages } from "@/hooks/use-event-folders";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { z } from "zod";
import { eventFolders } from "@/lib/family-data";
import { 
  ArrowLeftIcon, 
  SaveIcon, 
  ImageIcon,
  UploadIcon,
  PlusIcon,
  TrashIcon
} from "lucide-react";

const addPhotosSchema = z.object({
  images: z.array(z.object({
    url: z.string().url("Must be a valid URL").min(1, "Image URL is required")
  })).min(1, "At least one image is required")
});

type AddPhotosFormData = z.infer<typeof addPhotosSchema>;

export default function EventPhotosPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  
  const { data: event, isLoading } = useEventFolder(eventId);
  const addPhotosMutation = useAddEventImages();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddPhotosFormData>({
    resolver: zodResolver(addPhotosSchema),
    defaultValues: {
      images: [{ url: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images"
  });

  const onSubmit = async (data: AddPhotosFormData) => {
    try {
      const imageUrls = data.images
        .map(img => img.url.trim())
        .filter(url => url.length > 0);
      
      if (imageUrls.length === 0) {
        return;
      }

      await addPhotosMutation.mutateAsync({
        eventId,
        images: imageUrls
      });
      
      router.push("/admin/event");
    } catch (error) {
      console.error("Failed to add photos:", error);
    }
  };

  const handleImageUpload = (index: number) => {
    // Mock image upload - generate Pexels URL
    const mockImageUrl = `https://images.pexels.com/photos/${1000000 + Date.now() + index}/pexels-photo-${1000000 + Date.now() + index}.jpeg?auto=compress&cs=tinysrgb&w=600`;
    
    // Update the specific field
    const currentImages = [...fields];
    currentImages[index] = { id: index.toString(), url: mockImageUrl };
    
    // Remove all fields and re-add them with updated values
    while (fields.length > 0) {
      remove(0);
    }
    currentImages.forEach(img => append(img));
  };

  const addNewImageField = () => {
    append({ url: "" });
  };

  const removeImageField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/admin/event" className="text-indigo-600 hover:text-indigo-800">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/event"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon size={20} />
                <span>Back to Events</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <ImageIcon size={20} className="text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-900">Add Photos to {event.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="p-8">
            {/* Current Photos */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Photos ({event.images?.length || 0})</h3>
              {event.images && event.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {event.images.map((image: string, index: number) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${event.name} photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <ImageIcon className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-500">No photos yet</p>
                </div>
              )}
            </div>

            {/* Add New Photos Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Add New Photos</h3>
                  <button
                    type="button"
                    onClick={addNewImageField}
                    className="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                  >
                    <PlusIcon size={16} />
                    Add Photo
                  </button>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3">
                      <div className="flex-1 flex items-center gap-3">
                        {field.url && (
                          <img
                            src={field.url}
                            alt={`New photo ${index + 1}`}
                            className="w-12 h-12 rounded object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <input
                            {...control.register(`images.${index}.url` as const)}
                            type="url"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter image URL"
                          />
                          {errors.images?.[index]?.url && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.images[index]?.url?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleImageUpload(index)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Generate mock image"
                      >
                        <UploadIcon size={16} />
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        disabled={fields.length === 1}
                        className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove image"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {errors.images && (
                  <p className="text-sm text-red-600">
                    {errors.images.message || "Please add at least one valid image"}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <Link
                  href="/admin/event"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || addPhotosMutation.isPending}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg transition-colors"
                >
                  {isSubmitting || addPhotosMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding Photos...
                    </>
                  ) : (
                    <>
                      <SaveIcon size={16} />
                      Add Photos ({fields.length})
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}