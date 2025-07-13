"use client";
export const runtime = 'edge'
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useFamilyMember, useUpdateFamilyMember } from "@/hooks/use-family-members";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { familyMemberSchema, FamilyMemberFormData } from "@/utils/form-validation";
import { ROLE_OPTIONS } from "@/utils/constants";
import { familyMembers } from "@/lib/family-data";
import { 
  ArrowLeftIcon, 
  SaveIcon, 
  UserIcon,
  UploadIcon,
  PlusIcon,
  TrashIcon
} from "lucide-react";

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();
  const memberId = params.id as string;
  
  const { data: member, isLoading } = useFamilyMember(memberId);
  const updateMemberMutation = useUpdateFamilyMember();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm<FamilyMemberFormData>({
    resolver: zodResolver(familyMemberSchema),
    defaultValues: {
      name: member?.name || "",
      role: member?.role || "",
      thumbnail: member?.thumbnail || "",
      bio: member?.bio || "",
      carouselImages: member?.carouselImages || [],
    }
  });
  
  // const { fields, append, remove } = useFieldArray<FamilyMemberFormData>({
  //   control,
  //   name: "carouselImages"
  // });

  const fields = watch('carouselImages') || [];

  const onSubmit = async (data: FamilyMemberFormData) => {
    try {
      const memberData = {
        ...data,
        carouselImages: data.carouselImages?.filter(img => img.trim()) || [],
      };

      await updateMemberMutation.mutateAsync({
        id: memberId,
        data: memberData
      });
      
      router.push("/admin/members");
    } catch (error) {
      console.error("Failed to update member:", error);
    }
  };

  const addCarouselImage = () => {
    setValue('carouselImages', [...fields, ""]);
  };

  const removeCarouselImage = (index: number) => {
    if (fields.length > 1) {
      setValue('carouselImages', fields.filter((_, i) => i !== index));
    }
  };

  const updateCarouselImage = (index: number, value: string) => {
    setValue(`carouselImages.${index}`, value);
  };

  const handleImageUpload = (field: "thumbnail" | "carousel", index?: number) => {
    // Mock image upload - generate Pexels URL
    const mockImageUrl = `https://images.pexels.com/photos/${1000000 + Date.now()}/pexels-photo-${1000000 + Date.now()}.jpeg?auto=compress&cs=tinysrgb&w=600`;
    
    if (field === "thumbnail") {
      setValue("thumbnail", mockImageUrl);
    } else if (field === "carousel" && index !== undefined) {
      updateCarouselImage(index, mockImageUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Member Not Found</h1>
          <Link href="/admin/members" className="text-indigo-600 hover:text-indigo-800">
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/members"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon size={20} />
                <span>Back to Members</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <UserIcon size={20} className="text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-900">Edit {member.name}</h1>
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
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <UserIcon size={20} />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    {...register("role")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select role</option>
                    {ROLE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Brief biography..."
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  {watch("thumbnail") && (
                    <img
                      src={watch("thumbnail")}
                      alt="Thumbnail preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex gap-2 flex-1">
                    <input
                      {...register("thumbnail")}
                      placeholder="Image URL"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageUpload("thumbnail")}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <UploadIcon size={16} />
                      Upload
                    </button>
                  </div>
                </div>
                {errors.thumbnail && (
                  <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>
                )}
              </div>
            </div>

            {/* Carousel Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Carousel Images</h3>
                <button
                  type="button"
                  onClick={addCarouselImage}
                  className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                >
                  <PlusIcon size={16} />
                  Add Image
                </button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-3">
                      {watch(`carouselImages.${index}`) && (
                        <img
                          src={watch(`carouselImages.${index}`)}
                          alt={`Carousel ${index + 1}`}
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                      <input
                        {...register(`carouselImages.${index}`)}
                        type="url"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Image URL"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleImageUpload("carousel", index)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <UploadIcon size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCarouselImage(index)}
                      disabled={fields.length === 1}
                      className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/members"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <SaveIcon size={16} />
                    Update Member
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}