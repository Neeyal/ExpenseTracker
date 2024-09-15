import User from '../../models/User.js'

export async function getUser(req, res){
    try{
        const id = req.params.id
        const data = await User.findOne({ id: id })
        res.send(data)  
      }
      catch (error) {
        res.status(500).send(error.message)
      }
}