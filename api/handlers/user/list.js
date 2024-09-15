import User from '../../models/User.js'

export async function listUsers(req, res){
    try{
        const data = await User.find({})
        res.send(data)  
      }
      catch (error) {
        res.status(500).send(error.message)
      }
}