const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log("Connected to mongoDB..."))
.catch(()=> console.log("Could not connect to mongoDB"))
/* 
 _id":"5a68fde3f09ad7646ddec17e",
"tags":["aspnet","backend"],
"date":"2018-01-24T21:42:59.605Z",
"name":"ASP.NET MVC Course",
"author":"Mosh",
"isPublished":true,
"price":15,
"__v":0 */
const schema= new mongoose.Schema({ 
    tags:[String],
    date:{type:Date, default:Date.now},
    name:String,
    author:String,
    isPublished:Boolean,
    price:Number,
    __v:Number
})

const Course=mongoose.model('Course',schema)

/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                Exercise 1 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        + Get all the published backend courses,
          +  sort them by name, 
          +  pick only their name and author.
*/
async function exercise1() {

    const courses = await Course
    .find({isPublished:true , tags:"backend"})
    .sort({P:1})
    .select({name:1,author:1})
    
console.log(courses);
}

// exercise1()

/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                Exercise 2 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        + Get all the published frontend and backend courses,
          +  sort them by price in a descending order, 
          +  pick only their name and author.
*/
async function exercise2() {
        
    const courses= await Course
        .find({isPublished:true, tags:{$in:['frontend', 'backend']}})
        .sort({price:-1}) // .sort('-price')
        .select('name author price')

        console.log(courses)
        
}
// exercise2()

/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                Exercise 3 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        + Get all the published  courses that are $15 or more,
          +  or have the word 'by' in their title , 
         
*/
async function exercise3() {

    const courses = await Course
    .find({isPublished:true} )
    .or([
        {price:{ $gte:15}},
        {name:/.*by.*/i} // for i for insensitive search
    ])
console.log(courses)
}
exercise3()