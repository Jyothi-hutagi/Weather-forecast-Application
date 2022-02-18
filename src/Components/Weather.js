import React, { useState } from "react";
import axios from "axios";
import './Weather.css'
const Weather= () =>{
  const [temperature, setTemperature] = useState("");
  const [city, setCity] = useState("Melbourne");
  const [country, setCountry] = useState("AU");
  const[monthdata,setMonthdata]=useState('')
   const[weatherdata,setWeatherdata]=useState()
  
   const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=048c43a2f7e00f37c3b4044df2ec3128`,

    })
      .then((response) => {
        console.log(response);
         setTemperature(response.data.main.temp - 273.15);
        //  setDesc(response.data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 const getWeekData =(city,country)=>{
     axios({
         method:"GET",
         url:`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=048c43a2f7e00f37c3b4044df2ec3128 `,
     })
     .then((response)=>{
         console.log(response.data.list)
         var data2=[]
         for(let i=0; i<5; i++){
             data2.push(response.data.list[i])
         }
         console.log("data2",data2)
         setWeatherdata(data2)
        //  var Weatherdata = response.data.list.map(data =>{
        //      <div>
        //          <h1>{data.dt_txt}</h1>
        //      </div>
        //       console.log(data.dt_txt)
        //   })
     
    //      {
    //     //     var date = new Date(response.data.list[0].dt_txt); 
    //     //     var elapsed = date.getHours();
    //     //     console.log(elapsed);
    //     //  }

    //      setHourdata(response.data.list[0].dt_txt)
      })
     .catch((error) => {
        console.log(error);
      });
 }
  

 const getMonthData=(city,country)=>{
     axios({
         method:"GET",
         url:`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city},${country}&appid=048c43a2f7e00f37c3b4044df2ec3128`,

     })
     .then((response)=>{
        console.log("response.data.list",response.data.list)
        var data3=[]
        for(let i=0; i<7; i++){
            data3.push(response.data.list[i])
        }
        console.log("data3",data3)
        setMonthdata(data3)

    })
    .catch((error) => {
       console.log(error);
     });
 }



           return(
                    <>

                        <div className="container">
                         <div className="card">
                         <div className="row">
                         <div className="col-5 time" style={{backgroundColor: "#EFEFEF"}}>
                          <p> {new Date().toLocaleString()}</p>
                        <h1>{Math.round(temperature * 100) / 100}&deg;</h1>
                        <h4>{city}</h4>
                        <h5>{country}</h5>

                    </div>
                    <div className="col-7 right">
                    <input id='city' type="text" placeholder="City"  onChange={(e) => setCity(e.target.value)}/>
                    <input id='country' type="text" placeholder=" Country"  onChange={(e) => setCountry(e.target.value)}/>
                    <button id='btn'className="btn btn-primary" onClick={() => { getWeatherData(city, country);}}>search</button>
                  
                    <div className="row">
                        <div className="col">
                            <div className="row row2"><img className="img-fluid" src="https://img.icons8.com/ios/100/000000/sun.png" /></div>
                            <div className="row row3">Mon</div>
                        </div>
                        <div className="col">
                            <div className="row row2"><img className="img-fluid" src="https://img.icons8.com/ios/100/000000/sun.png" /></div>
                            <div className="row row3">Tue</div>
                        </div>
                        <div className="col">
                            <div className="row row2"><img className="img-fluid" src="https://img.icons8.com/windows/100/000000/cloud.png" /></div>
                            <div className="row row3">Wed</div>
                        </div>
                        <div className="col">
                            <div className="row row2"><img className="img-fluid" src="https://img.icons8.com/windows/100/000000/cloud.png" /></div>
                            <div className="row row3">Thu</div>
                        </div>
                        <div className="col">
                            <div className="row row2"><img className="img-fluid" src="https://img.icons8.com/cotton/64/000000/rain--v3.png" /></div>
                            <div className="row row3">Fri</div>
                        </div>
                    </div>
                    <button className="btn btn-link" onClick={()=> {getWeekData(city,country);}}>Week</button>
                    <button className="btn btn-link" onClick={()=>{getMonthData(city,country);}}>Month</button>
                    <hr/>
                       <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                       {weatherdata && weatherdata.map(data =>{
                           const time= new Date(data.dt_txt); 
                               var elapsed = time.getHours();
                              if(elapsed>12){
                                elapsed=elapsed-12
                              }
                         
                        return(
                        <>
                        <div className="wheather-data">
                           <h4 >{elapsed}</h4>
                           <h4 className="weathertemp">{data.main.temp}&deg;</h4>
                           </div>
                          </>
                        )
                       
          })
     }
                          {monthdata && monthdata.map(data1=>{
                                     return(
                                    <div  className="wheather-data">
                                    
                                         <h4>Day &nbsp;{data1.temp.day}&deg;</h4>
                                         <h4 className="weathertemp1">Night&nbsp;{data1.temp.night}&deg;</h4>
                                    </div>
                                  )
                              })}

                                    
                                
                            
                        </div>
                    </div>

                </div>
                
                </div>
            </div>
      
                </div>
                </div>
             
                   
       </>
    )

};
export default Weather;