

module.exports = function(models, passport, localStrategy) {
	passport.use(new localStrategy(
		{ usernameField: 'user'	},
		function(user, password, done) {
			models.User.findOne({
				include: [{
				    model: models.Role,
				    attributes: [['code', 'role']],
				    through:{
					    attributes: [] //Omits the linking table records
					}
				}],
				where: {
					active: true,
					$or: [
						{email: user},
						{username: user}
					]
				}
			}).then(function (userData) {
				if (!userData) { return done(null, false); }
				if (!models.User.authenticate(password, userData.hashedPassword, userData.salt)) { 
					return done(null, false); 
				}
				return done(null, userData);
			}).catch(function (err) {
	  			if (err) { return done(err); }
			});
		}
	));

	passport.serializeUser(function(user, done) {
		return done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		models.User.findOne({
			include: [{
			    model: models.Role,
			    attributes: [['code', 'role']],
			    through:{
				    attributes: [] //Omits the linking table records
				}
			}],
			where: {id: id}
		}).then(function(user) {
			if (!user) { done(null, false); }
			return done(null, user);
		}).catch(function(err) {
			return done(err);
		});
	});
}