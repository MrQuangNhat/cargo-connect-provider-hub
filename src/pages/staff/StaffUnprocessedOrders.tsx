
import StaffLayout from "@/components/staff/StaffLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Package, Truck, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StaffUnprocessedOrders = () => {
  const { toast } = useToast();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [containerSize, setContainerSize] = useState<string>("");

  // Mock data for LCL orders
  const lclOrders = [
    {
      id: "LCL001",
      from: "TP.HCM",
      to: "Hà Nội",
      containerType: "Dry",
      customerName: "Nguyễn Văn A",
      customerPhone: "0123456789",
      length: 2,
      width: 1.5,
      height: 1.2,
      weight: 500,
      volume: 3.6,
      createdAt: "2024-01-15",
    },
    {
      id: "LCL002",
      from: "TP.HCM",
      to: "Hà Nội",
      containerType: "Dry",
      customerName: "Trần Thị B",
      customerPhone: "0987654321",
      length: 1.8,
      width: 1.2,
      height: 1,
      weight: 300,
      volume: 2.16,
      createdAt: "2024-01-15",
    },
    {
      id: "LCL003",
      from: "TP.HCM",
      to: "Đà Nẵng",
      containerType: "Reefer",
      customerName: "Lê Văn C",
      customerPhone: "0345678901",
      length: 1.5,
      width: 1,
      height: 0.8,
      weight: 200,
      volume: 1.2,
      createdAt: "2024-01-16",
    },
  ];

  const containerSizes = {
    "20ft": { volume: 33, maxWeight: 21600 },
    "40ft": { volume: 67, maxWeight: 26700 },
    "40ft-HC": { volume: 76, maxWeight: 26700 },
  };

  const handleOrderSelection = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  const getSelectedOrdersInfo = () => {
    const selected = lclOrders.filter(order => selectedOrders.includes(order.id));
    const totalVolume = selected.reduce((sum, order) => sum + order.volume, 0);
    const totalWeight = selected.reduce((sum, order) => sum + order.weight, 0);
    return { selected, totalVolume, totalWeight };
  };

  const checkContainerCapacity = () => {
    if (!containerSize) return { volumeOk: false, weightOk: false };
    const { totalVolume, totalWeight } = getSelectedOrdersInfo();
    const capacity = containerSizes[containerSize as keyof typeof containerSizes];
    
    return {
      volumeOk: totalVolume <= capacity.volume,
      weightOk: totalWeight <= capacity.maxWeight,
    };
  };

  const handleGroupOrders = () => {
    const { volumeOk, weightOk } = checkContainerCapacity();
    
    if (!volumeOk || !weightOk) {
      toast({
        title: "Cảnh báo",
        description: "Container không đủ chứa các đơn đã chọn. Vui lòng chọn container lớn hơn hoặc bỏ bớt đơn.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thành công",
      description: `Đã ghép ${selectedOrders.length} đơn LCL thành đơn FCL thành công!`,
    });
    
    // Reset selection
    setSelectedOrders([]);
    setContainerSize("");
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Đơn chưa xử lý</h1>
            <p className="text-muted-foreground">Ghép các đơn LCL cùng tuyến thành đơn FCL</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700" disabled={selectedOrders.length === 0}>
                <Package className="w-4 h-4 mr-2" />
                Ghép đơn ({selectedOrders.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Ghép đơn LCL thành FCL</DialogTitle>
                <DialogDescription>
                  Xem lại thông tin các đơn và chọn container phù hợp
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Thông tin tổng hợp</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Số đơn:</span>
                          <span className="font-semibold">{selectedOrders.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tổng thể tích:</span>
                          <span className="font-semibold">{getSelectedOrdersInfo().totalVolume.toFixed(2)} m³</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tổng trọng lượng:</span>
                          <span className="font-semibold">{getSelectedOrdersInfo().totalWeight} kg</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Chọn container</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Select value={containerSize} onValueChange={setContainerSize}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kích thước container" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="20ft">20ft (33m³, 21.6 tấn)</SelectItem>
                            <SelectItem value="40ft">40ft (67m³, 26.7 tấn)</SelectItem>
                            <SelectItem value="40ft-HC">40ft HC (76m³, 26.7 tấn)</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {containerSize && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant={checkContainerCapacity().volumeOk ? "default" : "destructive"}>
                                Thể tích: {checkContainerCapacity().volumeOk ? "OK" : "Vượt quá"}
                              </Badge>
                              <Badge variant={checkContainerCapacity().weightOk ? "default" : "destructive"}>
                                Trọng lượng: {checkContainerCapacity().weightOk ? "OK" : "Vượt quá"}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedOrders([])}>
                    Hủy
                  </Button>
                  <Button onClick={handleGroupOrders} className="bg-purple-600 hover:bg-purple-700">
                    Xác nhận ghép đơn
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn LCL chờ xử lý</CardTitle>
            <CardDescription>
              Chọn các đơn có cùng tuyến và loại container để ghép thành đơn FCL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Chọn</TableHead>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Loại container</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Kích thước (L×W×H)</TableHead>
                  <TableHead>Thể tích</TableHead>
                  <TableHead>Trọng lượng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lclOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={(checked) => handleOrderSelection(order.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.from} → {order.to}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.containerType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.length}×{order.width}×{order.height}m</TableCell>
                    <TableCell>{order.volume}m³</TableCell>
                    <TableCell>{order.weight}kg</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
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

export default StaffUnprocessedOrders;
