import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Cards from './components/Cards'
import dataService from './services/cards'


function App() {
  const [content, setContent] = useState([])
  const [showAddCard, setShowAddCard] = useState(false)
  const [newTitle,setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newIsUrgent,setNewIsUrgent] = useState(false)

  const getData = ()=>{
    dataService.getAll()
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
    
    dataService
    .createNew(newCard)
    .then(() =>{
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
    
    dataService.deleteCard(event.target.value)
    .then(()=>{
      setContent(content.filter((item)=> item.id !== event.target.value) )
    
    })
  }
  const handleImportantButton = useCallback( (title, text, important, id) => {
    return (e)=>{
      e.preventDefault()
      
      const newData = {
        id: id,
        important: !important,
        title: title,
        content: text
      }

      dataService
        .update(id,newData)      
        .then(()=>{
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
        {showAddCard ? 
          <form className="add-card-form" onSubmit={addTask}>
            <label> Otsikko</label>
            <input value={newTitle} onChange={handleTitleChange} required/>
            <label>Kontsa</label>
            <textarea value={newContent} onChange={handleContentChange} required/>
            <label>Is urgent</label>
            <input type="checkbox" value={newIsUrgent} onChange={handleImportantChange} />
            <button type="submit"> Submit</button> 
          </form>
        : null //showing the todo form
        }
      </div>
      <Cards content={content} handleDone={handleDone} handleImportantButton={handleImportantButton}/>
      
    </>
  )
}

export default App
