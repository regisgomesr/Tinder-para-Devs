const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        //console.log(req.params.devId);
        //console.log(req.headers.user);

        console.log(req.io, req.connectedUsers);

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);     // usuario logado
        const targetDev = await Dev.findById(devId);    // usuario que esta recebendo o like

        if(!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if(targetDev.likes.includes(loggedDev._id)) {
            //console.log('DEU MATCH');
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if(targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }

        }

        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};