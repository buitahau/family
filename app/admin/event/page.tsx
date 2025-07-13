"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MOCK_EVENT_FOLDERS } from "@/services/mock-data";
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  ImageIcon, 
  CalendarIcon,
  SearchIcon,
  ArrowLeftIcon,
  CakeIcon,
  HeartIcon,
  StarIcon,
  GiftIcon,
  FolderIcon
} from "lucide-react";

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Cake: CakeIcon,
    Heart: HeartIcon,
    Star: StarIcon,
    Gift: GiftIcon,
    Folder: FolderIcon
  };
  return icons[iconName] || FolderIcon;
};

export default function EventPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const events = MOCK_EVENT_FOLDERS;

  const availableYears = Array.from(new Set(events.map((event) => event.year))).sort((a, b) => b - a);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === "all" || event.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  const handleDeleteEvent = async (eventId: string, eventName: string) => {
    if (confirm(`Are you sure you want to delete "${eventName}"?`)) {
      console.log(`Deleting event: ${eventId}`);
      // Mock delete - in real app would call API
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon size={20} />
                <span>Back to Admin</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">Special Events & Occasions</h1>
            </div>
            
            <Link
              href="/admin/event/create"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PlusIcon size={20} />
              Create Event
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === "all" ? "all" : parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500">Create your first event or adjust your search filters</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEvents.map((event) => {
                const IconComponent = getIconComponent(event.icon);
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${event.color}`}>
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{event.name}</h3>
                          <p className="text-sm text-gray-500">{event.year}</p>
                        </div>
                      </div>
                    </div>

                    {event.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      {event.images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-1 h-full">
                          {event.images.slice(0, 4).map((image: string, index: number) => (
                            <div key={index} className="bg-white">
                              <img
                                src={image}
                                alt={`${event.name} preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <ImageIcon className="mx-auto text-gray-400 mb-2" size={24} />
                            <p className="text-xs text-gray-500">No images</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <span>{event.images.length} photos</span>
                      <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/admin/event/${event.id}/edit`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                      >
                        <EditIcon size={14} />
                        Edit
                      </Link>
                      <Link
                        href={`/admin/event/${event.id}/photos`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        <ImageIcon size={14} />
                        Photos
                      </Link>
                      <button
                        onClick={() => handleDeleteEvent(event.id, event.name)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}