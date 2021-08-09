import { useState, useEffect } from "react"
import { useParams } from "react-router"


export function Detail(props) {
  const [cocktailData, setCocktailData] = useState()
  const { cocktailId } = useParams()

  useEffect(() => {
    if (!cocktailData) {
      props.get(cocktailId)
        .then((result) => {
          setCocktailData(result)
        })
    }
  })

  if (!cocktailData) {
    return (
      <div className="container">
        <h3>Loading Detail...</h3>
      </div>
    )
  }
  else {
    document.title =cocktailData.name
    // custom component for ingredients
    const Ingredients = ( props ) => {
      if( props.items.length === 0 ) {
        return (
          <p>No ingredients listed</p>
        )
      }
      else {
        const Items = props.items.map( (item, key) => {
          return (
            <li key={key}>
              {item.quantity} {item.measure} {item.name} {(item.is_garnish) ? "garnished" : ""}
            </li>
          )
        })
        return (
          <ul>
            {Items}
          </ul>
        )
      }
    }
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={cocktailData.photo} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h3 className="mt-0">{cocktailData.name}</h3>
            <p>{cocktailData.description}</p>
            <Ingredients items={cocktailData.ingredients} />
            <h4>Steps to make:</h4>
            <div style={{whiteSpace:'pre-wrap'}}>{cocktailData.steps}</div>
          </div>
        </div>
      </div>
    )
  }
}