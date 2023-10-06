import { Account,User,Role } from "../../database/models";
import { hashPassword, hashPasswordSalt, signJwt } from "../../service";
import { mailService } from "../../service";
import crypto from 'crypto';
class AuthenticationService {
    constructor() {

    }
    async register(userName, password, email) {
        try {
            const ObjectPassword:any = hashPassword(password);
            const account = new Account({
                userName,
                password: ObjectPassword.passwordHashed,
                email,
                salt: ObjectPassword.salt,
                passwordResetToken: crypto.randomBytes(20).toString('hex')
            });
            await account.save();
            const roleUser = await Role.findOne({ roleName: "User" });
            const accountA = await Account.findOne({ userName });
            console.log(accountA);
            console.log(roleUser);
            const user = new User({
                account: accountA,
                Roles: roleUser
            });
            console.log(" day la user " + user);
            await user.save();
            
        } catch (error) {
            throw error;
        }

    }
    async login(account, password) {
        try {
            const hashPasswordUser = hashPasswordSalt(account.salt, password);
            if(hashPasswordUser !== account.password)
            {
                throw new Error("Password incorrect");
            }
            const user = await User.findOne({ account: account._id });
            console.log("hahahahaha" + user);
            const token = signJwt(user,account.email);
            return token;
        }catch(error)
        {
            throw error;
        }
    }
    async findAccountByUserName(username)
    {
        try {
            const account = await Account.findOne({ userName:username });
            return account;
        } catch (error) {
            throw error;
        }
    }
    async forgotPassword(account)
    {
        const htmlTemplate = `
        <h1>Forgot Password</h1>
        <p>Click <a href="http://localhost:3000/api/auth/reset-password/${account.passwordResetToken}">here</a> to reset your password</p>
        `;
        try {
            mailService.sendMail(account.email, "Forgot Password", "", htmlTemplate);
        }
        catch(error)
        {
            throw error;
        }
    }
    async resetPassword(tokenResetPassword, password)
    {
        try {
            const account = await Account.findOne({ passwordResetToken: tokenResetPassword });
            if(!account)
            {
                throw new Error("Token is invalid");
            }
            const hashPasswordUser = hashPasswordSalt(account.salt, password);
            await account.updateOne({ password: hashPasswordUser, passwordResetToken: crypto.randomBytes(20).toString('hex') });
        }
        catch(error)
        {
            throw error;
        }
    }
    async findAccountByEmail(email)
    {
        try {
            const account = await Account.findOne({ email });
            return account;
        }
        catch(error)
        {
            throw error;
        }
    }
}

export default new AuthenticationService();