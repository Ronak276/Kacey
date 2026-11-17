import React, { useState } from 'react';
import {
  ChevronLeft,
  Plus,
  Search,
  ChevronRight,
  Filter,
  Camera,
  Weight,
  User,
  HeartPulse,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Animal } from '../types';

export const AnimalsPage: React.FC = () => {
  const {
    animals,
    addAnimal,
    navigateToAnimalDetail,
    startScannerForAnimal,
    setActiveTab,
  } = useApp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Animal form state
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'Dog' | 'Cat' | 'Horse' | 'Other'>('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [weight, setWeight] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80'
  );

  const filteredAnimals = animals.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !breed) {
      toast({
        title: 'Missing Details',
        description: 'Please provide animal name and breed.',
        variant: 'destructive',
      });
      return;
    }

    const created = addAnimal({
      name,
      species,
      breed,
      age: age || '1 Year',
      gender,
      weight: weight || '15 kg',
      ownerName: ownerName || 'Clinic Walk-in',
      ownerPhone: ownerPhone || '+1 (555) 000-0000',
      photoUrl:
        photoUrl ||
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80',
      notes: 'Initial clinical intake completed. Ready for diagnostic test strips.',
      allergies: 'None recorded',
      lastTestDate: 'Today',
    });

    setShowAddModal(false);
    // Reset form
    setName('');
    setBreed('');
    setAge('');
    setWeight('');
    setOwnerName('');

    toast({
      title: 'Animal Registered',
      description: `${created.name} (${created.breed}) added to hospital registry.`,
      variant: 'success',
    });

    navigateToAnimalDetail(created);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-24 overflow-y-auto">
      {/* Top Header Navigation */}
      <div className="bg-white px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <button
          onClick={() => setActiveTab('home')}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Animal Profiles</h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="w-9 h-9 rounded-xl bg-sky-600 hover:bg-sky-700 flex items-center justify-center text-white shadow-sm"
          title="Add New Animal"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by animal name, breed, or owner..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
          />
        </div>

        {/* Quick Count & Add banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
          <span>{filteredAnimals.length} registered patients</span>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-sky-600 font-bold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Patient
          </button>
        </div>

        {/* Animals List Cards */}
        <div className="space-y-2.5">
          {filteredAnimals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => navigateToAnimalDetail(animal)}
              className="bg-white hover:bg-sky-50/40 p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={animal.photoUrl}
                  alt={animal.name}
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {animal.name}
                    </h3>
                    <span className="text-[10px] text-sky-600 font-bold">
                      {animal.gender === 'Male' ? '♂' : '♀'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {animal.breed} • {animal.age}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Owner: {animal.ownerName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startScannerForAnimal(animal);
                  }}
                  title={`Scan strip for ${animal.name}`}
                  className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Animal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Add New Patient Animal</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAnimal} className="space-y-2.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Animal Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cooper"
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Species
                  </label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value as any)}
                    className="w-full px-2.5 py-2 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Horse">Horse</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-2.5 py-2 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Breed *
                  </label>
                  <input
                    type="text"
                    required
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="e.g. Labrador"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Age & Weight
                  </label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 2 Years"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 24 kg"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Mark Davis"
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 shadow transition-all"
                >
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

