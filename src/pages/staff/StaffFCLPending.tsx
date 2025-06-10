
import StaffLayout from "@/components/staff/StaffLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Truck, Package, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StaffFCLPending = () => {
  const { toast } = useToast();
  const [selectedFCLOrder, setSelectedFCLOrder] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [orderPrices, setOrderPrices] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Mock data for FCL orders (grouped from LCL orders)
  const fclOrders = [
    {
      id: "FCL001",
      from: "TP.HCM",
      to: "Hà Nội",
      containerType: "Dry",
      containerSize: "40ft",
      totalVolume: 5.76,
      totalWeight: 800,
      lclOrders: [
        { id: "LCL001", customerName: "Nguyễn Văn A", volume: 3.6, weight: 500 },
        { id: "LCL002", customerName: "Trần Thị B", volume: 2.16, weight: 300 },
      ],
      createdAt: "2024-01-15",
      status: "pending"
    },
    {
      id: "FCL002",
      from: "TP.HCM",
      to: "Đà Nẵng",
      containerType: "Reefer",
      containerSize: "20ft",
      totalVolume: 1.2,
      totalWeight: 200,
      lclOrders: [
        { id: "LCL003", customerName: "Lê Văn C", volume: 1.2, weight: 200 },
      ],
      createdAt: "2024-01-16",
      status: "pending"
    },
  ];

  // Mock data for transport providers
  const providers = [
    {
      id: "PROV001",
      name: "Công ty TNHH Vận tải ABC",
      rating: 4.8,
      vehicleCount: 25,
      pricePerKm: 15000,
    },
    {
      id: "PROV002", 
      name: "Vận tải XYZ Express",
      rating: 4.6,
      vehicleCount: 18,
      pricePerKm: 14500,
    },
    {
      id: "PROV003",
      name: "Container Transport Co.",
      rating: 4.9,
      vehicleCount: 30,
      pricePerKm: 16000,
    },
  ];

  const selectedFCLData = fclOrders.find(order => order.id === selectedFCLOrder);

  const calculateVolumeRatio = (orderVolume: number, totalVolume: number) => {
    return ((orderVolume / totalVolume) * 100).toFixed(1);
  };

  const handlePriceChange = (orderId: string, price: number) => {
    setOrderPrices(prev => ({ ...prev, [orderId]: price }));
  };

  const handleConfirmOrder = () => {
    if (!selectedProvider || !selectedFCLData) return;

    const allPricesEntered = selectedFCLData.lclOrders.every(order => 
      orderPrices[order.id] && orderPrices[order.id] > 0
    );

    if (!allPricesEntered || totalPrice <= 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ giá cho tất cả đơn hàng và tổng giá",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thành công",
      description: "Đơn FCL đã được gửi thành công!",
    });

    // Reset states
    setSelectedFCLOrder(null);
    setSelectedProvider(null);
    setOrderPrices({});
    setTotalPrice(0);
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Đơn FCL chờ xử lý</h1>
          <p className="text-muted-foreground">Chọn đơn vị vận tải và xác định giá cho các đơn FCL đã ghép</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn FCL chờ xử lý</CardTitle>
            <CardDescription>
              Các đơn FCL đã được ghép từ đơn LCL và cần chọn đơn vị vận tải
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn FCL</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Loại container</TableHead>
                  <TableHead>Kích thước</TableHead>
                  <TableHead>Số đơn LCL</TableHead>
                  <TableHead>Thể tích</TableHead>
                  <TableHead>Trọng lượng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fclOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.from} → {order.to}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.containerType}</Badge>
                    </TableCell>
                    <TableCell>{order.containerSize}</TableCell>
                    <TableCell>{order.lclOrders.length} đơn</TableCell>
                    <TableCell>{order.totalVolume}m³</TableCell>
                    <TableCell>{order.totalWeight}kg</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => setSelectedFCLOrder(order.id)}
                          >
                            Xử lý
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Xử lý đơn FCL: {order.id}</DialogTitle>
                            <DialogDescription>
                              Chọn đơn vị vận tải và nhập giá cho các đơn LCL
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left side - LCL Orders Details */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Chi tiết đơn LCL</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {order.lclOrders.map((lclOrder) => (
                                    <div key={lclOrder.id} className="border rounded-lg p-4">
                                      <div className="flex justify-between items-start mb-3">
                                        <div>
                                          <h4 className="font-medium">{lclOrder.id}</h4>
                                          <p className="text-sm text-muted-foreground">{lclOrder.customerName}</p>
                                        </div>
                                        <Badge variant="secondary">
                                          {calculateVolumeRatio(lclOrder.volume, order.totalVolume)}%
                                        </Badge>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="text-muted-foreground">Thể tích:</span>
                                          <span className="ml-2 font-medium">{lclOrder.volume}m³</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Trọng lượng:</span>
                                          <span className="ml-2 font-medium">{lclOrder.weight}kg</span>
                                        </div>
                                      </div>
                                      <div className="mt-3">
                                        <Label htmlFor={`price-${lclOrder.id}`}>Giá đơn hàng (VNĐ)</Label>
                                        <Input
                                          id={`price-${lclOrder.id}`}
                                          type="number"
                                          placeholder="Nhập giá..."
                                          value={orderPrices[lclOrder.id] || ''}
                                          onChange={(e) => handlePriceChange(lclOrder.id, Number(e.target.value))}
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>

                            {/* Right side - Provider Selection */}
                            <div className="space-y-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Chọn đơn vị vận tải</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {providers.map((provider) => (
                                      <div 
                                        key={provider.id}
                                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                          selectedProvider === provider.id 
                                            ? "border-purple-500 bg-purple-50" 
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        onClick={() => setSelectedProvider(provider.id)}
                                      >
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <h4 className="font-medium">{provider.name}</h4>
                                            <div className="text-sm text-muted-foreground mt-1">
                                              <span>Rating: {provider.rating}⭐</span>
                                              <span className="ml-3">{provider.vehicleCount} xe</span>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <div className="font-medium">{provider.pricePerKm.toLocaleString()}đ/km</div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              {selectedProvider && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Giá tổng</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor="total-price">Tổng giá đơn FCL (VNĐ)</Label>
                                        <Input
                                          id="total-price"
                                          type="number"
                                          placeholder="Nhập tổng giá..."
                                          value={totalPrice || ''}
                                          onChange={(e) => setTotalPrice(Number(e.target.value))}
                                          className="mt-1"
                                        />
                                      </div>
                                      <div className="pt-4 border-t">
                                        <Button 
                                          className="w-full bg-purple-600 hover:bg-purple-700"
                                          onClick={handleConfirmOrder}
                                        >
                                          <DollarSign className="w-4 h-4 mr-2" />
                                          Xác nhận đơn hàng
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
};

export default StaffFCLPending;
