import React, { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom';
import './Header.css'

export default function Header({setSearch,items, setStartDate, setEndDate,setIsSearch}) {
  const [data, setData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
   
   const dataArray =[];
   const res = {};
   for(let i = 0; i<items.length;i++){
     if(res[items[i].actionType]){
         continue
     }else {
      dataArray.push(items[i]);
      res[items[i].actionType] = 1;
     }
   }
   setData(dataArray)

  },[items])

  const handleChange = event => {
    setSearchParams({query: event.target.value});
  };

  const searchApplicationId = (e)=>{
    setIsSearch(false)
    setSearch(e.target.value)
  }

  const searchApplicationType = (e)=>{

   setSearch(e.target.value)
  }
  const searchActionType = (e)=>{

    setSearch(e.target.value)
  }

  const searchFromDate = (e)=>{
    
    setStartDate(e.target.value)
  }

  const searchToDate = (e)=>{
   
    setEndDate(e.target.value)
  }

  const handleclick = ()=>{
    setIsSearch(true)
  }

  return (
    <div  className="header">
        <div>
            <span>Action type</span>
            <select 
                defaultValue={null}
                placeholder="select action type"
                onChange={handleChange}
                onClick={(e)=> searchActionType(e)}>{
                    data?.map(em=>{
                        return <option key={em.logId}>
                        {em.actionType}
                        </option>
                    })
                }  
            </select>
        </div>
        <div>
            <span>Application type</span>
            <select 
            placeholder='select application type'
            onChange={handleChange}
            onClick={(e)=> searchApplicationType(e)}>{
            data?.map(e=>{
                return <option key={e.logId}>
                {e.applicationType}
                </option>
            })
            }
            </select>
        </div>
        <div>
            <span>From Date</span>
            <input placeholder='YYYY-MM-DD' onChange={(e)=> searchFromDate(e)} onChange={handleChange}/>
        </div>
        <div>
            <span>To Date</span>
            <input placeholder='YYYY-MM-DD' onChange={(e)=> searchToDate(e)}  onChange={handleChange}/>
        </div>
        <div>
            <span>Application ID</span>
            <input placeholder='815255338944773'  onChange={(e)=> searchApplicationId(e)} onChange={handleChange}/>
        </div>
        <div>
            <input type="button" className="button" value="Search Logger" onClick={()=> handleclick() } onChange={handleChange}/>
        </div>
    </div>
  )
}