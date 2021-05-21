module.exports = fn = data => {
    return {
        "id": data.categoryID ? data.categoryID.value.substring(19) : '',
        "categoryID": data.categoryID ? data.categoryID.value : '',
        "categoryName": data.categoryName ? data.categoryName.value : '',
    }
}