module.exports = {
    async login(req, res){
        try {
            return res.status(201).json({jwt: 'fdklsaj;fls'});
        }
        catch(error){
            return res.status(400).json(error);
        }
    },
}