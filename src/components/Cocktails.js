import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export function Cocktails( props ) {
  document.title = "It's illegal to drink cocktail while coding!"

  const [cocktails,setCocktails] = useState()

  useEffect( () => {
    if( props.data ) {
      setCocktails( props.data )
    }
  }, [props.data])

  if( !cocktails ) {
    return(
      <div className="cocktails container-fluid">
        <h2>Loading...</h2>
      </div>
    )
  }
  else {
    const Cards = cocktails.map( (item, key ) => {
      return(
        <div className="col-md-3 my-3" key={key}>
          <div className="card position-relative" style={{minHeight:'100%'}}>
            <img src={item.photo} className="card-img-top" style={{width:'100%', aspectRatio:'3/4', objectFit:'cover', objectPosition:'center'}} />
            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <p>{item.description}</p>
            </div>
            <Link 
              className="position-absolute" 
              to={'/cocktail/' + item.id } 
              style={{top:0,bottom:0,right:0,left:0}}
            >
            </Link>
          </div>
        </div>
      )
    })
  
    return(
      <div className="cocktails container-fluid">
        <h3>Cocktails</h3>
        <div className="row align-items-stretch">
          {Cards}
        </div>
      </div>
    )
  }
  
}