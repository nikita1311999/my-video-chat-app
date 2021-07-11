exports.handler = function (context, event, callback) {
  const VALID_PASSCODE = context.PASSCODE;
  const TWILIO_ACCOUNT_SID = context.ACCOUNT_SID;
  const TWILIO_API_KEY = context.API_KEY;
  const TWILIO_API_SECRET = context.API_SECRET;
  const ACCESS_TOKEN_IDENTITY =
   Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15); // client name

  if (event.passcode !== VALID_PASSCODE) {
    const response = new Twilio.Response();
    response.setStatusCode(401);
    response.setBody('Invalid passcode');
    return callback(null, response);
  }

  const ROOM_NAME = 'Engage'; // room name
  const { AccessToken } = Twilio.jwt;
  const { VideoGrant } = AccessToken;
 
  const videoGrant = new VideoGrant({
    room: ROOM_NAME,
  });
 
  const accessToken = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  );
  accessToken.addGrant(videoGrant);
  accessToken.identity = ACCESS_TOKEN_IDENTITY;
  return callback(null, {
    token: accessToken.toJwt(), 
  });
};