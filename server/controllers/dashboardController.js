const dashboardPage = "../views/layouts/dashboard"
const Note = require("../models/Notes");
const mongoose = require("mongoose");


// get dashboard route
exports.dashboard = async (req,res)=>{
    let perPage = 12;
    let page = req.query.page || 1; // which page yu are on you can see in the url

    const locals = {
        title:"Dashboard",
        description : "Note App made with Node Js"
    }

    try {
       const notes = await  Note.aggregate([
            {
                $sort:{
                    createdAt: -1
                }
            },
            {$match: {  user:new mongoose.Types.ObjectId(req.user.id)}},
            {
                $project:{
                    title:{ $substr:["$title",0,30]},
                    body:{ $substr:["$body",0,100]},
                }
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
        const count = await Note.countDocuments();
        // const notes = await Note.find({});
        res.render("dashboard/index",{
            userName: req.user.firstName,
            notes,
            locals,
            layout:dashboardPage,
            current:page,
            pages:Math.ceil(count/perPage)
        });
    } catch (error) {
        console.log(error);
    }
   
}

exports.dashboardViewNote = async (req,res)=>{
    const note = await Note.findById({_id:req.params.id}).where({user:req.user.id}).lean();
    if(note){
        res.render("dashboard/view-notes",{
            note,
            noteId: req.params.id,
            layout:dashboardPage
        })
    }else{
        res.send("Oops something went wrong")
    }
}



exports.dashboardUpdateNote = async (req,res)=>{
    try {
        await Note.findByIdAndUpdate(
            {_id:req.params.id},
            {title:req.body.title , body:req.body.body, updateAt:Date.now()}
        ).where({user:req.user.id})
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error)
    }
}
exports.dashboardDeleteNote = async (req,res)=>{
    try {
        await Note.deleteOne(
            {_id:req.params.id}
        ).where({user:req.user.id})
        res.redirect("/dashboard")
    } catch (error) {
       console.log(error) 
    }
}

// add page
exports.dashboardAdd = async(req,res)=>{
    res.render("dashboard/addNote",{
        layout:dashboardPage
    });
}
//add note 
exports.dashboardAddSubmit = async(req,res)=>{
    try {
        req.body.user = req.user.id;
        await Note.create(req.body)
        res.redirect("/dashboard");
    } catch (error) {
        console.log(error)
    }
}
// search page
exports.dashboardSearch = async (req,res)=>{
    try {
        res.render("dashboard/search",{
            searchResults: '',
            layout:dashboardPage
        })
    } catch (error) {
        console.log(error);
    }
}

// submiting search 
exports.dashboardSearchSubmit = async (req,res)=>{
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        const searchResults = await Note.find({
            $or: [
              { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
              { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
            ],
          }).where({ user: req.user.id });
      
          res.render("dashboard/search", {
            searchResults,
            layout: dashboardPage
          });
    } catch (error) {
        console.log(error);
    }
}