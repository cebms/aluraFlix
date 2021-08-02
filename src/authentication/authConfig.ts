import basicAuth from 'express-basic-auth';


const getUnauthorizedResponse =  (request: basicAuth.IBasicAuthedRequest) => {
    return request.auth
            ? ('Credentials ' + request.auth.user + ':' + request.auth.password + ' rejected')
            : 'No credentials provided';
}


function authConfig(){
    return basicAuth({
        users: { 'admin':'admin' },
        unauthorizedResponse: getUnauthorizedResponse,
    }
    )
}

export default authConfig();