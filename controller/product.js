
const Product = require("../model/product")


const getAllProduct = async (req, res) => {

    const {featured, company, name, sorts, fields, numericFilters} = req.query
    let queryObject = {}

    if(featured){
        queryObject.featured = featured === "true" ? true : false
    }

    if(company){
        queryObject.company = company
    }

    if(name){
        queryObject.name = { $regex: name,  $options: "i" }
    }

    if(numericFilters){
        operatorMap = {
            ">" : "$gt", 
            ">=" : "$gte", 
            "<" : "$lt", 
            "<=" : "$lte",
            "=" : "$eq"
        };

        const regEX= /\b(<|>|<=|=|<|>=)\b/g;

        let filters = numericFilters.replace(regEX, (match) => {
            `-${operatorMap[match]}-`
        })

        const options = ["price", "rating"]
        filters = filters.split(",").forEach(item => {
            const [field, operator, value] = item.split("-")

            if(options.includes(field)){
                queryObject[field] = { [operator] : Number(value) }
            }
        })

    }

    let result = Product.find(queryObject)

    if(sorts){
        const sortList = sorts.split(" , ").join("  ")
        result.sort(sortList)
    }
    else{
        result.sort( "createdAt" )
    }

    if(fields){
        const filedtList = fields.split(" , ").join("  ")
        result.select(filedtList)
    }

    const page = (req.query.page) || 1
    const limit = (req.query.limit) || 15
    const skip = (req.query.skip) * page

    result = result.skip(skip).limit(limit)

    const product = await result

    res.status(200).json( { product, nbHit: product.length } )
    }

    module.exports = getAllProduct