import {useState} from 'react'

function App() {
  const[search,setSearch]=useState("");
  const documents=[
  {
    name:"Devops",
    file:"DevOps.pdf"
  }
  ]
  return (
    <div>
      <h1>Notes Portal app</h1>
      <input type="text" placeholder='search notes here' onClick={(e)=>{
        setSearch(e.target.value);
      }}/>

      documents.filter().map()
      </div>
  )
}

export default App