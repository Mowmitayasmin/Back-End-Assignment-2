/**
 * @interface Branch
 * @description Represents a branch object.
 */
export interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
}

// Sample in-memory database for storing branches
const branches: Branch[] = [];

/**
 * @description Create a new branch.
 * @param {{ name: string; address: string; phone: string }} branch - The branch data.
 * @returns {Promise<Branch>} - The newly created branch.
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
 * @returns {Promise<Branch[]>} - A list of all branches.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;
};

/**
 * @description Get a branch by ID.
 * @param {string} id - The ID of the branch to fetch.
 * @returns {Promise<Branch | null>} - The branch if found, or null if not.
 */
export const getBranchById = async (id: string): Promise<Branch | null> => {
    const branch = branches.find(branch => branch.id === id);
    return branch || null; // Return the branch if found, otherwise null
};
