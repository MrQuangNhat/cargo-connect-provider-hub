
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Eye, Package } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  totalOrders: number;
  status: "active" | "inactive";
  createdAt: string;
}

interface Order {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  containerType: string;
  containerSize: string;
  status: string;
  createdAt: string;
  price: number;
}

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);

  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: "Công ty ABC",
      email: "abc@company.com",
      phone: "0987654321",
      company: "ABC Corporation",
      totalOrders: 15,
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0912345678",
      company: "XYZ Ltd",
      totalOrders: 8,
      status: "active",
      createdAt: "2024-02-10"
    },
    {
      id: 3,
      name: "Công ty DEF",
      email: "def@company.com",
      phone: "0909123456",
      company: "DEF Industries",
      totalOrders: 23,
      status: "inactive",
      createdAt: "2024-01-05"
    }
  ]);

  const [customerOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      pickupLocation: "Hà Nội",
      deliveryLocation: "TP.HCM",
      containerType: "FCL",
      containerSize: "20ft",
      status: "completed",
      createdAt: "2024-03-01",
      price: 15000000
    },
    {
      id: "ORD-002",
      pickupLocation: "Đà Nẵng",
      deliveryLocation: "Hải Phòng",
      containerType: "LCL",
      containerSize: "40ft",
      status: "in_transit",
      createdAt: "2024-03-05",
      price: 8000000
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailDialogOpen(true);
  };

  const handleViewOrders = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsOrdersDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700"
    };
    const statusLabels = {
      active: "Hoạt động",
      inactive: "Ngừng hoạt động"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getOrderStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      in_transit: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };
    const labels = {
      pending: "Chờ xử lý",
      confirmed: "Đã xác nhận",
      in_transit: "Đang vận chuyển",
      completed: "Hoàn thành",
      cancelled: "Đã hủy"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý khách hàng</h1>
          <p className="text-muted-foreground">
            Xem thông tin và quản lý đơn hàng của khách hàng
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách khách hàng</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, email hoặc công ty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên khách hàng</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead>Công ty</TableHead>
                  <TableHead>Tổng đơn hàng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.company}</TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>{customer.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewCustomer(customer)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewOrders(customer)}
                        >
                          <Package className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Customer Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thông tin khách hàng</DialogTitle>
            </DialogHeader>
            {selectedCustomer && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tên khách hàng</label>
                  <p className="text-sm text-gray-600">{selectedCustomer.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Điện thoại</label>
                  <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Công ty</label>
                  <p className="text-sm text-gray-600">{selectedCustomer.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Tổng đơn hàng</label>
                  <p className="text-sm text-gray-600">{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Trạng thái</label>
                  <div className="mt-1">{getStatusBadge(selectedCustomer.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày tạo</label>
                  <p className="text-sm text-gray-600">{selectedCustomer.createdAt}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Customer Orders Dialog */}
        <Dialog open={isOrdersDialogOpen} onOpenChange={setIsOrdersDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Đơn hàng của {selectedCustomer?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Điểm đón</TableHead>
                    <TableHead>Điểm giao</TableHead>
                    <TableHead>Loại container</TableHead>
                    <TableHead>Kích thước</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Giá tiền</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.pickupLocation}</TableCell>
                      <TableCell>{order.deliveryLocation}</TableCell>
                      <TableCell>{order.containerType}</TableCell>
                      <TableCell>{order.containerSize}</TableCell>
                      <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.price.toLocaleString()} VNĐ</TableCell>
                      <TableCell>{order.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
