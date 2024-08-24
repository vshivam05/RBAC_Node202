import { model } from "mongoose";

import SongSchema from "./song/index.js";
import UserSchema from "./user/index.js";
import RoleSchema from "./role/index.js";
import PermissionSchema from "./permission/index.js";
import UserRoleSchema from "./user_role/index.js";
import RolePermissionSchema from "./role_permission/index.js";

export const Song = model("song", SongSchema);
export const User = model("user", UserSchema);
export const Role = model("role", RoleSchema);
export const Permission = model("permission", PermissionSchema);
export const UserRole = model("userRole", UserRoleSchema);
export const RolePermission = model("rolePermission", RolePermissionSchema);