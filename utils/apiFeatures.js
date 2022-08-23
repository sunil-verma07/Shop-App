export default class APIFeatures {
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }

    search(){
         const keyword = this.querystr.keyword ?{

            name:{
                $regex:this.querystr.keyword,
                $options:"i"
            }
         }:{}

         this.query = this.query.find({...keyword});
         return this; 
    }
    filter(){
        const queryCopy = {...this.querystr}
        
        const removeFeilds = ['keyword','page','limit']
        removeFeilds.forEach(element =>delete queryCopy[element]);

        //advance filters 
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
         
      
        this.query = this.query.find(JSON.parse(queryStr));
        return this;

        
    }
    pagination(resultPerPage){
        const currentPage = Number(this.querystr.page) ||1;
        const skip = resultPerPage*(currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}