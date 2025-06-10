
import { useState } from "react";
import ProviderLayout from "@/components/provider/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash, Edit } from "lucide-react";

const mockPrices = [
  {
    id: "1",
    from: "TP.HCM",
    to: "Hà Nội",
    containerType: "20GP",
    containerSize: "20",
    price: 8000000,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01"
  },
  {
    id: "2", 
    from: "TP.HCM",
    to: "Hà Nội",
    containerType: "40GP",
    containerSize: "40",
    price: 12000000,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-05"
  },
  {
    id: "3",
    from: "TP.HCM",
    to: "Đà Nẵng", 
    containerType: "20GP",
    containerSize: "20",
    price: 5000000,
    createdAt: "2024-06-02",
    updatedAt: "2024-06-02"
  },
  {
    id: "4",
    from: "Hà Nội",
    to: "Hải Phòng",
    containerType: "40HC",
    containerSize: "40", 
    price: 3000000,
    createdAt: "2024-06-03",
    updatedAt: "2024-06-03"
  }
];

const locations = [
  "TP.HCM", "Hà Nội", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Nha Trang", "Vũng Tàu", "Quy Nhon"
];

const containerTypes = [
  { value: "20GP", label: "20GP", size: "20" },
  { value: "40GP", label: "40GP", size: "40" },
  { value: "40HC", label: "40HC", size: "40" },
  { value: "45HC", label: "45HC", size: "45" }
];

export default function ProviderPricing() {
  const { toast } = useToast();
  const [prices, setPrices] = useState(mockPrices);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    containerType: "",
    containerSize: "",
    price: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleContainerTypeChange = (value: string) => {
    const containerType = containerTypes.find(ct => ct.value === value);
    setFormData({
      ...formData,
      containerType: value,
      containerSize: containerType?.size || ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.from || !formData.to || !formData.containerType || !formData.price) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      // Update existing price
      setPrices(prices.map(price => 
        price.id === editingId 
          ? { 
              ...price, 
              ...formData, 
              price: parseInt(formData.price),
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : price
      ));
      toast({
        title: "Thành công",
        description: "Giá đã được cập nhật",
      });
      setEditingId(null);
    } else {
      // Add new price
      const newPrice = {
        id: (prices.length + 1).toString(),
        ...formData,
        price: parseInt(formData.price),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setPrices([...prices, newPrice]);
      toast({
        title: "Thành công", 
        description: "Giá mới đã được thêm",
      });
    }

    setFormData({
      from: "",
      to: "",
      containerType: "",
      containerSize: "",
      price: ""
    });
  };

  const handleEdit = (price: any) => {
    setFormData({
      from: price.from,
      to: price.to,
      containerType: price.containerType,
      containerSize: price.containerSize,
      price: price.price.toString()
    });
    setEditingId(price.id);
  };

  const handleDelete = (id: string) => {
    setPrices(prices.filter(p => p.id !== id));
    toast({
      title: "Thành công",
      description: "Giá đã được xóa",
    });
  };

  const handleCancel = () => {
    setFormData({
      from: "",
      to: "",
      containerType: "",
      containerSize: "",
      price: ""
    });
    setEditingId(null);
  };

  return (
    <ProviderLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cập nhật giá</h1>
          <p className="text-muted-foreground">Quản lý bảng giá vận chuyển container</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {editingId ? "Chỉnh sửa giá" : "Thêm giá mới"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">Từ *</Label>
                    <Select
                      value={formData.from}
                      onValueChange={(value) => setFormData({...formData, from: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn điểm đi" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">Đến *</Label>
                    <Select
                      value={formData.to}
                      onValueChange={(value) => setFormData({...formData, to: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn điểm đến" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="containerType">Loại container *</Label>
                    <Select
                      value={formData.containerType}
                      onValueChange={handleContainerTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại container" />
                      </SelectTrigger>
                      <SelectContent>
                        {containerTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="containerSize">Kích thước (feet)</Label>
                    <Input
                      id="containerSize"
                      value={formData.containerSize}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Giá (VNĐ) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Nhập giá vận chuyển"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit">
                    {editingId ? "Cập nhật" : "Thêm giá"}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Hủy
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Price List */}
          <Card>
            <CardHeader>
              <CardTitle>Bảng giá hiện tại ({prices.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {prices.map((price) => (
                  <div key={price.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">
                          {price.from} → {price.to}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {price.containerType} ({price.containerSize} feet)
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(price)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(price.id)}>
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Giá:</span>
                        <span className="font-medium text-lg">
                          {price.price.toLocaleString()} VNĐ
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cập nhật:</span>
                        <span>{price.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {prices.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Chưa có giá nào được thiết lập
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProviderLayout>
  );
}
