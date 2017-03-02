var express = require('express');
var router = express.Router();

var User = require('../models/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//..............................................................................................//
// login
//..............................................................................................//

router.get('/login', function (req, res, next){
  res.render('users/login', {title: 'Login'})
})

.post(function (req, res){
console.log(req)
});
router.get('/logout', function (req, res, next){
	//Destroy Session
	req.session.destroy(function(err){
		//fail
		if(err){
			// @TODO flash msg
			res.redirect('/');
		}

		//Success
		// @TODO flash msg
		res.redirect('/');
	})
});

//..............................................................................................//
		// profile
//..............................................................................................//

//@ TODO this will require a use session
router.get('/profile', function (req, res, next){
  res.render('users/profile', {title: 'profile'})
})
.post(function (req, res){
	console.log(req)
});
//..............................................................................................//
//register
//..............................................................................................//


router.get('/register', function (req, res, next){
  res.render('users/register', {title: 'Register'})
})
.post(function (req, res){
	var email =  req.param('email');
	var password =  req.param('password');
	var passwordConfirm =  req.param('passwordConfirm');
	if(password != passwordConfirm){
		//@TODO Flash Msg
		req.redirect('/register');
	}
});

//..............................................................................................//
//confirmtions
//..............................................................................................//


router.get('/register_pending', function (req, res){
	res.render('users/register_pending', {title: 'Registered'})
});


router.get('/register_confirm', function (req, res){
	res.render('users/register_confirm', {title: 'Registerion confirmed'})
});
//..............................................................................................//
//passwords
//..............................................................................................//


router.get('/forgotpassword', function (req, res, next){
  res.render('users/forgotpassword', {title: 'forgotpassword'})
});

router.get('/password_reset', function (req, res){
 res.render('users/password_reset',{title : 'Reset password_reset'} )
})
.post(function (req, res){
console.log(req)
});
//..............................................................................................//
//Session /delete accont
//..............................................................................................//

router.get('/delete', function(req, res){
	res.render('users/account_delete', {title: "Delete account"});
})
.post(function (req, res){
if (req.param('confirm') == 1){
	var id = req.session._id ;
	if (req.param('sofDelete') == 1){
//soft delet
User.update({ _id: id}, {$set: { deleted_at :Date}}, function(err){
if (err){
	//@TODO flash msg
	res.redirect('/users/delete');
}
});
	}else
	//Hard Delete
	User.find({_id : id}).remove(function(err){
		if(err){
				//@TODO flash msg
	res.redirect('/users/delete');
		}
	});
}

// success
//@TODO flash msg
req.session.destroy();
res.redirect('/');
});

router.get('/reactivate', function(req, res){
	res.render('users/accont_reactivate');
})
.post(function(req, res){
	var email = req.param('email');
	//@TODO validate Email

	User.find({email: email}, function(err){
		if(err){
			//@TODO flash msg	
			res.redirect('/reactivate')
				}
	})
	//@ TODO send email touser
});
router.get('/reactivate/:code', function(req, res){
	var code = req.param('code');
	//var code = req.query('code');

})
module.exports = router;
