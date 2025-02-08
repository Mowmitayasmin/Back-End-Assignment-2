/**
 * @interface Branch
 * @description Represents a branch object.
 */
export interface Branch  {
    id: string;
    name: string;
    address: string;
    phone: string;
};

// Sample in-memory database for storing branches
const branches: Branch[] = [];

/**
 * @description Create a new branch.
 * @param {{ name: string; address: string; phone: string }} branch - The branch data.
 * @returns {Promise<Branch>}
 */
export const createBranch = async (branch: {
    name: string;
    address: string;
    phone: string;
}): Promise<Branch> => {
    const newBranch: Branch = { id: Date.now().toString(), ...branch };
    branches.push(newBranch);
    return newBranch;
};

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;  // returns all branches from the in-memory database
};
