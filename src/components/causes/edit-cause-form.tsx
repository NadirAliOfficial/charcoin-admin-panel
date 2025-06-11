import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, FileText, ChevronDown } from 'lucide-react';
import { Cause } from "@/types/causes"; // Import the Cause type
import Image from "next/image";

interface EditCauseFormData {
  title: string;
  organization: string;
  website: string;
  country: string;
  campaign: string;
  category: string;
  type: string;
  walletAddress: string;
  responsibleContact: string;
  role: string;
  email: string;
  phone: string;
  status: string;
  // Add other fields from Cause type if needed and not in form
}

interface EditCauseFormProps {
  initialData: Cause | null; // Accept Cause data as prop
  onClose: () => void; // Prop to handle closing the drawer
}

export default function EditCauseForm({ initialData, onClose }: EditCauseFormProps) {
  const [formData, setFormData] = useState<EditCauseFormData>({
    title: '',
    organization: '',
    website: '',
    country: '',
    campaign: '',
    category: '',
    type: '',
    walletAddress: '',
    responsibleContact: '',
    role: '',
    email: '',
    phone: '',
    status: ''
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Update form data when initialData prop changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.name || '',
        organization: initialData.organization || '',
        website: '', // Assuming website is not in Cause type
        country: '', // Assuming country is not in Cause type
        campaign: initialData.endsOn || '', // Using endsOn as a placeholder for campaign
        category: initialData.category || '',
        type: initialData.type || '',
        walletAddress: '', // Assuming walletAddress is not in Cause type
        responsibleContact: '', // Assuming responsibleContact is not in Cause type
        role: '', // Assuming role is not in Cause type
        email: '', // Assuming email is not in Cause type
        phone: '', // Assuming phone is not in Cause type
        status: '', // Assuming status handling is different or not in Cause type directly
      });
      // Handle images - assuming initialData.image is a single image URL string
      setUploadedImages(initialData.image ? [initialData.image] : []);
    }
  }, [initialData]);

  const handleInputChange = (field: keyof EditCauseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = () => {
    // Simulate image upload
    console.log('Upload image clicked');
    // In a real app, you would open a file picker here
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteFile = () => {
    console.log('Delete file clicked');
    // In a real app, you would handle file deletion logic
  };

  const handleUpdate = () => {
    console.log('Update cause/project', formData);
    // In a real app, you would submit the formData
    onClose(); // Close drawer after update (or on success)
  };

  return (
    <div className="min-h-screen overflow-y-auto text-white ">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-700">
        <div className="flex items-center gap-4">
        
          <div>
            <h1 className="text-xl font-semibold">Edit cause / project</h1>
            <p className="text-gray-400 text-sm">You are updating a draft cause / project in the CharCoin ecosystem</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto py-6 space-y-8" style={{ maxHeight: 'calc(100vh - 120px)' }}> {/* Added overflow and max height */}
        {/* Main Details Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Main details</h2>
          
          {/* Cause Public Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Cause public title</label>
            <p className="text-xs text-gray-400">This is what benefactors will see and identify the cause in the entire system</p>
            <textarea
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full h-20 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
              placeholder="Enter cause title..."
            />
          </div>

          {/* Organization and Website Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Organization</label>
              <p className="text-xs text-gray-400">The organization in charge of distributing the donations received</p>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Organization - Website</label>
              <p className="text-xs text-gray-400">The public organization website</p>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Country and Campaign Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Country</label>
              <p className="text-xs text-gray-400">Choose the country where the cause / project will be executed</p>
              <div className="relative">
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Spain">Spain</option>
                  {/* Add other countries dynamically if needed */}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Campaign</label>
              <p className="text-xs text-gray-400">Choose the campaign where the cause / project will be running</p>
              <div className="relative">
                <select
                  value={formData.campaign}
                  onChange={(e) => handleInputChange('campaign', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:border-cyan-500 focus:outline-none"
                >
                  <option value="August 2025 (From August 1 to August 20)">August 2025 (From August 1 to August 20)</option>
                  {/* Add other campaigns dynamically if needed */}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Main Category and Type Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Main Category</label>
              <p className="text-xs text-gray-400">Choose the category that most relates to the cause / project</p>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Shelter & Supplies">Shelter & Supplies</option>
                  {/* Add other categories dynamically if needed */}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Type</label>
              <p className="text-xs text-gray-400">Choose the type of cause / project</p>
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Infinite Impact">Infinite Impact</option>
                  {/* Add other types dynamically if needed */}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Receiver Wallet */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Receiver Wallet</label>
            <p className="text-xs text-gray-400">Enter the USDT (Solana Network) Wallet of the cause / project, this wallet will be used to transfer the funds and will be public</p>
            <input
              type="text"
              value={formData.walletAddress}
              onChange={(e) => handleInputChange('walletAddress', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none font-mono text-sm"
            />
          </div>

          {/* Featured Image */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Featured Image</label>
              <p className="text-xs text-gray-400">Choose a 1000x600 pixels PNG image, below you will see a preview of the uploaded image</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleImageUpload}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload an image
              </button>
              
              <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete Image
              </button>
            </div>

            {/* Image Preview */}
            <div className="flex gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-32 h-24 object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Contact details</h2>
          
          {/* Responsible Contact and Role Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Responsible Contact</label>
              <p className="text-xs text-gray-400">Enter the full name of the person responsible of the donations</p>
              <input
                type="text"
                value={formData.responsibleContact}
                onChange={(e) => handleInputChange('responsibleContact', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Role / Position</label>
              <p className="text-xs text-gray-400">Enter the role of the responsible person</p>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <p className="text-xs text-gray-400">Enter the contact email</p>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Phone</label>
              <p className="text-xs text-gray-400">Enter the contact phone</p>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Contract Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Contract</label>
              <p className="text-xs text-gray-400">Choose the PDF file containing the agreement between the parties</p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg font-medium transition-colors">
                <FileText className="w-4 h-4" />
                Upload a PDF File
              </button>
              
              {/* Assuming a contract file name or indicator */}
              {/* Replace with actual state/prop for file name if available in Cause type */}
              <span className="text-gray-400 text-sm">Final Formal Agreement - Spain.pdf</span>
              
              <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete File
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Status</label>
            <p className="text-xs text-gray-400">The publish status of the cause / project</p>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer focus:border-cyan-500 focus:outline-none"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Archived">Archived</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="pt-6">
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Update Cause / Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 