import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/v1/change-password",
        {
          currentPassword,
          newPassword,
        },
        { headers }
      );
      setMessage("Şifre başarıyla değiştirildi!");
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage("Şifre değiştirme başarısız!");
    }
  };

  const handleAddressUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        "/api/v1/update-address",
        {
          addres: address,
        },
        { headers }
      );
      setMessage("Adres başarıyla güncellendi!");
      setAddress('');
    } catch (error) {
      setMessage("Adres güncelleme başarısız!");
    }
  };

  return (
    <div className='px-12 min-h-screen bg-purple-400 py-8'>
      <div className='bg-purple-700 p-8 rounded'>
        <h2 className='text-3xl text-pink-200'>Ayarlar</h2>


        <form onSubmit={handlePasswordChange} className='mt-8 max-w-md'>
          <div className='mb-4'>
            <label className='block text-pink-100 mb-2'>Mevcut Şifre</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='w-full p-2 rounded'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-pink-100 mb-2'>Yeni Şifre</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full p-2 rounded'
            />
          </div>
          <button type="submit" className='bg-purple-500 text-white px-4 py-2 rounded'>
            Şifreyi Değiştir
          </button>
        </form>

        <form onSubmit={handleAddressUpdate} className='mt-8 max-w-md'>
          <div className='mb-4'>
            <label className='block text-pink-100 mb-2'>Yeni Adres</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='w-full p-2 rounded'
            />
          </div>
          <button type="submit" className='bg-purple-500 text-white px-4 py-2 rounded'>
            Adresi Güncelle
          </button>
        </form>

        {message && (
          <div className='mt-4 text-pink-200'>{message}</div>
        )}
      </div>
    </div>
  );
};

export default Settings;
