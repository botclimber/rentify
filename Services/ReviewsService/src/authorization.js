const isAuthz = (uType) => {
    const cols = ["col", "admin", "superAdmin"]

    return cols.includes(uType)
}

module.exports = {isAuthz}