function routes(app) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */

  app.get('/healthcheck', (req, res) => res.sendStatus(200));



  /**
* @openapi
* /signup:
*  post:
*     tags:
*     - Authentication
*     description: Responds if signup successfull
*     responses:
*       200:
*         description: signup success
*/
  app.post('/api/authentication/signup', (req, res) => {
    res.status(201).json({ message: 'signup success' })
  })

  /**
* @openapi
* /login:
*  post:
*     tags:
*     - Authentication
*     description: Responds if login successfull
*     responses:
*       200:
*         description: login success
*/
  app.post('/api/authentication/signup', (req, res) => {
    res.status(201).json({ message: 'login success' });
  })

  /**
* @openapi
* /Email or Phone Verification:
*  post:
*     tags:
*     - Authentication
*     description: Responds if Email/Phone Verification successfull
*     responses:
*       200:
*         description: email verification successull
*/
  app.post('/api/authentication/verify-email-or-phone', (req, res) => {
    res.status(201).json({ message: 'email/phone verification success' });
  })

    /**
* @openapi
* /Otp Verification:
*  post:
*     tags:
*     - Authentication
*     description: Responds if Otp Verification successfull
*     responses:
*       200:
*         description: otp verification successull
*/
app.post('/api/authentication/verify-email-or-phone', (req, res) => {
  res.status(201).json({ message: 'otp verification success' });
})

    /**
* @openapi
* /change-password:
*  put:
*     tags:
*     - Authentication
*     description: Responds if password changed  successfully
*     responses:
*       200:
*         description: otp verification successull
*/
app.put('/api/authentication/change-password', (req, res) => {
  res.status(201).json({ message: 'password changeed successfully' });
})

// user 

    /**
* @openapi
* /get-user/:user-id:
*  post:
*     tags:
*     - User
*     description: Responds if password changed  successfully
*     responses:
*       200:
*         description: otp verification successull
*/
app.put('/api/authentication/change-password', (req, res) => {
  res.status(201).json({ message: 'password changeed successfully' });
})

}

module.exports = routes