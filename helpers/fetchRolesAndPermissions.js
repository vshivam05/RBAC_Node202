import {
  UserRole,
  Permission,
  RolePermission,
  Role,
} from "../src/models/index.js";
import permission from "../src/models/permission/index.js";

export default async function fetchRoleAndPermissions(req) {
  // get user by req.user._id

  
  const userRoles = await UserRole.find({ userId: req.user._id, });

  let roles = {};
  // get roles and add it to object declared above
  (
    await Role.find({
      _id: { $in: userRoles.map(({ roleId }) => roleId) },
    })
  ).forEach(({ role }) => {
    roles[role] = true;
  });

  let permissions = {};
  if (userRoles.length) {
    // get permissions for each subject
    const rolePermissions = await RolePermission.find({
      roleId: { $in: userRoles.map(({ roleId }) => roleId) },
    });

    if (rolePermissions.length) {
      //get all permission
      (
        await Permission.find({
          _id: { $in: rolePermissions.map(({ permissionId }) => permissionId) },
        })
      ).forEach(({ action, subject }) => {
        if (!permissions[subject]) permissions[subject] = {};
        permissions[subject][action] = true;
      });
    }
  }

  return {
    roles,
    permissions,
  };
}
