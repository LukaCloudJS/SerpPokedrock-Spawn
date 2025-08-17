function keyEnter(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        carregarSpawnRules()
    }
}

async function carregarSpawnRules() {
    const imput = document.getElementById("pokeimput").value

    const reponse = await fetch("./src/js/pokemon.json")
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${imput.toLowerCase()}`)

    const pokedata = await pokemon.json()

    const data = (await reponse.json())["minecraft:spawn_rules"].conditions

    const index = data.findIndex(f => f["minecraft:permute_type"].map(e => e.entity_type).includes(`pokemon:p${pokedata.id}`))

    if (index !== -1) {

        const biome = data[index]["minecraft:biome_filter"].value
        const chance = data[index]["minecraft:delay_filter"].spawn_chance

        const block = data[index]["minecraft:spawns_on_block_filter"]
        let type = "Surface"

        if (data[index]["minecraft:spawns_underground"]) {
            type = "Underground"
        }
        if (data[index]["minecraft:spawns_underwater"]) {
            type = "Underwater"
        }

        console.log(biome)

        document.getElementById("pokeimg").setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id}.png`)
        document.getElementById("info").innerHTML = `Pokemon: ${pokedata.name.replace(/\w/, letter => letter.toUpperCase())}<br>ID: ${pokedata.id}<br>Spawn type: ${type}<br>Block Spawn: ${block ? block.map(m => m.split(":")[1].replace(/\w/, letter => letter.toUpperCase())).join(", ") : "Any"}<br>Biome Spawn: ${biome ? biome.replace(/\w/, letter => letter.toUpperCase()) : "Any"}<br>Spawn Chance: ${chance}%`
        return
    }
    document.getElementById("pokeimg").setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id}.png`)
    document.getElementById("info").innerHTML = `${pokedata.name.replace(/\w/, letter => letter.toUpperCase())} does not spawn naturally`
}
