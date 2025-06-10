
import ProviderLayout from "@/components/provider/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Calendar, Users } from "lucide-react";

const stats = [
  {
    name: "Tổng xe",
    value: "12",
    icon: Truck,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "Đơn hàng hôm nay",
    value: "8",
    icon: Package,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    name: "Xe đang hoạt động",
    value: "9",
    icon: Calendar,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    name: "Đơn chờ xác nhận",
    value: "3",
    icon: Users,
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
];

const recentOrders = [
  {
    id: "ORD001",
    from: "TP.HCM",
    to: "Hà Nội",
    containerType: "40HC",
    status: "Chờ xác nhận",
    customer: "Công ty ABC"
  },
  {
    id: "ORD002", 
    from: "Đà Nẵng",
    to: "TP.HCM",
    containerType: "20GP",
    status: "Đang vận chuyển",
    customer: "Công ty XYZ"
  },
  {
    id: "ORD003",
    from: "Hải Phòng",
    to: "Cần Thơ",
    containerType: "40GP",
    status: "Chờ thanh toán",
    customer: "Công ty DEF"
  }
];

export default function ProviderDashboard() {
  return (
    <ProviderLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Tổng quan hoạt động vận tải</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Mã đơn</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Từ</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Đến</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Loại container</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Khách hàng</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{order.from}</td>
                      <td className="py-3 px-4">{order.to}</td>
                      <td className="py-3 px-4">{order.containerType}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Chờ xác nhận" ? "bg-yellow-100 text-yellow-800" :
                          order.status === "Đang vận chuyển" ? "bg-blue-100 text-blue-800" :
                          order.status === "Chờ thanh toán" ? "bg-red-100 text-red-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
}
