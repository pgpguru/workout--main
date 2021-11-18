const router = require('express').Router();
const db = require("../../models");

router.get("/",(req,res)=>{
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" } 
              }
        }
    ])
    .then(workout=>{
        res.json(workout)
    })
    .catch((err) =>{
        console.log(err)
        res.json(err)
    })
})
router.put("/:id",(req,res)=>{
    db.Workout.findOneAndUpdate({_id:req.params.id},{$push: {exercises: req.body}}).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
    
})
router.post("/",(req,res)=>{
    db.Workout.create({}).then(data=>{
res.json(data)
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
    
})
router.get("/range",(req,res)=>{
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" } 
              }
        }
    ]).sort({day:-1}).limit(7)
    
    .then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
})
module.exports = router;