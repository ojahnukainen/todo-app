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


  const Cards = (props) =>{
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

export default Cards