const Job= require('../../models/addJob')

function jobController(){
    return{
      async jobindex(req,res){
        const jobs = await Job.find()
        return res.render('jobs',{jobs:jobs});
      },
       addjobindex(req,res){
        return res.render('addJobs')
      },

      async postaddjob(req,res){
        const {  CompanyName, Job_Location, Role, Link }   = req.body

        if(!CompanyName || !Job_Location || !Role) {
          req.flash('error', 'All fields are required')
         return res.redirect('/addJobs')
      }
      const job = new Job({
        CompanyName,
        Job_Location,
        Role,
        Link
    })

    job.save().then((job) => {
       return res.redirect('/jobs')
    }).catch(err => {
       req.flash('error', 'Something went wrong')
           return res.redirect('/addJobs')
    })
   },

      }
}

module.exports=jobController;