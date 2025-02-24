# Debugging Analysis

Scenario 1: DELETE Employee Operation

Breakpoint:
userController.ts at const deletedEmployee = await userService.deleteEmployee(id);

Objective:
Ensure the employee with the given ID is deleted from the employees array.

Debugger Observations:

Variables:
id: Check if the passed ID matches the expected one (e.g., 1739468407652).
employees: Verify the employee exists before and is removed after deletion.
Call Stack:
Ensure the flow reaches deleteEmployeeById and deleteEmployee(id) correctly.
Behavior:
Confirm the employee is deleted from the array after the request.

Analysis

What did you learn from this scenario?

The debugger allows checking both the ID being passed for deletion and ensuring the employee’s removal from the list.
Did you observe any unexpected behavior?

 Potential issues could arise if the employee ID doesn't match or the array isn't correctly updated after deletion.
Are there areas for improvement or refactoring in this part of the code?

Ensure that proper error handling is implemented if the employee doesn’t exist or the deletion operation fails.
How does this enhance your understanding of the overall project?

Understanding the debugging process for DELETE operations helps reinforce the importance of data consistency and correct handling of requests.

Scenario 2: POST Employee Creation Operation

Breakpoint:
userController.ts at const newEmployee: User = await userService.createEmployee(req.body);

Objective:
Ensure the correct data is passed to create a new employee.

Debugger Observations:

Variables:
req.body: Inspect the POST data (e.g., {"name": "John Doe", "position": "Software Engineer"}).
newEmployee: Verify the created employee object.
Call Stack:
Check that createEmployee is called after receiving the POST request.
Behavior:
Verify that the employee is created correctly by inspecting req.body and newEmployee.

Analysis

What did you learn from this scenario?

The debugger allows inspection of the incoming request data (req.body) and confirms whether the employee object is correctly created.
Did you observe any unexpected behavior?

If the newEmployee object doesn’t match the input data, check the userService.createEmployee logic for potential issues.
Are there areas for improvement or refactoring in this part of the code?

Ensure validation is in place to handle missing or incorrect data in req.body.
How does this enhance your understanding of the overall project?

Debugging POST requests strengthens understanding of data validation and proper object creation workflows.

Scenario 3: POST Branch Creation Operation

Breakpoint:
branchController.ts at const newBranch: Branch = await branchService.createBranch(req.body);

Objective:
Ensure the branch data is correctly passed to create a new branch.

Debugger Observations:

Variables:
req.body: Inspect the branch data (e.g., {"name": "Main Branch", "address": "123 Main St"}).
newBranch: Ensure it includes correct details and a unique ID.
Call Stack:
Ensure the flow from the POST request to createBranch.
Behavior:
Verify the creation of the branch by inspecting req.body and newBranch.

Analysis

What did you learn from this scenario?

The debugger helps inspect the incoming request data (req.body) and verifies that the branch creation logic processes it correctly.
Did you observe any unexpected behavior?

If the branch creation fails, the issue may lie in the validation or creation logic in createBranch.
Are there areas for improvement or refactoring in this part of the code?

Ensure error handling is robust, especially for cases where required data is missing or invalid.
How does this enhance your understanding of the overall project?

## Debugging POST operations for branch creation improves understanding of managing data creation and validation for resources within the system

Scenario 1 for assignment 3: Validation Logic (Joi) for Employee Data
Breakpoint:export const employeeSchema: ObjectSchema = Joi.object

📌 src/api/v1/validation/userValidation.ts.
Investigate how the validation logic processes incoming employee data and handles invalid requests.
Debugger Observations:

Variables:
req.body: Inspect the incoming request payload to check if all required fields are provided.
error: Verify the error object returned by Joi when validation fails.

Call Stack:
Ensure the request correctly flows from userRoutes.ts → userController.ts → userValidation.ts.

Behavior:
If validation fails, confirm whether the error is properly formatted and passed to the middleware.

Analysis:

What did you learn from this scenario?

Debugging validation logic ensures that the API correctly processes incoming employee data and provides meaningful validation errors.

Did you observe any unexpected behavior?

If validation errors are not returned as expected, there might be an issue with Joi schema definition or error-handling middleware.

Are there areas for improvement or refactoring in this part of the code?

Ensure validation error messages are user-friendly and provide clear guidance on missing or incorrect fields.

How does this enhance your understanding of the overall project?

Debugging validation logic strengthens input validation, ensuring only well-formed data reaches the database, improving API reliability.

Scenario 2 fro assignment 3: Firestore CRUD Operation (Fetch Employee by ID)
Breakpoint:const employee = employees.find(emp => emp.id === id);

📌 src/api/v1/services/userService.ts.

Analyze how Firestore retrieves an employee's data and handles missing records.
Debugger Observations:

Variables:
employeeSnapshot.exists: Ensure Firestore correctly determines if the requested employee exists.
employeeSnapshot.data(): Verify the retrieved employee data structure.

Call Stack:
Trace the request flow from userRoutes.ts → userController.ts → userService.ts to ensure Firestore is properly queried.

Behavior:
If the employee does not exist, confirm that the system returns a proper 404 Not Found response.

Analysis:

What did you learn from this scenario?

Debugging Firestore queries helps confirm correct data retrieval and proper handling of non-existent records.

Did you observe any unexpected behavior?

If employeeSnapshot.exists returns false for an existing employee, there may be an issue with the Firestore query or incorrect document ID usage.

Are there areas for improvement or refactoring in this part of the code?

Improve error messages when an employee ID is not found, ensuring users receive clear and informative responses.

How does this enhance your understanding of the overall project?

Understanding Firestore queries and debugging their behavior ensures the system correctly retrieves and processes stored data.

Scenario 3 fro assignment 3: Error Handling Middleware (Custom Error Response)
Breakpoint: res.status(statusCode).json({ message });

📌 src/api/v1/middleware/errorMiddleware.ts.

Examine how custom errors are formatted and returned as API responses.
Debugger Observations:

Variables:
err.message: Ensure meaningful error messages are generated and returned.
err.statusCode: Verify appropriate HTTP status codes are assigned to different errors.
res: Check the response structure sent to the client for consistency.

Call Stack:
Trace how errors propagate from userService.ts → userController.ts → errorMiddleware.ts.

Behavior:
Confirm that errors are consistently handled and returned with the correct status codes.

Analysis:

What did you learn from this scenario?

Debugging error-handling middleware ensures that API consumers receive clear, structured error messages when issues occur.

Did you observe any unexpected behavior?

If incorrect status codes or vague error messages are returned, adjustments may be needed in error-handling logic.

Are there areas for improvement or refactoring in this part of the code?

Improve logging mechanisms for better debugging and monitoring of error occurrences.

How does this enhance your understanding of the overall project?

Proper error handling enhances API reliability and user experience by ensuring predictable and informative responses.
