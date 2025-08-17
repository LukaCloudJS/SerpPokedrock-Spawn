async function carregarSpawnRules() {
    const num = document.getElementById("pokeimput").value

    if(isNaN(num)) return

    const reponse = await fetch("../src/js/pokemon.json")
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)

    const name = (await pokemon.json()).name

    const data = (await reponse.json())["minecraft:spawn_rules"].conditions

    const index = data.findIndex(f => f["minecraft:permute_type"].map(e => e.entity_type).includes(`pokemon:p${num}`))

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

        document.getElementById("pokeimg").setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png`)
        document.getElementById("info").innerHTML = `Pokemon: ${name.replace(/\w/, letter => letter.toUpperCase())}<br>ID: ${num}<br>Spawn type: ${type}<br>Block Spawn: ${block ? block.map(m => m.split(":")[1].replace(/\w/, letter => letter.toUpperCase())).join(", ") : "Any"}<br>Biome Spawn: ${biome.replace(/\w/, letter => letter.toUpperCase())}<br>Spawn Chance: ${chance}%`
        return
    }
    document.getElementById("pokeimg").setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png`)
    document.getElementById("info").innerHTML = `${name.replace(/\w/, letter => letter.toUpperCase())} does not spawn naturally`
}