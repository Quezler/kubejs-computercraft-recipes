# KubeJS Computercraft Recipes

This project can help you extract the json of all existing/added/modified/deleted recipes in kubejs,
the logic is spread into 3 steps in order to make it more portable based on the available environment.

1) this stage is responsible for ensuring there is a server installed in this directory.
2) this stage is responsible for running `/kubejs export` in order to obtain a json and a log file.
3) this stage is responsible for sifting through the log and combining it with the json export.

If you already have a server installed you can skip 1, and just do what happens in 2.
Likewise if you already secured kubejs-server-export.json and a debug log, you only need 3.

Further context and instructions regarding its predecessor can be found here:
https://github.com/EnigmaticaModpacks/Enigmatica6/pull/4716

## obtaining the disk

Once you are done with step 3 you should have these files:
- ./kubejs/data/computercraft/lua/treasure/kubejs/recipes/recipes.json
- ./kubejs/data/computercraft/lua/treasure/kubejs/recipes/recipes.lua

(recipes.json is a legacy file, its too big for computercraft to parse, but it is still nice to have)

If you start the server with those files at that path computercraft will recognize them,
now all you need is a treasure disk item that points to what we have just generated:

### with a command
`/give @p computercraft:treasure_disk{Title: "", SubPath: "kubejs/recipes", Colour: 11829822}`

### via a recipe
```
onEvent('recipes', (event) => {
  const id_prefix = 'enigmatica:base/create/mechanical_crafting/';
  const recipes = [
    {
      output: Item.of(`computercraft:treasure_disk`, {Title: "", SubPath: "kubejs/recipes", Colour: 11829822}),
      pattern: ['A'],
      key: {
        A: Item.of(`computercraft:disk`).ignoreNBT(), 
      },
      id: `${id_prefix}treasure_disk`
    }
  ];

  recipes.forEach((recipe) => {
      event.recipes.create.mechanical_crafting(recipe.output, recipe.pattern, recipe.key).id(recipe.id);
  });
});
```
