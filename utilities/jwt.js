  const myJWT = require('jsonwebtoken');



  const generaJwt = (uid) => {


      return new Promise((resolve, reject) => {

          // DEFINIMOS  NUESTRO PAYLOAD
          const payload = {
              uid: uid
          };

          // definimos  nuestro  token:
          // PAYLOAD
          // PALABRA SECRETA
          // DURACION DEL TOKEN
          // CALL BACK QUE  RETORNA  SI  HUBO UN ERROR
          myJWT.sign(payload,
              process.env.JWT_SECRET_KEY, { expiresIn: '3h' },
              (error, token) => {

                  if (error) {
                      console.log('hubo un erro, ' + error);
                      reject('No se  pudo generar el JWT : ' + error);
                  } else {
                      resolve(token);
                  }
              }
          );
      });
  }


  module.exports = { generaJwt };