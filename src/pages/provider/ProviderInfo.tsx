
import { useState } from "react";
import ProviderLayout from "@/components/provider/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ProviderInfo() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    companyName: "Công ty TNHH Vận tải ABC",
    phone: "0123456789",
    email: "provider@abc.com",
    license: "123456789",
    taxCode: "0123456789",
    identityCard: "123456789012",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    bankAccount: "1234567890",
    bankName: "Vietcombank",
    notes: "Chuyên vận chuyển container"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thành công",
      description: "Thông tin đã được cập nhật",
    });
  };

  return (
    <ProviderLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Thông tin đơn vị</h1>
          <p className="text-muted-foreground">Quản lý thông tin công ty và cá nhân</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin chi tiết</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Tên đơn vị vận tải *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license">Giấy phép kinh doanh *</Label>
                  <Input
                    id="license"
                    value={formData.license}
                    onChange={(e) => handleInputChange("license", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxCode">Mã số thuế *</Label>
                  <Input
                    id="taxCode"
                    value={formData.taxCode}
                    onChange={(e) => handleInputChange("taxCode", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="identityCard">Số CCCD/CMND *</Label>
                  <Input
                    id="identityCard"
                    value={formData.identityCard}
                    onChange={(e) => handleInputChange("identityCard", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Số tài khoản ngân hàng</Label>
                  <Input
                    id="bankAccount"
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Tên ngân hàng</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                  placeholder="Thông tin bổ sung về đơn vị vận tải..."
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  Cập nhật thông tin
                </Button>
                <Button type="button" variant="outline">
                  Hủy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
}
