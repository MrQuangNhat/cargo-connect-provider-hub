
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "provider" | "staff" | "admin";
  phone: string;
  company?: string;
  department?: string; // cho staff
  status: "active" | "inactive";
  createdAt: string;
}

const initialUsers: User[] = [
  { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", role: "customer", phone: "0987654321", company: "Công ty ABC", status: "active", createdAt: "2024-01-15" },
  { id: 2, name: "Provider XYZ", email: "provider@xyz.com", role: "provider", phone: "0912345678", company: "XYZ Transport", status: "active", createdAt: "2024-01-10" },
  { id: 3, name: "Staff ABC", email: "staff@company.com", role: "staff", phone: "0909123456", department: "Logistics", status: "active", createdAt: "2024-01-20" },
  { id: 4, name: "Admin Root", email: "admin@system.com", role: "admin", phone: "0999999999", status: "active", createdAt: "2024-01-01" }
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "customer" | "provider" | "staff" | "admin">("all");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [formData, setFormData] = useState<Omit<User, "id" | "createdAt">>({
    name: "",
    email: "",
    role: "customer",
    phone: "",
    company: "",
    department: "",
    status: "active"
  });

  // Lọc user theo role và tìm kiếm
  const filteredUsers = users.filter(user =>
    (roleFilter === "all" || user.role === roleFilter) &&
    (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    )
  );

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      company: user.company || "",
      department: user.department || "",
      status: user.status
    });
    setIsEditDialogOpen(true);
  };

  const handleAddUser = () => {
    setFormData({
      name: "",
      email: "",
      role: "customer",
      phone: "",
      company: "",
      department: "",
      status: "active"
    });
    setIsAddDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      setUsers(users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...formData }
          : user
      ));
      setIsEditDialogOpen(false);
    } else {
      const newUser: User = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0]
      };
      setUsers([...users, newUser]);
      setIsAddDialogOpen(false);
    }
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-700",
      staff: "bg-purple-100 text-purple-700",
      provider: "bg-green-100 text-green-700",
      customer: "bg-blue-100 text-blue-700"
    };
    const labels = {
      admin: "Admin",
      staff: "Nhân viên",
      provider: "Đơn vị vận tải",
      customer: "Khách hàng"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role as keyof typeof colors]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  const getDetailFields = (user: User) => {
    switch (user.role) {
      case "customer":
        return (
          <>
            <div><Label>Công ty:</Label> <span>{user.company}</span></div>
          </>
        );
      case "provider":
        return (
          <>
            <div><Label>Công ty:</Label> <span>{user.company}</span></div>
          </>
        );
      case "staff":
        return (
          <>
            <div><Label>Phòng ban:</Label> <span>{user.department}</span></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
            <p className="text-muted-foreground">Xem, tìm kiếm, quản lý thông tin người dùng hệ thống</p>
          </div>
          <Button onClick={handleAddUser}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm người dùng
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Danh sách người dùng</CardTitle>
            <div className="flex gap-2 flex-wrap items-center">
              <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as typeof roleFilter)}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Loại tài khoản" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="customer">Khách hàng</SelectItem>
                  <SelectItem value="provider">Đơn vị vận tải</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên, email, công ty, phòng ban..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead>Công ty/Phòng ban</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {user.role === "staff"
                        ? (user.department || "-")
                        : (user.company || "-")
                      }
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {user.status === "active" ? "Hoạt động" : "Ngừng hoạt động"}
                      </span>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewUser(user)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* Dialog xem chi tiết user */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thông tin người dùng</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div><Label>Tên:</Label> <span>{selectedUser.name}</span></div>
                <div><Label>Email:</Label> <span>{selectedUser.email}</span></div>
                <div><Label>Điện thoại:</Label> <span>{selectedUser.phone}</span></div>
                <div><Label>Vai trò:</Label> <span>{getRoleBadge(selectedUser.role)}</span></div>
                {getDetailFields(selectedUser)}
                <div><Label>Trạng thái:</Label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedUser.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {selectedUser.status === "active" ? "Hoạt động" : "Ngừng hoạt động"}
                  </span>
                </div>
                <div><Label>Ngày tạo:</Label> <span>{selectedUser.createdAt}</span></div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        {/* Dialog sửa / thêm */}
        <Dialog open={isEditDialogOpen || isAddDialogOpen} onOpenChange={open => {
          setIsEditDialogOpen(false); setIsAddDialogOpen(false);
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditDialogOpen ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="role">Vai trò</Label>
                <Select value={formData.role} onValueChange={value => setFormData({ ...formData, role: value as User["role"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Khách hàng</SelectItem>
                    <SelectItem value="provider">Đơn vị vận tải</SelectItem>
                    <SelectItem value="staff">Nhân viên</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">Điện thoại</Label>
                <Input id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value })} />
              </div>
              {formData.role === "customer" || formData.role === "provider" ? (
                <div>
                  <Label htmlFor="company">Công ty</Label>
                  <Input id="company" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                </div>
              ) : formData.role === "staff" ? (
                <div>
                  <Label htmlFor="department">Phòng ban</Label>
                  <Input id="department" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                </div>
              ) : null}
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={formData.status} onValueChange={value => setFormData({ ...formData, status: value as User["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); setIsAddDialogOpen(false); }}>
                  Hủy
                </Button>
                <Button onClick={handleSaveUser}>
                  {isEditDialogOpen ? "Lưu thay đổi" : "Thêm người dùng"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
