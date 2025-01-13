import { useState, useRef, useEffect } from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromMistral } from "./ai"

export default function main() {
  const [ingredients, setIngredients] = useState(["chicken", "all the main spices", "corn", "heavy cream", "pasta"])
  const [recipe, setRecipe] = useState("")
  const recipeSection = useRef(null)

  useEffect(() => {
    if (Recipe !== "" && recipeSection.current !== null)
      recipeSection.current.scrollIntoView({behaviour: "smooth"})
  }, [recipe])

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
            ref={recipeSection}
            ingredients={ingredients}
            getRecipe={getRecipe}
        />            
      }
            
      {recipe && <ClaudeRecipe recipe={recipe} />}  
    </main>
    )
}
