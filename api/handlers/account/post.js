import Account from '../../models/Account.js'

export async function createAccount(req, res){
    try{
    const payload = req.body
    const { name, balance } = payload
    const account = new Account({ name, balance })
    await account.save()
    res.status(200).json({ msg: 'Account added successfully', account: account.toObject() });
    }
    catch(err){
        res.status(300).json(err.message)
    }
}