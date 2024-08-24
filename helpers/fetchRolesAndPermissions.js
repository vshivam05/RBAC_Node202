import { UserRole, Permission, RolePermission, Role } from "../src/models/index.js";

export default async function fetchRoleAndPermissions(req) {
	// get user by req.user._id

	let roles = {};
	// get roles and add it to object declared above
	let permissions = {};
	// if (userRoles.length) {
	// get permissions for each subject
	// }

	return {
		roles,
		permissions
	}

}