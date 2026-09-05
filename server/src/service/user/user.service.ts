import User from "../../models/user.model.js";
import { AppError } from "../../utils/app-error.utils.js";

export const getCurrentUserService = async(userId:string) => {
    const user = await User.findById(userId);
    if(!user){
        throw new AppError(404,"Account not found")
    }

    return {
        id:user._id,
        firstname:user.firstName,
        lastName:user.lastName,
        email:user.email,
        tasks: user.tasks,
        profileImgUrl: user.profileImg?.url,
    }
}