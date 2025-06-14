import StaffLayout from "@/components/staff/StaffLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const StaffInfo = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thành công",
      description: "Thông tin cá nhân đã được cập nhật",
    });
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Thông tin cá nhân</h1>
          <p className="text-muted-foreground">Quản lý thông tin tài khoản nhân viên</p>
        </div>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Cập nhật thông tin</CardTitle>
            <CardDescription>
              Cập nhật thông tin cá nhân và liên hệ của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    placeholder="Nguyễn Văn A"
                    defaultValue="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Mã nhân viên</Label>
                  <Input
                    id="employeeId"
                    placeholder="NV001"
                    defaultValue="NV001"
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    placeholder="0123456789"
                    defaultValue="0123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="staff@company.com"
                    defaultValue="staff@company.com"
                    disabled
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  placeholder="123 Đường ABC, Quận XYZ, TP.HCM"
                  defaultValue="123 Đường ABC, Quận XYZ, TP.HCM"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cccd">Số CCCD</Label>
                  <Input
                    id="cccd"
                    placeholder="123456789012"
                    defaultValue="123456789012"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Bộ phận</Label>
                  <Input
                    id="department"
                    placeholder="Vận hành"
                    defaultValue="Vận hành"
                    disabled
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Cập nhật thông tin
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
};

export default StaffInfo;
