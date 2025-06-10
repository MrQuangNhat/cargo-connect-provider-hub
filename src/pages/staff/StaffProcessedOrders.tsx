
import StaffLayout from "@/components/staff/StaffLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Package, Truck } from "lucide-react";

const StaffProcessedOrders = () => {
  // Mock data for processed FCL orders
  const processedOrders = [
    {
      id: "FCL001",
      from: "TP.HCM",
      to: "Hà Nội",
      containerType: "Dry",
      containerSize: "40ft",
      providerName: "Công ty TNHH ABC",
      status: "Đang vận chuyển",
      createdAt: "2024-01-15",
      lclOrders: [
        {
          id: "LCL001",
          customerName: "Nguyễn Văn A",
          customerPhone: "0123456789",
          volume: 3.6,
          weight: 500,
          priceRatio: 0.6,
          price: 3600000,
        },
        {
          id: "LCL002",
          customerName: "Trần Thị B",
          customerPhone: "0987654321",
          volume: 2.4,
          weight: 300,
          priceRatio: 0.4,
          price: 2400000,
        },
      ],
      totalPrice: 6000000,
    },
    {
      id: "FCL002",
      from: "TP.HCM",
      to: "Đà Nẵng",
      containerType: "Reefer",
      containerSize: "20ft",
      providerName: "Công ty TNHH XYZ",
      status: "Hoàn thành",
      createdAt: "2024-01-14",
      lclOrders: [
        {
          id: "LCL003",
          customerName: "Lê Văn C",
          customerPhone: "0345678901",
          volume: 1.2,
          weight: 200,
          priceRatio: 1.0,
          price: 4500000,
        },
      ],
      totalPrice: 4500000,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang vận chuyển":
        return <Badge className="bg-blue-100 text-blue-800">Đang vận chuyển</Badge>;
      case "Hoàn thành":
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case "Chờ thanh toán":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ thanh toán</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Đơn đã xử lý</h1>
          <p className="text-muted-foreground">Danh sách các đơn FCL đã được ghép và xử lý</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn FCL đã xử lý</CardTitle>
            <CardDescription>
              Các đơn LCL đã được ghép thành đơn FCL và giao cho đơn vị vận tải
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn FCL</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Container</TableHead>
                  <TableHead>Đơn vị vận tải</TableHead>
                  <TableHead>Số đơn LCL</TableHead>
                  <TableHead>Tổng giá trị</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.from} → {order.to}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.containerSize}</div>
                        <div className="text-sm text-muted-foreground">{order.containerType}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.providerName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.lclOrders.length} đơn</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.totalPrice.toLocaleString('vi-VN')} VNĐ
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Chi tiết đơn FCL - {order.id}</DialogTitle>
                            <DialogDescription>
                              Thông tin chi tiết về đơn FCL và các đơn LCL được ghép
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* FCL Order Info */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                  <Truck className="w-5 h-5 mr-2" />
                                  Thông tin đơn FCL
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>Mã đơn:</strong> {order.id}
                                  </div>
                                  <div>
                                    <strong>Tuyến đường:</strong> {order.from} → {order.to}
                                  </div>
                                  <div>
                                    <strong>Container:</strong> {order.containerSize} ({order.containerType})
                                  </div>
                                  <div>
                                    <strong>Đơn vị vận tải:</strong> {order.providerName}
                                  </div>
                                  <div>
                                    <strong>Trạng thái:</strong> {getStatusBadge(order.status)}
                                  </div>
                                  <div>
                                    <strong>Ngày tạo:</strong> {order.createdAt}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* LCL Orders */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                  <Package className="w-5 h-5 mr-2" />
                                  Các đơn LCL được ghép
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Mã đơn LCL</TableHead>
                                      <TableHead>Khách hàng</TableHead>
                                      <TableHead>SĐT</TableHead>
                                      <TableHead>Thể tích</TableHead>
                                      <TableHead>Trọng lượng</TableHead>
                                      <TableHead>Tỷ lệ (%)</TableHead>
                                      <TableHead>Giá tiền</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {order.lclOrders.map((lclOrder) => (
                                      <TableRow key={lclOrder.id}>
                                        <TableCell className="font-medium">{lclOrder.id}</TableCell>
                                        <TableCell>{lclOrder.customerName}</TableCell>
                                        <TableCell>{lclOrder.customerPhone}</TableCell>
                                        <TableCell>{lclOrder.volume}m³</TableCell>
                                        <TableCell>{lclOrder.weight}kg</TableCell>
                                        <TableCell>{(lclOrder.priceRatio * 100).toFixed(1)}%</TableCell>
                                        <TableCell className="font-medium">
                                          {lclOrder.price.toLocaleString('vi-VN')} VNĐ
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                    <TableRow className="bg-muted/50">
                                      <TableCell colSpan={6} className="font-medium text-right">
                                        Tổng cộng:
                                      </TableCell>
                                      <TableCell className="font-bold">
                                        {order.totalPrice.toLocaleString('vi-VN')} VNĐ
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </CardContent>
                            </Card>
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

export default StaffProcessedOrders;
