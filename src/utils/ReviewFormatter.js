module.exports = fn = data => {
    return {
        "id": data.uri ? data.uri.value.substring(19) : '',
        "uri": data.uri ? data.uri.value : '',
        "title": data.title ? data.title.value : '',
        "description": data.description ? data.description.value : '',
        "cover": data.cover ? data.cover.value : '',
        "ign": data.ign ? data.ign.value : '',
        "gamespot": data.gamespot ? data.gamespot.value : '',
        "metacritic": data.metacritic ? data.metacritic.value : '',
    }
}