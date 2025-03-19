import { Loan } from "../models/loan";
import { getDocuments } from "../repositories/firestoreRepository";

const COLLECTION = "loans";

export const getAllDocuments = async (): Promise<Loan[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Loan;
    });
};