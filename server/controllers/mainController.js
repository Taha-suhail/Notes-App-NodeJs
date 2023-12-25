// get route homepage
const frontPage = "../views/layouts/front-page"


exports.homepage = async (req,res)=>{
    const locals = {
        title:"Nodejs Note",
        description : "Note App made with Node Js"
    }
    res.render("index",{
        locals,
        layout:frontPage
    });
}

// get route about

exports.about = async (req,res)=>{
    const locals = {
        title:"Nodejs Note",
        description : "Note App made with Node Js"
    }
    res.render("about",locals);
}