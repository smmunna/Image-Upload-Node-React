import React,{useState} from 'react'

export default function Test() {
  const [Img, setImg] = useState('');
  const submit = () =>{
    
  }
  return (
    <div>
       <input type="file"
        onChange={((event)=>{
          setImg(event.target.files[0])
        })}
        />
        <button onClick={submit}>Submit</button>
    </div>
  )
}
