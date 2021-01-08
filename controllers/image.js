const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey:'831a251bab8d4b8fb8693919be088ef8'
});

const handleApiCall = (req, res) => {
app.models
	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req,res,db) => {
	const { id, faces } = req.body;
	db('users')
  	.where('id', '=', id)
  	.increment('entries', faces)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('unable to get entries'));
	// let found = false;
	// database.users.forEach(user => {
	// 	if(user.id === id) {
	// 		found = true;
	// 		user.entries += faces
	// 		return res.json(user);
	// 	} 
	// })
	// if (!found) {
	// 	res.status(400).json('not found')
	// }
}

module.exports = {
	handleImage,
	handleApiCall
}