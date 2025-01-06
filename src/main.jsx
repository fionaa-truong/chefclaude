import { useState } from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromMistral } from "./ai"

export default function main() {
  const [ingredients, setIngredients] = useState([])
  const [recipe, setRecipe] = useState("")

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
  }

  function addIngredient(event) {
    event.preventDefault()
    const formEl = event.currentTarget
    const formData = new FormData(formEl)
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    formEl.reset()
  }

  return(
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
          <input
              type="text"
              placeholder="e.g. garlic"
              aria-label="Add ingredient"
              name="ingredient"
          />
          <button>Add ingredient</button>
      </form>
            
      {ingredients.length > 0 && 
        <IngredientsList 
            ingredients={ingredients}
            getRecipe={getRecipe}
        />            
      }
            
      {recipe && <ClaudeRecipe recipe={recipe} />}  
    </main>
    )
}
