
import { useState } from "react";
import ProviderLayout from "@/components/provider/ProviderLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Play, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customerName: string;
  pickupLocation: string;
  deliveryLocation: string;
  containerType: string;
  containerSize: string;
  price: number;
  status: "pending_payment" | "in_transit" | "completed" | "cancelled";
  createdAt: string;
  assignedVehicle?: string;
  estimatedDelivery?: string;
}

const ProviderOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Công ty ABC",
      pickupLocation: "Hà Nội",
      deliveryLocation: "TP.HCM",
      containerType: "FCL",
      containerSize: "20ft",
      price: 15000000,
      status: "pending_payment",
      createdAt: "2024-03-01",
      assignedVehicle: "29A-12345",
      estimatedDelivery: "2024-03-05"
    },
    {
      id: "ORD-002",
      customerName: "XYZ Corp",
      pickupLocation: "Đà Nẵng",
      deliveryLocation: "Hải Phòng",
      containerType: "LCL",
      containerSize: "40ft",
      price: 8000000,
      status: "in_transit",
      createdAt: "2024-02-28",
      assignedVehicle: "30B-67890",
      estimatedDelivery: "2024-03-04"
    },
    {
      id: "ORD-003",
      customerName: "DEF Ltd",
      pickupLocation: "Cần Thơ",
      deliveryLocation: "Hà Nội",
      containerType: "FCL",
      containerSize: "20ft",
      price: 12000000,
      status: "completed",
      createdAt: "2024-02-25",
      assignedVehicle: "51C-11111",
      estimatedDelivery: "2024-03-01"
    }
  ]);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const handleStartTransit = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: "in_transit" as const }
          : order
      )
    );
    toast({
      title: "Đã bắt đầu vận chuyển",
      description: `Đơn hàng ${orderId} đã được chuyển sang trạng thái đang vận chuyển.`,
    });
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: "completed" as const }
          : order
      )
    );
    toast({
      title: "Đã hoàn thành đơn hàng",
      description: `Đơn hàng ${orderId} đã được hoàn thành thành công.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending_payment: "bg-yellow-100 text-yellow-700",
      in_transit: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };
    const statusLabels = {
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
    <ProviderLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
          <p className="text-muted-foreground">
            Theo dõi và quản lý các đơn hàng được giao
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn hàng</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo mã đơn, khách hàng hoặc địa điểm..."
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
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Điểm đón</TableHead>
                  <TableHead>Điểm giao</TableHead>
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
                    <TableCell>{order.pickupLocation}</TableCell>
                    <TableCell>{order.deliveryLocation}</TableCell>
                    <TableCell>{order.containerType} - {order.containerSize}</TableCell>
                    <TableCell>{order.price.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {order.status === "pending_payment" && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleStartTransit(order.id)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Bắt đầu
                          </Button>
                        )}
                        {order.status === "in_transit" && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleCompleteOrder(order.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Hoàn thành
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Order Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Mã đơn</label>
                  <p className="text-sm text-gray-600">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Khách hàng</label>
                  <p className="text-sm text-gray-600">{selectedOrder.customerName}</p>
                </div>
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
                <div>
                  <label className="text-sm font-medium">Xe được giao</label>
                  <p className="text-sm text-gray-600">{selectedOrder.assignedVehicle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Dự kiến giao hàng</label>
                  <p className="text-sm text-gray-600">{selectedOrder.estimatedDelivery}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Giá tiền</label>
                  <p className="text-sm text-gray-600">{selectedOrder.price.toLocaleString()} VNĐ</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Trạng thái</label>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày tạo</label>
                  <p className="text-sm text-gray-600">{selectedOrder.createdAt}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProviderLayout>
  );
};

export default ProviderOrders;
