
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, Users, Package, UserCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Hệ thống quản lý vận tải
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Giải pháp toàn diện cho việc quản lý vận chuyển container và hàng hóa
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Khách hàng</h3>
              <p className="text-muted-foreground mb-6">
                Đặt xe vận chuyển hàng hóa và container một cách dễ dàng
              </p>
              <Button asChild className="w-full">
                <a href="https://preview--container-go-transit-vn.lovable.app/lcl-booking" target="_blank" rel="noopener noreferrer">
                  Đặt xe ngay
                </a>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Đơn vị vận tải</h3>
              <p className="text-muted-foreground mb-6">
                Quản lý phương tiện, đơn hàng và cập nhật giá cước
              </p>
              <Button asChild className="w-full" variant="outline">
                <Link to="/provider">
                  Đăng nhập Provider
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Nhân viên</h3>
              <p className="text-muted-foreground mb-6">
                Quản lý và ghép các đơn LCL thành đơn FCL
              </p>
              <Button asChild className="w-full" variant="secondary">
                <Link to="/staff">
                  Đăng nhập Staff
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
