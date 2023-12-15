// priority 10

const replaceTFCHeatingAndCasting = (/** @type {Internal.RecipesEventJS} */ event) => {
  const convertMap = {
    6: 9,
    10: 16,
    15: 24,
    35: 48,
    25: 36,
    50: 72,
    40: 58,
    60: 86,
    90: 128,
    20: 24,
    30: 48,
    70: 96
  }
  let convertFluidValues = (oldValue) => {
    let newValue = convertMap[oldValue]
    if (!newValue) {
      return oldValue % 25 ? oldValue : oldValue * 1.44
    } else return newValue
  }
  let convertFluidsFromArray = (array) => {
    return array
      .stream()
      .map((val) => (val instanceof $UnboundFluidStackJS ? val.setAmount(convertFluidValues(val.amount)) || val : val))
      .toList()
  }

  event.forEachRecipe({ type: "tfc:heating" }, (/** @type {Special.Recipes.HeatingTfc}**/ r) => {
    let fluid = r.allValueMap.result_fluid.value
    if (!fluid) return
    fluid.setAmount(convertFluidValues(fluid.amount))
    r.resultFluid(fluid)
  })

  event.forEachRecipe({ id: /^woodencog:mixing/ }, (/** @type {Special.Recipes.MixingCreate}**/ r) => {
    if (r.getId().includes("/barrel")) return
    let ingredients = unwrapValue(r.get("ingredients"))
    let modifiedIngredients = convertFluidsFromArray(ingredients)
    r.ingredients(modifiedIngredients)
    let results = unwrapValue(r.get("results"))
    let modifiedResults = convertFluidsFromArray(results)
    r.results(modifiedResults)
  })

  event.forEachRecipe({ type: "woodencog:filling" }, (/** @type {Special.Recipes.FillingWoodencog}**/ r) => {
    let ingredients = unwrapValue(r.get("ingredients"))
    let modifiedIngredients = convertFluidsFromArray(ingredients)
    r.ingredients(modifiedIngredients)
    let results = unwrapValue(r.get("results"))
    let modifiedOutput
    results.forEach((result) =>
      result.computeIfPresent("stack", (key, val) =>
        (modifiedOutput = Item.of(val)) || modifiedOutput.hasNBT()
          ? modifiedOutput.nbt.tank.putInt("Amount", convertFluidValues(modifiedOutput.nbt.tank.Amount)) ||
            modifiedOutput.toJson()
          : val
      )
    )
    r.results(results)
  })

  event.forEachRecipe({ type: "tfc:casting" }, (/** @type {Special.Recipes.CastingTfc}**/ r) => {
    let fluidIngredient = unwrapValue(r.get("fluid"))
    fluidIngredient.computeIfPresent("amount", (key, val) => convertFluidValues(val))
    r.fluid(fluidIngredient)
  })
}
