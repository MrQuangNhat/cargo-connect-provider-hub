
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, UserCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Tổng người dùng",
      value: "124",
      description: "Khách hàng, Provider, Staff",
      icon: Users,
      href: "/admin/users"
    },
    {
      title: "Bảng giá",
      value: "8",
      description: "Loại container đang có giá",
      icon: DollarSign,
      href: "/admin/pricing"
    },
    {
      title: "Staff hoạt động",
      value: "12",
      description: "Nhân viên đang làm việc",
      icon: UserCheck,
      href: "/admin/users"
    },
    {
      title: "Provider",
      value: "45",
      description: "Đơn vị vận tải",
      icon: Truck,
      href: "/admin/users"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Quản lý hệ thống vận tải container
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
              <CardDescription>
                Các thay đổi trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Provider ABC được thêm</p>
                  <p className="text-gray-500">2 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Cập nhật bảng giá container 20ft</p>
                  <p className="text-gray-500">4 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Staff mới được tạo tài khoản</p>
                  <p className="text-gray-500">1 ngày trước</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thống kê nhanh</CardTitle>
              <CardDescription>
                Tổng quan hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Đơn hàng hôm nay</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Doanh thu tháng</span>
                <span className="font-medium">1.2 tỷ VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Provider hoạt động</span>
                <span className="font-medium">42/45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Tỉ lệ hoàn thành</span>
                <span className="font-medium">98.5%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
