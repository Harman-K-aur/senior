const Scheme=require('../../models/scheme')
function schemeController(){
    return{
      async schemeindex(req,res){
        const schemes = await Scheme.find()
        return res.render('scheme',{schemes:schemes});
      }
    }
}

module.exports=schemeController;