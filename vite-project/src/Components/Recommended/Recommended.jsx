import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { api_key, value_converter } from '../../data'
import { Link } from 'react-router-dom';
const Recommended = ({ categoryId }) => {

    const [apiData, SetApiData] = useState([]);
    const fetchData = async () => {
        const url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResult=45&videoCategoryId=${categoryId}&key=${api_key}`;
        await fetch(url).then(res => res.json()).then(data => SetApiData(data.items))
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='recommended'>
            {apiData.map((item, index) => {
                return (

                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>

                )
            })}
        </div>
    )
}

export default Recommended
