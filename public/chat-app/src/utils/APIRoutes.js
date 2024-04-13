export const host = process.env.REACT_APP_Api_Route_HOST;

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const allUserRoute = `${host}/api/auth/allusers`;
export const addMessageRoute = `${host}/api/messages/addmsg`;
export const getMessagesRoute = `${host}/api/messages/getmsg`