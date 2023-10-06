import authenticateService from "./authenticate.service";
class AuthenticationController {
    constructor() {
    }
    async register(req, res, next) {
        try {
            const { username, password, email } = req.body;
            await authenticateService.register(username, password, email)
            return res.status(200).json("Register successfully.");
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error("Error while saving permission:", error);
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const account = await authenticateService.findAccountByUserName(username);
            account?console.log("user found"):console.log("user not found");
            if(!account)
            {
                return res.status(401).send("User not found");
            }
            const token = await authenticateService.login(account, password);
            res.status(200).json({'token': token });
        } catch (error) {
            next(error);
          }
    }
    async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const account = await authenticateService.findAccountByEmail(email);
            if(!account)
            {
                return res.status(401).send("Email not found");
            }
            await authenticateService.forgotPassword(account);
            return res.status(200).json("Email sent.");
        } catch (error) {
            next(error);
          }
    }
    async resetPassword(req, res, next) {
        try {
            const { tokenResetPassword } = req.params;
            const { password } = req.body;
            await authenticateService.resetPassword(tokenResetPassword, password);
            return res.status(200).json("Password reset successfully.");
        } catch (error) {
            next(error);
          }
    }

}
export default new AuthenticationController();