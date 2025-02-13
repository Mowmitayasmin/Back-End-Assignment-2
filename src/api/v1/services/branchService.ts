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

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {Partial<Branch>} branch - The fields to update (e.g., address, phone).
 * @returns {Promise<Branch>} - The updated branch data.
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (
    id: string,
    branch: Partial<Branch>
): Promise<Branch> => {
    const branchRecord = branches.find(b => b.id === id);

    if (!branchRecord) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    // Update only the fields provided in the request body (partial update)
    Object.assign(branchRecord, branch);

    return branchRecord;
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>} - Resolves if the branch is deleted.
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const index = branches.findIndex(branch => branch.id === id);

    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    // Remove the branch from the array
    branches.splice(index, 1);
};
