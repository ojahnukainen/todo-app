import { useCallback, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const db_url = "http://192.168.50.15:3001/todoData"

const Cards = (props) =>{
   console.log(props.content, "cards props")

   const cardData = props.content
  return(
    <div>
      { cardData.length > 0 ? cardData.map((item) => 
        
        <Card key={item.id}
          id={item.id}
          title={item.title}
          content={item.content} 
          important={item.important}
          handleDone={props.handleDone}
          handleImportantButton={props.handleImportantButton}
          whole={item.all}
        />) :<h2>No things to do 🤩</h2>}
    </div>
  )
}

const Card = (props) =>{

  return(
    <div className="card">
      <div className="card-title">
        <h2>{props.title}</h2>
        {props.important ? <h3><b>Important</b></h3> : null }
      </div>
      <div className="card-content">
        <p>{props.content}</p>
      </div>
      <div className="card-buttons">
        <button onClick={props.handleDone} value={props.id}>Done</button>
        <button onClick={props.handleImportantButton(props.title, props.content, props.important,props.id)}>Important</button>
      </div>
    </div>
  )}

function App() {
  const [content, setContent] = useState([])
  const [showAddCard, setShowAddCard] = useState(false)
  const [newTitle,setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newIsUrgent,setNewIsUrgent] = useState(false)

  const getData = ()=>{
    axios
    .get(db_url)
    .then(response => {
        setContent(response.data)
        console.log("kaikki reilassa")
        })
  }

 

  const addTask = (event) =>{
    event.preventDefault()
   
    const newCard = {
      title: newTitle,
      content: newContent,
      important: newIsUrgent
    }
    
    axios
    .post(db_url, newCard)
    .then(response =>{
      setContent(content.concat(newCard))
      setNewTitle('')
      setNewContent('')
      setShowAddCard(false)
    })
  }



  const handleTitleChange = event =>{
    setNewTitle(event.target.value)
  }
  const handleContentChange = event =>{
    setNewContent(event.target.value)
  }
  const handleImportantChange = event =>{
    setNewIsUrgent(event.target.checked)
  }

  const handleDone = (event) =>{
    event.preventDefault()
    console.log(event.target.value)
    axios
    .delete(`${db_url}/${event.target.value}`)
    .then(()=>{
      console.log("things has been done")
      setContent(content.filter((item)=> item.id !== event.target.value) )
    
    })
  }
  const handleImportantButton = useCallback( (title, text, important, id) => {
    return (e)=>{
      e.preventDefault()
      console.log(important,"important bytton handle")
      console.log(id)
      const newData = {
        id: id,
        important: !important,
        title: title,
        content: text
      }

      axios.put(`${db_url}/${id}`,newData)
        .then(()=>{
          console.log("things has been done")
          getData()
      })
     
  }
 },[])

 useEffect(getData,[])
  return (
    <>
      <h1>Things to remember that are due</h1>
      <button className="add-card-small" onClick={()=>{setShowAddCard(!showAddCard)}}>
        {showAddCard ? <h3>Close</h3> : <h3>Add new task</h3>}
      </button>
      <div className="add-card-full">
        {showAddCard ? <form className="add-card-form" onSubmit={addTask}>
          <label> Otsikko</label>
          <input value={newTitle} onChange={handleTitleChange} required/>
          <label>Kontsa</label>
          <textarea value={newContent} onChange={handleContentChange} required/>
          <label>Is urgent</label>
          <input type="checkbox" value={newIsUrgent} onChange={handleImportantChange} />
          <button type="submit"> Submit</button> 
        </form>
        : null

        }
        
      </div>
      <Cards content={content} handleDone={handleDone} handleImportantButton={handleImportantButton}/>
      
    </>
  )
}

export default App
