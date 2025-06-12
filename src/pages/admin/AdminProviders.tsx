
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye, Truck, Package } from "lucide-react";

interface Provider {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  totalVehicles: number;
  activeOrders: number;
  completedOrders: number;
  status: "active" | "inactive";
  createdAt: string;
}

interface Vehicle {
  id: string;
  licensePlate: string;
  type: string;
  capacity: string;
  driver: string;
  status: "available" | "busy" | "maintenance";
  lastUpdated: string;
}

interface Order {
  id: string;
  customerName: string;
  pickupLocation: string;
  deliveryLocation: string;
  containerType: string;
  status: string;
  assignedAt: string;
  price: number;
}

const AdminProviders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isVehiclesDialogOpen, setIsVehiclesDialogOpen] = useState(false);
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);

  const [providers] = useState<Provider[]>([
    {
      id: 1,
      name: "Provider ABC",
      email: "abc@transport.com",
      phone: "0987654321",
      company: "ABC Transport Co.",
      totalVehicles: 15,
      activeOrders: 5,
      completedOrders: 120,
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "XYZ Logistics",
      email: "contact@xyz.com",
      phone: "0912345678",
      company: "XYZ Logistics Ltd.",
      totalVehicles: 8,
      activeOrders: 3,
      completedOrders: 85,
      status: "active",
      createdAt: "2024-02-10"
    },
    {
      id: 3,
      name: "DEF Transport",
      email: "info@def.com",
      phone: "0909123456",
      company: "DEF Transport Inc.",
      totalVehicles: 12,
      activeOrders: 0,
      completedOrders: 45,
      status: "inactive",
      createdAt: "2024-01-05"
    }
  ]);

  const [providerVehicles] = useState<Vehicle[]>([
    {
      id: "VH-001",
      licensePlate: "29A-12345",
      type: "Container Truck",
      capacity: "20ft",
      driver: "Nguyễn Văn X",
      status: "available",
      lastUpdated: "2024-03-05"
    },
    {
      id: "VH-002",
      licensePlate: "30B-67890",
      type: "Container Truck",
      capacity: "40ft",
      driver: "Trần Văn Y",
      status: "busy",
      lastUpdated: "2024-03-04"
    },
    {
      id: "VH-003",
      licensePlate: "51C-11111",
      type: "Container Truck",
      capacity: "20ft",
      driver: "Lê Văn Z",
      status: "maintenance",
      lastUpdated: "2024-03-03"
    }
  ]);

  const [providerOrders] = useState<Order[]>([
    {
      id: "ORD-401",
      customerName: "Công ty ABC",
      pickupLocation: "Hà Nội",
      deliveryLocation: "TP.HCM",
      containerType: "FCL",
      status: "in_transit",
      assignedAt: "2024-03-01",
      price: 15000000
    },
    {
      id: "ORD-402",
      customerName: "XYZ Corp",
      pickupLocation: "Đà Nẵng",
      deliveryLocation: "Hải Phòng",
      containerType: "LCL",
      status: "completed",
      assignedAt: "2024-02-28",
      price: 8000000
    }
  ]);

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsDetailDialogOpen(true);
  };

  const handleViewVehicles = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsVehiclesDialogOpen(true);
  };

  const handleViewOrders = (provider: Provider) => {
    setSelectedProvider(provider);
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

  const getVehicleStatusBadge = (status: string) => {
    const colors = {
      available: "bg-green-100 text-green-700",
      busy: "bg-yellow-100 text-yellow-700",
      maintenance: "bg-red-100 text-red-700"
    };
    const labels = {
      available: "Sẵn sàng",
      busy: "Đang bận",
      maintenance: "Bảo trì"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getOrderStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      in_transit: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700"
    };
    const labels = {
      pending: "Chờ xử lý",
      confirmed: "Đã xác nhận",
      in_transit: "Đang vận chuyển",
      completed: "Hoàn thành"
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
          <h1 className="text-3xl font-bold">Quản lý đơn vị vận tải</h1>
          <p className="text-muted-foreground">
            Xem thông tin, xe và đơn hàng của các đơn vị vận tải
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn vị vận tải</CardTitle>
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
                  <TableHead>Tên đơn vị</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead>Công ty</TableHead>
                  <TableHead>Tổng xe</TableHead>
                  <TableHead>Đơn đang chạy</TableHead>
                  <TableHead>Đơn hoàn thành</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.name}</TableCell>
                    <TableCell>{provider.email}</TableCell>
                    <TableCell>{provider.phone}</TableCell>
                    <TableCell>{provider.company}</TableCell>
                    <TableCell>{provider.totalVehicles}</TableCell>
                    <TableCell>{provider.activeOrders}</TableCell>
                    <TableCell>{provider.completedOrders}</TableCell>
                    <TableCell>{getStatusBadge(provider.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewProvider(provider)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewVehicles(provider)}
                        >
                          <Truck className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewOrders(provider)}
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

        {/* Provider Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thông tin đơn vị vận tải</DialogTitle>
            </DialogHeader>
            {selectedProvider && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tên đơn vị</label>
                  <p className="text-sm text-gray-600">{selectedProvider.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-gray-600">{selectedProvider.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Điện thoại</label>
                  <p className="text-sm text-gray-600">{selectedProvider.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Công ty</label>
                  <p className="text-sm text-gray-600">{selectedProvider.company}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Tổng xe</label>
                    <p className="text-sm text-gray-600">{selectedProvider.totalVehicles}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Đang chạy</label>
                    <p className="text-sm text-gray-600">{selectedProvider.activeOrders}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hoàn thành</label>
                    <p className="text-sm text-gray-600">{selectedProvider.completedOrders}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Trạng thái</label>
                  <div className="mt-1">{getStatusBadge(selectedProvider.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày tạo</label>
                  <p className="text-sm text-gray-600">{selectedProvider.createdAt}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Provider Vehicles Dialog */}
        <Dialog open={isVehiclesDialogOpen} onOpenChange={setIsVehiclesDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Danh sách xe của {selectedProvider?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã xe</TableHead>
                    <TableHead>Biển số</TableHead>
                    <TableHead>Loại xe</TableHead>
                    <TableHead>Tải trọng</TableHead>
                    <TableHead>Tài xế</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Cập nhật cuối</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providerVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.id}</TableCell>
                      <TableCell>{vehicle.licensePlate}</TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell>{vehicle.capacity}</TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>{getVehicleStatusBadge(vehicle.status)}</TableCell>
                      <TableCell>{vehicle.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>

        {/* Provider Orders Dialog */}
        <Dialog open={isOrdersDialogOpen} onOpenChange={setIsOrdersDialogOpen}>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>Đơn hàng của {selectedProvider?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Điểm đón</TableHead>
                    <TableHead>Điểm giao</TableHead>
                    <TableHead>Loại container</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Giá tiền</TableHead>
                    <TableHead>Ngày giao việc</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providerOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.pickupLocation}</TableCell>
                      <TableCell>{order.deliveryLocation}</TableCell>
                      <TableCell>{order.containerType}</TableCell>
                      <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.price.toLocaleString()} VNĐ</TableCell>
                      <TableCell>{order.assignedAt}</TableCell>
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

export default AdminProviders;
