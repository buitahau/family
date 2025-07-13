"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { ImageModal } from "./image-modal";
import { GalleryImage } from "@/lib/family-data";

interface LazyGalleryProps {
  images: GalleryImage[];
}

export function LazyGallery({ images }: LazyGalleryProps) {
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const INITIAL_LOAD = 6;
  const LOAD_MORE_COUNT = 6;

  // Group images by year and sort by year (newest first)
  const imagesByYear = images.reduce((acc, image) => {
    if (!acc[image.year]) {
      acc[image.year] = [];
    }
    acc[image.year].push(image);
    return acc;
  }, {} as Record<number, GalleryImage[]>);

  const sortedYears = Object.keys(imagesByYear)
    .map(Number)
    .sort((a, b) => b - a); // Newest first

  useEffect(() => {
    // Load initial images
    const initialImages = images.slice(0, INITIAL_LOAD);
    setVisibleImages(initialImages);
    setHasMore(images.length > INITIAL_LOAD);
  }, [images]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loading]);

  const loadMoreImages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentCount = visibleImages.length;
    const nextBatch = images.slice(currentCount, currentCount + LOAD_MORE_COUNT);
    
    setVisibleImages(prev => [...prev, ...nextBatch]);
    setHasMore(currentCount + LOAD_MORE_COUNT < images.length);
    setLoading(false);
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigateModal = (index: number) => {
    setModalImageIndex(index);
  };

  const getImageUrls = (images: GalleryImage[]): string[] => {
    return images.map(img => img.url);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  return (
    <div>
      {sortedYears.map((year) => {
        const yearImages = imagesByYear[year];
        const visibleYearImages = visibleImages.filter(img => img.year === year);
        
        if (visibleYearImages.length === 0) return null;

        return (
          <div key={year} className="mb-12">
            {/* Year Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{year}</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto"></div>
            </motion.div>

            {/* Images Grid for this year */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {visibleYearImages.map((image, index) => {
                  const globalIndex = visibleImages.findIndex(img => img.url === image.url);
                  return (
                    <motion.div
                      key={`${year}-${index}`}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group cursor-pointer"
                      onClick={() => openModal(globalIndex)}
                    >
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.caption || `Gallery image from ${year}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        {image.caption && (
                          <div className="p-4">
                            <p className="text-sm text-gray-600 text-center">{image.caption}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        );
      })}

      {/* Load More Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="mt-12 text-center">
          {loading && (
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600">Loading more photos...</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && visibleImages.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-500">You've reached the end of the gallery</p>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        images={getImageUrls(images)}
        currentIndex={modalImageIndex}
        isOpen={modalOpen}
        onClose={closeModal}
        onNavigate={navigateModal}
      />
    </div>
  );
}