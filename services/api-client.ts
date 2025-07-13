import { MOCK_FAMILY_MEMBERS, MOCK_EVENT_FOLDERS } from './mock-data';

const STORAGE_KEYS = {
  FAMILY_MEMBERS: 'family_members',
  EVENT_FOLDERS: 'event_folders',
} as const;

// Initialize mock data in localStorage if not exists
const initializeMockData = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(STORAGE_KEYS.FAMILY_MEMBERS)) {
    localStorage.setItem(STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(MOCK_FAMILY_MEMBERS));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.EVENT_FOLDERS)) {
    localStorage.setItem(STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(MOCK_EVENT_FOLDERS));
  }
};

// Mock API client using browser storage
export class ApiClient {
  // Family Members API
  static async getFamilyMembers() {
    initializeMockData();
    const stored = localStorage.getItem(STORAGE_KEYS.FAMILY_MEMBERS);
    return stored ? JSON.parse(stored) : MOCK_FAMILY_MEMBERS;
  }

  static async getFamilyMemberById(id: string) {
    const members = await this.getFamilyMembers();
    return members.find((member: any) => member.id === id) || null;
  }

  static async createFamilyMember(memberData: any) {
    const members = await this.getFamilyMembers();
    const newMember = {
      ...memberData,
      id: `member_${Date.now()}`,
      gallery: memberData.gallery || [],
      timeline: memberData.timeline || [],
    };
    
    const updatedMembers = [...members, newMember];
    localStorage.setItem(STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(updatedMembers));
    
    return newMember;
  }

  static async updateFamilyMember(id: string, memberData: any) {
    const members = await this.getFamilyMembers();
    const memberIndex = members.findIndex((member: any) => member.id === id);
    
    if (memberIndex === -1) {
      throw new Error('Member not found');
    }
    
    const updatedMember = { ...members[memberIndex], ...memberData };
    members[memberIndex] = updatedMember;
    
    localStorage.setItem(STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(members));
    
    return updatedMember;
  }

  static async deleteFamilyMember(id: string) {
    const members = await this.getFamilyMembers();
    const filteredMembers = members.filter((member: any) => member.id !== id);
    localStorage.setItem(STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(filteredMembers));
  }

  static async addGalleryImages(memberId: string, images: any[]) {
    const members = await this.getFamilyMembers();
    const memberIndex = members.findIndex((member: any) => member.id === memberId);
    
    if (memberIndex === -1) {
      throw new Error('Member not found');
    }
    
    const updatedMember = {
      ...members[memberIndex],
      gallery: [...(members[memberIndex].gallery || []), ...images],
    };
    
    members[memberIndex] = updatedMember;
    localStorage.setItem(STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(members));
    
    return updatedMember;
  }

  // Event Folders API
  static async getEventFolders() {
    initializeMockData();
    const stored = localStorage.getItem(STORAGE_KEYS.EVENT_FOLDERS);
    return stored ? JSON.parse(stored) : MOCK_EVENT_FOLDERS;
  }

  static async getEventFolderById(id: string) {
    const folders = await this.getEventFolders();
    return folders.find((folder: any) => folder.id === id) || null;
  }

  static async createEventFolder(folderData: any) {
    const folders = await this.getEventFolders();
    const newFolder = {
      ...folderData,
      id: `event_${Date.now()}`,
      createdAt: new Date().toISOString(),
      images: folderData.images || [],
    };
    
    const updatedFolders = [...folders, newFolder];
    localStorage.setItem(STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(updatedFolders));
    
    return newFolder;
  }

  static async updateEventFolder(id: string, folderData: any) {
    const folders = await this.getEventFolders();
    const folderIndex = folders.findIndex((folder: any) => folder.id === id);
    
    if (folderIndex === -1) {
      throw new Error('Event folder not found');
    }
    
    const updatedFolder = { ...folders[folderIndex], ...folderData };
    folders[folderIndex] = updatedFolder;
    
    localStorage.setItem(STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(folders));
    
    return updatedFolder;
  }

  static async deleteEventFolder(id: string) {
    const folders = await this.getEventFolders();
    const filteredFolders = folders.filter((folder: any) => folder.id !== id);
    localStorage.setItem(STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(filteredFolders));
  }

  static async addEventImages(eventId: string, images: string[]) {
    const folders = await this.getEventFolders();
    const folderIndex = folders.findIndex((folder: any) => folder.id === eventId);
    
    if (folderIndex === -1) {
      throw new Error('Event folder not found');
    }
    
    const updatedFolder = {
      ...folders[folderIndex],
      images: [...(folders[folderIndex].images || []), ...images.filter(img => img.trim())],
    };
    
    folders[folderIndex] = updatedFolder;
    localStorage.setItem(STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(folders));
    
    return updatedFolder;
  }

  // Mock image upload
  static async uploadImages(files: File[]) {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock URLs from Pexels
    return files.map((_, index) => 
      `https://images.pexels.com/photos/${1000000 + Date.now() + index}/pexels-photo-${1000000 + Date.now() + index}.jpeg?auto=compress&cs=tinysrgb&w=600`
    );
  }
}