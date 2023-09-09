import React, { useEffect, useState } from 'react';

const SearchResult = ({ user }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const formatFollowersCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    } else {
      return count.toString();
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/searchCeleb/${user}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await res.json();
      setData(result);
      setIsLoading(false); // Mark data as loaded
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Mark data as loaded even if there's an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can show a loading indicator here
  }

  return (
    <div className='w-4/5 h-4/5 flex flex-col text-secondary bg-gray-50 overflow-y-scroll shadow-lg divide-y divide-slate-200'>
      {data.name ? (
        <>
          <div className='p-4 flex justify-center items-center text-2xl font-semibold text-blue-700'>
            {data.name}
          </div>
          <div className='flex items-center justify-center p-2'>
            <img
              src={data.imgUrl}
              alt={user.name}
              className='w-32 h-32 object-cover bg-gray-200 rounded-full'
            />
          </div>
          <div className='p-4 text-lg text-gray-600 flex justify-center items-center'>
            Phone: <span className='text-black p-2'>{data.phone}</span>
          </div>
          <div className='p-4 text-lg text-yellow-600 flex justify-center items-center'>
            Email: <span className='text-red-500 p-2'>{data.email}</span>
          </div>
          <div className='p-4 text-xl font-semibold text-gray-600 flex justify-center items-center'>
            Followers: <span className='text-green-500 p-2'>{formatFollowersCount(data.followers)}</span>
          </div>
        </>
      ) : (
        <div className="text-red-500 text-center">No data found</div>
      )}
    </div>
  );
};

export default SearchResult;
