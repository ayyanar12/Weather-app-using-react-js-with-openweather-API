
import { useState } from 'react'
import axios from 'axios'
import './App.css'

const Home = () => {
    const [name,setName]=useState('');
    const [error,setError]=useState('')
    const [data,setData]=useState({
        celcius:"22c",
        name:'',
        humidity:"2",
        speed:"2km",
        image:"/images/clouds.png"

    })
    
   
    const handleFind=()=>{
        if(name!=="")
        {
            const appURL=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b6d729dca097e43ed1f58d523b4bed16&units=metric`
            axios.get(appURL)
            .then(res=>{
                let imagePath="";
                if(res.data.weather[0].main=== "Clouds")
                {
                    imagePath="/images/clouds.png"
                } else if(res.data.weather[0].main=== "Clear")
                {
                    imagePath="/images/clear.jpeg"

                } else if(res.data.weather[0].main=== "Rain")
                {
                    imagePath="/images/rain.jpeg"

                }  else if(res.data.weather[0].main=== "Drizzle")
                {
                    imagePath="/images/drizzle.jpeg"

                }  else if(res.data.weather[0].main=== "Mist")
                {
                    imagePath="/images/mist.jpeg"

                } else{
                    imagePath="/images/clouds.png"
                }
                

                console.log(res.data);
                setData({...data,celcius:res.data.main.temp,name:res.data.name,humidity:res.data.main.humidity,speed:res.data.wind.speed,image:imagePath})
                setError("")
            })
            .catch(err=>{
                if(err.response.status===404)
                {
                    setError("invalid city name")
                }
                else{
                    setError("")
                }
            })

        }
    }
  return (
    <div className="container">
        <div className='weather'>
            <div className='search'>
                <input type="text" placeholder='enter city name' onChange={(e)=>{setName(e.target.value)}} />
                <button onClick={handleFind}><img src="/images/search.png" alt=""  /></button>
            </div>
            <div className='invalid'> 
                {error}
            </div>
            <div className='winfo'>
                <img src={data.image} alt="" className='icon' />
                <h1>{data.celcius}</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src="/images/humidity.png" alt="" />
                        <div className='humidity'>
                            <p>{data.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                       
                    </div>
                    <div className='col'>
                        <img src="/images/wind.png" alt="" />
                        <div className='wind'>
                            <p>{data.speed}km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home