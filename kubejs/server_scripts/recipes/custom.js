// priority 22

let recipeAddCustom = (/** @type {Internal.RecipesEventJS} */ event) => {
  event.shapeless("tfc:seeds/cabbage", ["farmersdelight:cabbage_seeds"])
  event.shapeless("tfc:seeds/rice", ["farmersdelight:rice"])

  event.recipes.minecraft.campfire_cooking("2x tfc:torch", "#tfc:can_be_lit_on_torch")

  event.custom({
    type: "treetap:tap_extract",
    log: {
      item: "afc:wood/log/rubber_fig"
    },
    metal_result: {
      item: "afc:bucket/latex"
    },
    wooden_result: {
      item: "tfc:wooden_bucket",
      nbt: '{fluid: {FluidName: "afc:latex", Amount: 1000}}'
    },
    life_cycle: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    collect_bucket: true,
    processing_time: 7200,
    fluid_color: "#bfc7c0",
    conditions: [
      {
        type: "forge:mod_loaded",
        modid: "tfc"
      }
    ]
  })

  event.shapeless("4x farmersdelight:canvas", ["tfc:thatch", "tfc:thatch"])

  event.remove({ type: "minecraft:campfire_cooking", output: "minecraft:torch" })
}
