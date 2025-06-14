
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Filter } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  providerName: string;
  staffName?: string;
  pickupLocation: string;
  deliveryLocation: string;
  containerType: string;
  containerSize: string;
  price: number;
  status: "pending" | "confirmed" | "pending_payment" | "in_transit" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  assignedVehicle?: string;
  estimatedDelivery?: string;
}

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Công ty ABC",
      customerEmail: "abc@company.com",
      providerName: "Provider ABC",
      staffName: "Staff XYZ",
      pickupLocation: "Hà Nội",
      deliveryLocation: "TP.HCM",
      containerType: "FCL",
      containerSize: "20ft",
      price: 15000000,
      status: "in_transit",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-02",
      assignedVehicle: "29A-12345",
      estimatedDelivery: "2024-03-05"
    },
    {
      id: "ORD-002",
      customerName: "XYZ Corp",
      customerEmail: "contact@xyz.com",
      providerName: "XYZ Logistics",
      staffName: "Staff ABC",
      pickupLocation: "Đà Nẵng",
      deliveryLocation: "Hải Phòng",
      containerType: "LCL",
      containerSize: "40ft",
      price: 8000000,
      status: "completed",
      createdAt: "2024-02-28",
      updatedAt: "2024-03-01",
      assignedVehicle: "30B-67890",
      estimatedDelivery: "2024-03-04"
    },
    {
      id: "ORD-003",
      customerName: "DEF Ltd",
      customerEmail: "info@def.com",
      providerName: "DEF Transport",
      pickupLocation: "Cần Thơ",
      deliveryLocation: "Hà Nội",
      containerType: "FCL",
      containerSize: "20ft",
      price: 12000000,
      status: "pending",
      createdAt: "2024-02-25",
      updatedAt: "2024-02-25"
    },
    {
      id: "ORD-004",
      customerName: "GHI Company",
      customerEmail: "admin@ghi.com",
      providerName: "Provider ABC",
      staffName: "Staff DEF",
      pickupLocation: "Hà Nội",
      deliveryLocation: "Đà Nẵng",
      containerType: "LCL",
      containerSize: "20ft",
      price: 9000000,
      status: "confirmed",
      createdAt: "2024-03-03",
      updatedAt: "2024-03-03"
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-gray-100 text-gray-700",
      confirmed: "bg-blue-100 text-blue-700",
      pending_payment: "bg-yellow-100 text-yellow-700",
      in_transit: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };
    const statusLabels = {
      pending: "Chờ xử lý",
      confirmed: "Đã xác nhận",
      pending_payment: "Chờ thanh toán",
      in_transit: "Đang vận chuyển",
      completed: "Hoàn thành",
      cancelled: "Đã hủy"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý đơn vận</h1>
          <p className="text-muted-foreground">
            Xem và quản lý tất cả các đơn vận trong hệ thống
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn vận</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn, khách hàng, nhà cung cấp..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Lọc theo trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    <SelectItem value="pending_payment">Chờ thanh toán</SelectItem>
                    <SelectItem value="in_transit">Đang vận chuyển</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Đơn vị vận tải</TableHead>
                  <TableHead>Nhân viên xử lý</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Container</TableHead>
                  <TableHead>Giá tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.providerName}</TableCell>
                    <TableCell>{order.staffName || "Chưa phân công"}</TableCell>
                    <TableCell>{order.pickupLocation} → {order.deliveryLocation}</TableCell>
                    <TableCell>{order.containerType} - {order.containerSize}</TableCell>
                    <TableCell>{order.price.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Order Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi tiết đơn vận</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Thông tin đơn hàng</h3>
                    <div>
                      <label className="text-sm font-medium">Mã đơn</label>
                      <p className="text-sm text-gray-600">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Trạng thái</label>
                      <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Ngày tạo</label>
                      <p className="text-sm text-gray-600">{selectedOrder.createdAt}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Cập nhật cuối</label>
                      <p className="text-sm text-gray-600">{selectedOrder.updatedAt}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Thông tin khách hàng</h3>
                    <div>
                      <label className="text-sm font-medium">Tên khách hàng</label>
                      <p className="text-sm text-gray-600">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-gray-600">{selectedOrder.customerEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Thông tin vận chuyển</h3>
                    <div>
                      <label className="text-sm font-medium">Điểm đón</label>
                      <p className="text-sm text-gray-600">{selectedOrder.pickupLocation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Điểm giao</label>
                      <p className="text-sm text-gray-600">{selectedOrder.deliveryLocation}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Loại container</label>
                        <p className="text-sm text-gray-600">{selectedOrder.containerType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Kích thước</label>
                        <p className="text-sm text-gray-600">{selectedOrder.containerSize}</p>
                      </div>
                    </div>
                    {selectedOrder.assignedVehicle && (
                      <div>
                        <label className="text-sm font-medium">Xe được giao</label>
                        <p className="text-sm text-gray-600">{selectedOrder.assignedVehicle}</p>
                      </div>
                    )}
                    {selectedOrder.estimatedDelivery && (
                      <div>
                        <label className="text-sm font-medium">Dự kiến giao hàng</label>
                        <p className="text-sm text-gray-600">{selectedOrder.estimatedDelivery}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Thông tin xử lý</h3>
                    <div>
                      <label className="text-sm font-medium">Đơn vị vận tải</label>
                      <p className="text-sm text-gray-600">{selectedOrder.providerName}</p>
                    </div>
                    {selectedOrder.staffName && (
                      <div>
                        <label className="text-sm font-medium">Nhân viên xử lý</label>
                        <p className="text-sm text-gray-600">{selectedOrder.staffName}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium">Giá tiền</label>
                      <p className="text-sm text-gray-600 text-lg font-semibold">{selectedOrder.price.toLocaleString()} VNĐ</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
