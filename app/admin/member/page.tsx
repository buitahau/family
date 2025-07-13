"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MOCK_FAMILY_MEMBERS } from "@/services/mock-data";
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  ImageIcon, 
  CalendarIcon,
  SearchIcon,
  ArrowLeftIcon
} from "lucide-react";

export default function MemberPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const members = MOCK_FAMILY_MEMBERS;

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMember = async (memberId: string, memberName: string) => {
    if (confirm(`Are you sure you want to delete ${memberName}?`)) {
      console.log(`Deleting member: ${memberId}`);
      // Mock delete - in real app would call API
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <h1 className="text-xl font-bold text-gray-900">Family Members</h1>
            </div>
            
            <Link
              href="/admin/member/create"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PlusIcon size={20} />
              Add Member
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Members Grid */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <SearchIcon className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No members found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.thumbnail}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-indigo-600 font-medium">{member.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {member.timeline?.length || 0}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <CalendarIcon size={12} />
                        Timeline Events
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {member.gallery?.length || 0}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <ImageIcon size={12} />
                        Gallery Photos
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/member/${member.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                    >
                      <EditIcon size={14} />
                      Edit
                    </Link>
                    <Link
                      href={`/admin/member/${member.id}/gallery`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      <ImageIcon size={14} />
                      Gallery
                    </Link>
                    <button
                      onClick={() => handleDeleteMember(member.id, member.name)}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}