import * as bcrypt from 'bcryptjs';

export const adminUser = {
  id: 1,
  name: 'admin',
  password_hash: bcrypt.hashSync('admin', 8),
  password: 'admin',
  email: 'admin@demo.com',
  role_id: 1,
};

export const groupLeaderUser = {
  id: 2,
  name: 'group leader',
  password_hash: bcrypt.hashSync('group', 8),
  password: 'group',
  email: 'groupleader@demo.com',
  role_id: 1,
};

export const lawyerUser = {
  id: 3,
  name: 'lawyer',
  password_hash: bcrypt.hashSync('lawyer', 8),
  password: 'lawyer',
  email: 'lawyer@demo.com',
  role_id: 2,
};

export const secretaryUser = {
  id: 4,
  name: 'Scretary',
  password_hash: bcrypt.hashSync('secretary', 8),
  password: 'secretary',
  email: 'secretary@demo.com',
  role_id: 3,
};

export const user1 = {
  id: 5,
  name: 'user 1',
  password_hash: bcrypt.hashSync('secretary', 8),
  password: 'secretary',
  email: 'user1testingsetup@demo.com',
  role_id: 2,
};

export const user2 = {
  id: 6,
  name: 'user 2',
  password_hash: bcrypt.hashSync('secretary', 8),
  password: 'secretary',
  email: 'user2testingsetup@demo.com',
  role_id: 2,
};

export const user3 = {
  id: 7,
  name: 'user 3',
  password_hash: bcrypt.hashSync('secretary', 8),
  password: 'secretary',
  email: 'user3testingsetup@demo.com',
  role_id: 2,
};
