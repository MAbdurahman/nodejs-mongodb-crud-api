import { getFirstName } from '../utils/functionsUtil.js';

export default function setCookieAndToken(user, res, statusCode) {
   const milliseconds_minute = 60000;
	const milliseconds_hour = milliseconds_minute * 60;
	const milliseconds_day = milliseconds_hour * 24;
	const milliseconds_week = milliseconds_day * 7;
	const milliseconds_month = milliseconds_day * 30;
	const expiryDate = new Date(Date.now() + milliseconds_week);

   const token = user.generateJsonWebToken();
   const { password: pass, ...rest } = user._doc;

   res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
		.status(statusCode)
		.json({
			message: `${getFirstName(
				user.fullname
			)}'s data successfully configured!`,
			success: true,
			user: rest,
			token,
		});

}