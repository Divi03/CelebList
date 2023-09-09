import React, { useState } from 'react'


const AddForm = () => {

  // const [formData, setFormData] = useState({name:'',userName:'',email:'',imgUrl:'',phone:'',followers:''})
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [followers, setFollowers] = useState('');

  const handleSubmit = async()=>{
    await sendData();
    window.location.reload(); 
  }

  const sendData = async () => {
    try {
      const res = await fetch("http://localhost:5000/addCeleb",{
        method: 'POST',
        body: JSON.stringify({
          name,
          userName,
          email,
          imgUrl,
          phone,
          followers,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }});
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
  <div className="w-4/5 h-4/5 max-w-lg mx-auto bg-gray-50 p-6 rounded-md shadow-md">
  <h2 className="text-2xl font-semibold mb-4">Add Celebrity</h2>
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-600 font-medium">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="border rounded-md w-full px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter Name"
        required
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        className="border rounded-md w-full px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter Username"
        required
        onChange={(e) => setUsername(e.target.value)}

      />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="border rounded-md w-full px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter Email"
        required
        onChange={(e) => setEmail(e.target.value)}

      />
    </div>
    <div className="mb-4">
      <label htmlFor="img" className="block text-gray-600 font-medium">Image Url</label>
      <input
        type="email"
        id="email"
        name="img"
        className="border rounded-md w-full px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="url"
        required
        onChange={(e) => setImgUrl(e.target.value)}

      />
    </div>
    <div className="mb-4">
      <label htmlFor="phoneNo" className="block text-gray-600 font-medium">Phone Number</label>
      <input
        type="tel"
        id="phoneNo"
        name="phoneNo"
        className="border rounded-md w-full px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter Phone Number"
        required
        onChange={(e) => setPhone(e.target.value)}

      />
    </div>
    <div className="mb-4">
      <label htmlFor="followers" className="block text-gray-600 font-medium">Followers</label>
      <input
        type="number"
        id="followers"
        name="followers"
        className="border rounded-md w-full px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter Followers Count"
        onChange={(e) => setFollowers(e.target.value)}

      />
    </div>
    <div className="mt-6">
      <button type="submit" onClick={handleSubmit} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200">
        Add Celebrity
      </button>
    </div>
</div>

  )
}

export default AddForm