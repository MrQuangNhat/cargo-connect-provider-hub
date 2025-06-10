
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";

interface PriceItem {
  id: number;
  containerType: string;
  containerSize: string;
  basePrice: number;
  ratePricePerKm: number;
  createdAt: string;
  updatedAt: string;
}

const AdminPricing = () => {
  const [selectedPrice, setSelectedPrice] = useState<PriceItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [priceList, setPriceList] = useState<PriceItem[]>([
    {
      id: 1,
      containerType: "Dry Container",
      containerSize: "20ft",
      basePrice: 2000000,
      ratePricePerKm: 15000,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15"
    },
    {
      id: 2,
      containerType: "Dry Container",
      containerSize: "40ft",
      basePrice: 3500000,
      ratePricePerKm: 25000,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    },
    {
      id: 3,
      containerType: "Refrigerated Container",
      containerSize: "20ft",
      basePrice: 3000000,
      ratePricePerKm: 20000,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15"
    },
    {
      id: 4,
      containerType: "Refrigerated Container",
      containerSize: "40ft",
      basePrice: 5000000,
      ratePricePerKm: 35000,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15"
    }
  ]);

  const [formData, setFormData] = useState({
    containerType: "",
    containerSize: "",
    basePrice: 0,
    ratePricePerKm: 0
  });

  const containerTypes = [
    "Dry Container",
    "Refrigerated Container",
    "Open Top Container",
    "Flat Rack Container",
    "Tank Container"
  ];

  const containerSizes = [
    "20ft",
    "40ft",
    "45ft"
  ];

  const handleEditPrice = (price: PriceItem) => {
    setSelectedPrice(price);
    setFormData({
      containerType: price.containerType,
      containerSize: price.containerSize,
      basePrice: price.basePrice,
      ratePricePerKm: price.ratePricePerKm
    });
    setIsEditDialogOpen(true);
  };

  const handleAddPrice = () => {
    setFormData({
      containerType: "",
      containerSize: "",
      basePrice: 0,
      ratePricePerKm: 0
    });
    setIsAddDialogOpen(true);
  };

  const handleSavePrice = () => {
    if (selectedPrice) {
      // Update existing price
      setPriceList(priceList.map(price => 
        price.id === selectedPrice.id 
          ? { 
              ...price, 
              ...formData,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : price
      ));
      setIsEditDialogOpen(false);
    } else {
      // Add new price
      const newPrice: PriceItem = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setPriceList([...priceList, newPrice]);
      setIsAddDialogOpen(false);
    }
    setSelectedPrice(null);
  };

  const handleDeletePrice = (priceId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa mục giá này?")) {
      setPriceList(priceList.filter(price => price.id !== priceId));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Bảng giá</h1>
            <p className="text-muted-foreground">
              Quản lý giá cước vận chuyển container
            </p>
          </div>
          <Button onClick={handleAddPrice}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm giá mới
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách bảng giá</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại container</TableHead>
                  <TableHead>Kích thước</TableHead>
                  <TableHead>Giá cơ bản</TableHead>
                  <TableHead>Giá/km</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Cập nhật cuối</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceList.map((price) => (
                  <TableRow key={price.id}>
                    <TableCell className="font-medium">{price.containerType}</TableCell>
                    <TableCell>{price.containerSize}</TableCell>
                    <TableCell>{formatCurrency(price.basePrice)}</TableCell>
                    <TableCell>{formatCurrency(price.ratePricePerKm)}</TableCell>
                    <TableCell>{price.createdAt}</TableCell>
                    <TableCell>{price.updatedAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditPrice(price)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeletePrice(price.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Price Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa giá</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-container-type">Loại container</Label>
                <Select 
                  value={formData.containerType} 
                  onValueChange={(value) => setFormData({...formData, containerType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại container" />
                  </SelectTrigger>
                  <SelectContent>
                    {containerTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-container-size">Kích thước</Label>
                <Select 
                  value={formData.containerSize} 
                  onValueChange={(value) => setFormData({...formData, containerSize: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kích thước" />
                  </SelectTrigger>
                  <SelectContent>
                    {containerSizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-base-price">Giá cơ bản (VNĐ)</Label>
                <Input
                  id="edit-base-price"
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({...formData, basePrice: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="edit-rate-price">Giá mỗi km (VNĐ)</Label>
                <Input
                  id="edit-rate-price"
                  type="number"
                  value={formData.ratePricePerKm}
                  onChange={(e) => setFormData({...formData, ratePricePerKm: Number(e.target.value)})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSavePrice}>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Price Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm giá mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-container-type">Loại container *</Label>
                <Select 
                  value={formData.containerType} 
                  onValueChange={(value) => setFormData({...formData, containerType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại container" />
                  </SelectTrigger>
                  <SelectContent>
                    {containerTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="add-container-size">Kích thước *</Label>
                <Select 
                  value={formData.containerSize} 
                  onValueChange={(value) => setFormData({...formData, containerSize: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kích thước" />
                  </SelectTrigger>
                  <SelectContent>
                    {containerSizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="add-base-price">Giá cơ bản (VNĐ) *</Label>
                <Input
                  id="add-base-price"
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({...formData, basePrice: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="add-rate-price">Giá mỗi km (VNĐ) *</Label>
                <Input
                  id="add-rate-price"
                  type="number"
                  value={formData.ratePricePerKm}
                  onChange={(e) => setFormData({...formData, ratePricePerKm: Number(e.target.value)})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSavePrice}>
                  Thêm giá
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminPricing;
