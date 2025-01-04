import { useState } from "react"

export default function main() {

  const [ingredients, setIngredients] = useState([])

  const ingredientsListItems = ingredients.map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  ))

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  return(
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <input 
          type="text"
          placeholder="e.g. garlic"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      <ul>
        {ingredientsListItems}
      </ul>
    </main>  
  )
}
