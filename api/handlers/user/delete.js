import User from '../../models/User.js'

export async function deleteUser(req, res){
    try{
        const id = req.params.id
        const data = await User.findOneAndDelete({ id: id })
        if(data){
          res.status(200).send("User deleted successfully")
        }
        else{
          res.status(200).send("User already deleted or not exist")
        }  
      }
      catch (error) {
        res.status(500).send(error.message)
      }
}