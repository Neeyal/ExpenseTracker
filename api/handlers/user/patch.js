import User from '../../models/User.js'

export async function updateUser(req, res){
    try{
    const id = req.params.id    
    const payload = req.body
    const { name , city , mobile , mediaUrl } = payload
    await User.findOneAndUpdate({id}, {name , city , mobile , mediaUrl}, { new: true })
    res.status(200).json({ msg: 'User updated successfully'});
    }
    catch(err){
        res.status(300).json(err.message)
    }
}