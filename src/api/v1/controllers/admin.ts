import { Request, Response, NextFunction } from 'express'
import { auth } from "../../../../config/firebaseConfig";
import { HTTP_STATUS } from '../../../constants/httpConstants';

 const customClaimes = async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { role } = req.body;
    try {
        await auth.setCustomUserClaims(uid, { role });
        res.status(HTTP_STATUS.OK).json({ message: `Role "${role}" assigned to user ${uid}` });
    } catch (error) {
        res.status(500).json({ error: "Failed to set custom claims" });
    }
}

export default customClaimes