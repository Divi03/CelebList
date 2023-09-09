import React, { useEffect, useState} from 'react'
import {BiTrash, BiUserCircle} from 'react-icons/bi';

const List = () => {
  const [data, setData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
//   Function to toggle sorting order
  const toggleSortOrder = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => (isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    setData(sortedData);
    setIsAscending(!isAscending);
  };

  const sortByFollowers = ()=>{
    const sortedData = [...data];
    sortedData.sort(function(a, b){return a.followers - b.followers})
    setData(sortedData);
    setIsAscending(!isAscending);
  }

  const deleteData = async (username) => {
    try {
      const res = await fetch(`http://localhost:5000/removeCeleb/${username}`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }});
      window.location.reload();
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/data",{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }});
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>

    {/* {renderData()} */}
      {data?
      (<div className='w-4/5 h-4/5 flex flex-col text-secondary bg-gray-50 overflow-y-scroll shadow-lg divide-y divide-slate-200'>
          <div className='flex justify-around items-center text-black font-bold'>
            <div className='w-1/3 p-4 flex justify-center items-center'>Image</div>
            <button className='w-1/3 p-4 flex justify-center items-center cursor-pointer' onClick={toggleSortOrder}>Name</button>
            <button className='w-1/3 p-4 flex justify-center items-center' onClick={sortByFollowers}>Followers</button>
            <div className='w-1/3 p-4 flex justify-center items-center'>Action</div>
          </div>

          {data.map((item,i)=>(<ListItem data={item} key={i} deleteItem={deleteData} />))}
      </div>
      ):(
        <div>
           No Data
        </div>
      )
    }
    </>
    
  )
}

const ListItem = ({data,deleteItem})=>{
  const formatFollowersCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    } else {
      return count.toString();
    }
  };
    return(
        <div className='flex justify-around items-center'>
            {/* <div className='w-1/3 p-2 flex justify-center items-center'><img src={data.img} alt='img' className='w-16 h-16 object-fill bg-gray-50 rounded-full lg:w-32 lg:h-32' /></div>*/}
            {data.imgUrl ? (
              <div className='w-1/3 p-2 flex justify-center items-center'>
                <img src={data.imgUrl} alt='Profile'className='w-16 h-16 object-cover bg-gray-50 rounded-full lg:w-32 lg:h-32'/>
              </div>
            ) : (
              <div className='w-1/3 p-2 flex justify-center items-center'>
                 <BiUserCircle size='50' />
              </div>
            )}
            <div className='w-1/3 p-2 flex justify-center items-center'> <a href={`https://www.instagram.com/${data.userName}`} target="_blank" rel="noopener noreferrer">{data.name}</a></div> 
            <div className='w-1/3 p-2 flex justify-center items-center'>{formatFollowersCount(data.followers)}</div>
            <div className='w-1/3 p-2 flex justify-center items-center'><button onClick={()=>deleteItem(data.userName)} className='rounded-md bg-orange-100 p-2 hover:bg-orange-200'><BiTrash size={20} color='red'/></button></div>
        </div>
    )
}

export default List
