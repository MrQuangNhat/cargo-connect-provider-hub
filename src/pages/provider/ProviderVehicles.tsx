
import { useState } from "react";
import ProviderLayout from "@/components/provider/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash, Truck } from "lucide-react";

const mockVehicles = [
  {
    id: "1",
    licensePlate: "51A-12345",
    driverName: "Nguyễn Văn B",
    driverPhone: "0987654321",
    driverIdentity: "123456789012",
    driverNote: "Tài xế kinh nghiệm 10 năm",
    containerType: "40HC",
    containerSize: "40",
    maxLoadKg: 28000,
    canLiftContainer: true,
    status: "available",
    currentLocation: "TP.HCM",
    createdAt: "2024-01-15",
    updatedAt: "2024-06-10"
  },
  {
    id: "2",
    licensePlate: "59B-67890", 
    driverName: "Trần Văn C",
    driverPhone: "0123456789",
    driverIdentity: "987654321098",
    driverNote: "",
    containerType: "20GP",
    containerSize: "20",
    maxLoadKg: 18000,
    canLiftContainer: false,
    status: "busy",
    currentLocation: "Hà Nội", 
    createdAt: "2024-02-20",
    updatedAt: "2024-06-09"
  }
];

export default function ProviderVehicles() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    licensePlate: "",
    driverName: "",
    driverPhone: "",
    driverIdentity: "",
    driverNote: "",
    containerType: "",
    containerSize: "",
    maxLoadKg: "",
    canLiftContainer: false,
    status: "available",
    currentLocation: ""
  });

  const resetForm = () => {
    setFormData({
      licensePlate: "",
      driverName: "",
      driverPhone: "",
      driverIdentity: "",
      driverNote: "",
      containerType: "",
      containerSize: "",
      maxLoadKg: "",
      canLiftContainer: false,
      status: "available",
      currentLocation: ""
    });
    setSelectedVehicle(null);
  };

  const handleEdit = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setFormData({
      licensePlate: vehicle.licensePlate,
      driverName: vehicle.driverName,
      driverPhone: vehicle.driverPhone,
      driverIdentity: vehicle.driverIdentity,
      driverNote: vehicle.driverNote,
      containerType: vehicle.containerType,
      containerSize: vehicle.containerSize,
      maxLoadKg: vehicle.maxLoadKg.toString(),
      canLiftContainer: vehicle.canLiftContainer,
      status: vehicle.status,
      currentLocation: vehicle.currentLocation
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({
      title: "Thành công",
      description: "Xe đã được xóa",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedVehicle) {
      // Update existing vehicle
      setVehicles(vehicles.map(v => 
        v.id === selectedVehicle.id 
          ? { ...v, ...formData, maxLoadKg: parseInt(formData.maxLoadKg), updatedAt: new Date().toISOString().split('T')[0] }
          : v
      ));
      toast({
        title: "Thành công",
        description: "Thông tin xe đã được cập nhật",
      });
    } else {
      // Add new vehicle
      const newVehicle = {
        id: (vehicles.length + 1).toString(),
        ...formData,
        maxLoadKg: parseInt(formData.maxLoadKg),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setVehicles([...vehicles, newVehicle]);
      toast({
        title: "Thành công",
        description: "Xe mới đã được thêm",
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      available: { label: "Sẵn sàng", className: "bg-green-100 text-green-800" },
      busy: { label: "Đang bận", className: "bg-yellow-100 text-yellow-800" },
      maintenance: { label: "Bảo trì", className: "bg-red-100 text-red-800" }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.available;
    return <Badge className={statusInfo.className}>{statusInfo.label}</Badge>;
  };

  return (
    <ProviderLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý phương tiện</h1>
            <p className="text-muted-foreground">Danh sách và quản lý các xe vận tải</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm xe mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedVehicle ? "Chỉnh sửa xe" : "Thêm xe mới"}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">Biển số xe *</Label>
                    <Input
                      id="licensePlate"
                      value={formData.licensePlate}
                      onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentLocation">Vị trí hiện tại *</Label>
                    <Input
                      id="currentLocation"
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverName">Tên tài xế *</Label>
                    <Input
                      id="driverName"
                      value={formData.driverName}
                      onChange={(e) => setFormData({...formData, driverName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="driverPhone">SĐT tài xế *</Label>
                    <Input
                      id="driverPhone"
                      value={formData.driverPhone}
                      onChange={(e) => setFormData({...formData, driverPhone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverIdentity">CCCD tài xế *</Label>
                  <Input
                    id="driverIdentity"
                    value={formData.driverIdentity}
                    onChange={(e) => setFormData({...formData, driverIdentity: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="containerType">Loại container *</Label>
                    <Select
                      value={formData.containerType}
                      onValueChange={(value) => setFormData({...formData, containerType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại container" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20GP">20GP</SelectItem>
                        <SelectItem value="40GP">40GP</SelectItem>
                        <SelectItem value="40HC">40HC</SelectItem>
                        <SelectItem value="45HC">45HC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="containerSize">Kích thước (feet) *</Label>
                    <Input
                      id="containerSize"
                      value={formData.containerSize}
                      onChange={(e) => setFormData({...formData, containerSize: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxLoadKg">Tải trọng tối đa (kg) *</Label>
                    <Input
                      id="maxLoadKg"
                      type="number"
                      value={formData.maxLoadKg}
                      onChange={(e) => setFormData({...formData, maxLoadKg: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Trạng thái *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({...formData, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Sẵn sàng</SelectItem>
                        <SelectItem value="busy">Đang bận</SelectItem>
                        <SelectItem value="maintenance">Bảo trì</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="canLiftContainer"
                    checked={formData.canLiftContainer}
                    onChange={(e) => setFormData({...formData, canLiftContainer: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="canLiftContainer">Có thể nâng container</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverNote">Ghi chú tài xế</Label>
                  <Textarea
                    id="driverNote"
                    value={formData.driverNote}
                    onChange={(e) => setFormData({...formData, driverNote: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit">
                    {selectedVehicle ? "Cập nhật" : "Thêm xe"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Hủy
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách xe ({vehicles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Truck className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{vehicle.licensePlate}</h3>
                        <p className="text-sm text-muted-foreground">{vehicle.containerType} - {vehicle.containerSize} feet</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(vehicle.status)}
                      <Button size="sm" variant="outline" onClick={() => handleEdit(vehicle)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(vehicle.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tài xế</p>
                      <p className="font-medium">{vehicle.driverName}</p>
                      <p className="text-muted-foreground">{vehicle.driverPhone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tải trọng</p>
                      <p className="font-medium">{vehicle.maxLoadKg.toLocaleString()} kg</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Vị trí</p>
                      <p className="font-medium">{vehicle.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Nâng container</p>
                      <p className="font-medium">{vehicle.canLiftContainer ? "Có" : "Không"}</p>
                    </div>
                  </div>
                  
                  {vehicle.driverNote && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground">Ghi chú: {vehicle.driverNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
}
