import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { IUser } from '../../../shared/src/types/user';
import { Mail, Shield, User as UserIcon } from 'lucide-react';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/auth/users');
        setUsers(response.data.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-lg">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Team Management</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Manage your sales team and view active accounts.</p>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">User</th>
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Email</th>
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Role</th>
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-gutter py-4"><div className="h-10 w-40 bg-surface-variant rounded"></div></td>
                    <td className="px-md py-4"><div className="h-4 w-48 bg-surface-variant rounded"></div></td>
                    <td className="px-md py-4"><div className="h-6 w-20 bg-surface-variant rounded-full"></div></td>
                    <td className="px-md py-4"><div className="h-4 w-24 bg-surface-variant rounded"></div></td>
                  </tr>
                ))
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="px-gutter py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <div className="font-label-md text-label-md text-on-surface">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-md py-4">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <Mail className="w-4 h-4" />
                        <span className="font-body-md text-body-md">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-md py-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'Admin' ? (
                          <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Admin
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                            Sales
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
