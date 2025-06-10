
import { useState } from "react";
import ProviderLayout from "@/components/provider/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const mockOrders = [
  {
    id: "ORD001",
    from: "TP.HCM",
    to: "Hà Nội", 
    containerType: "40HC",
    containerSize: "40",
    status: "pending_confirmation",
    customer: {
      name: "Công ty ABC",
      phone: "0123456789",
      email: "contact@abc.com"
    },
    vehicle: null,
    createdAt: "2024-06-10",
    price: 15000000
  },
  {
    id: "ORD002",
    from: "Đà Nẵng", 
    to: "TP.HCM",
    containerType: "20GP",
    containerSize: "20",
    status: "in_transit",
    customer: {
      name: "Công ty XYZ",
      phone: "0987654321", 
      email: "info@xyz.com"
    },
    vehicle: {
      licensePlate: "59B-67890",
      driverName: "Trần Văn C",
      driverPhone: "0123456789"
    },
    createdAt: "2024-06-09",
    price: 8000000
  },
  {
    id: "ORD003",
    from: "Hải Phòng",
    to: "Cần Thơ", 
    containerType: "40GP",
    containerSize: "40",
    status: "pending_payment",
    customer: {
      name: "Công ty DEF",
      phone: "0246810121",
      email: "support@def.com"
    },
    vehicle: {
      licensePlate: "51A-12345",
      driverName: "Nguyễn Văn B", 
      driverPhone: "0987654321"
    },
    createdAt: "2024-06-08",
    price: 12000000
  },
  {
    id: "ORD004",
    from: "TP.HCM",
    to: "Đà Nẵng",
    containerType: "20GP", 
    containerSize: "20",
    status: "completed",
    customer: {
      name: "Công ty GHI",
      phone: "0135792468",
      email: "order@ghi.com"
    },
    vehicle: {
      licensePlate: "59B-67890",
      driverName: "Trần Văn C",
      driverPhone: "0123456789"
    },
    createdAt: "2024-06-07",
    price: 7000000
  }
];

const mockAvailableVehicles = [
  {
    id: "1",
    licensePlate: "51A-12345",
    driverName: "Nguyễn Văn B",
    driverPhone: "0987654321",
    containerType: "40HC",
    containerSize: "40",
    currentLocation: "TP.HCM"
  },
  {
    id: "3", 
    licensePlate: "61C-11111",
    driverName: "Lê Văn D",
    driverPhone: "0111222333", 
    containerType: "40HC",
    containerSize: "40",
    currentLocation: "TP.HCM"
  }
];

export default function ProviderOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending_confirmation: { label: "Chờ xác nhận", className: "bg-yellow-100 text-yellow-800" },
      pending_payment: { label: "Chờ thanh toán", className: "bg-red-100 text-red-800" },
      in_transit: { label: "Đang vận chuyển", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Hoàn thành", className: "bg-green-100 text-green-800" }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return <Badge className={statusInfo.className}>{statusInfo.label}</Badge>;
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setSelectedVehicle("");
    setIsDialogOpen(true);
  };

  const handleConfirmOrder = () => {
    if (selectedOrder && selectedVehicle) {
      const vehicle = mockAvailableVehicles.find(v => v.id === selectedVehicle);
      if (vehicle) {
        setOrders(orders.map(order => 
          order.id === selectedOrder.id 
            ? { ...order, status: "pending_payment", vehicle }
            : order
        ));
        toast({
          title: "Thành công",
          description: "Đơn hàng đã được xác nhận và chuyển sang trạng thái chờ thanh toán",
        });
        setIsDialogOpen(false);
      }
    }
  };

  const getAvailableVehiclesForOrder = (order: any) => {
    return mockAvailableVehicles.filter(vehicle => 
      vehicle.containerType === order.containerType &&
      parseInt(vehicle.containerSize) >= parseInt(order.containerSize) &&
      vehicle.currentLocation === order.from
    );
  };

  return (
    <ProviderLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý đơn hàng</h1>
          <p className="text-muted-foreground">Theo dõi và quản lý các đơn vận chuyển</p>
        </div>

        <Tabs defaultValue="pending_confirmation" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending_confirmation">
              Chờ xác nhận ({getOrdersByStatus("pending_confirmation").length})
            </TabsTrigger>
            <TabsTrigger value="pending_payment">
              Chờ thanh toán ({getOrdersByStatus("pending_payment").length})
            </TabsTrigger>
            <TabsTrigger value="in_transit">
              Đang vận chuyển ({getOrdersByStatus("in_transit").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Hoàn thành ({getOrdersByStatus("completed").length})
            </TabsTrigger>
          </TabsList>

          {["pending_confirmation", "pending_payment", "in_transit", "completed"].map(status => (
            <TabsContent key={status} value={status}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {status === "pending_confirmation" && "Đơn hàng chờ xác nhận"}
                    {status === "pending_payment" && "Đơn hàng chờ thanh toán"} 
                    {status === "in_transit" && "Đơn hàng đang vận chuyển"}
                    {status === "completed" && "Đơn hàng đã hoàn thành"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getOrdersByStatus(status).map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {order.from} → {order.to}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(order.status)}
                            <Button size="sm" onClick={() => handleViewOrder(order)}>
                              Xem chi tiết
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Container</p>
                            <p className="font-medium">{order.containerType}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Khách hàng</p>
                            <p className="font-medium">{order.customer.name}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Giá</p>
                            <p className="font-medium">{order.price.toLocaleString()} VNĐ</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Ngày tạo</p>
                            <p className="font-medium">{order.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {getOrdersByStatus(status).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Không có đơn hàng nào
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi tiết đơn hàng {selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông tin đơn hàng</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Từ</p>
                        <p className="font-medium">{selectedOrder.from}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Đến</p>
                        <p className="font-medium">{selectedOrder.to}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Loại container</p>
                        <p className="font-medium">{selectedOrder.containerType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Kích thước</p>
                        <p className="font-medium">{selectedOrder.containerSize} feet</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Giá</p>
                        <p className="font-medium">{selectedOrder.price.toLocaleString()} VNĐ</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Trạng thái</p>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Thông tin khách hàng</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Tên</p>
                        <p className="font-medium">{selectedOrder.customer.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Số điện thoại</p>
                        <p className="font-medium">{selectedOrder.customer.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedOrder.customer.email}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedOrder.vehicle && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông tin xe</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Biển số</p>
                          <p className="font-medium">{selectedOrder.vehicle.licensePlate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tài xế</p>
                          <p className="font-medium">{selectedOrder.vehicle.driverName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">SĐT tài xế</p>
                          <p className="font-medium">{selectedOrder.vehicle.driverPhone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedOrder.status === "pending_confirmation" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Chọn xe để thực hiện đơn hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getAvailableVehiclesForOrder(selectedOrder).map((vehicle) => (
                          <div 
                            key={vehicle.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedVehicle === vehicle.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedVehicle(vehicle.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{vehicle.licensePlate}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {vehicle.driverName} - {vehicle.driverPhone}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {vehicle.containerType} - Vị trí: {vehicle.currentLocation}
                                </p>
                              </div>
                              <input
                                type="radio"
                                checked={selectedVehicle === vehicle.id}
                                onChange={() => setSelectedVehicle(vehicle.id)}
                                className="w-4 h-4"
                              />
                            </div>
                          </div>
                        ))}
                        
                        {getAvailableVehiclesForOrder(selectedOrder).length === 0 && (
                          <p className="text-center text-muted-foreground py-4">
                            Không có xe phù hợp
                          </p>
                        )}
                        
                        {selectedVehicle && (
                          <Button onClick={handleConfirmOrder} className="w-full">
                            Xác nhận và yêu cầu thanh toán
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProviderLayout>
  );
}
