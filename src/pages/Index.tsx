
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Users, Package, Ship, User, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Ship className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">Container Go</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/customer-login">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link to="/customer-register">Đăng ký</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Dịch vụ vận chuyển container hàng đầu Việt Nam
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Kết nối khách hàng với các đơn vị vận tải uy tín, 
            đảm bảo hàng hóa được vận chuyển an toàn và đúng hạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/customer-register">Bắt đầu ngay</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/customer-login">Đã có tài khoản</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Dịch vụ của chúng tôi
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Vận chuyển LCL</CardTitle>
                <CardDescription>
                  Ghép hàng tiết kiệm chi phí cho các lô hàng nhỏ
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Vận chuyển FCL</CardTitle>
                <CardDescription>
                  Thuê nguyên container cho các lô hàng lớn
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Mạng lưới rộng</CardTitle>
                <CardDescription>
                  Kết nối với nhiều đơn vị vận tải trên toàn quốc
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Access Portal Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Cổng truy cập hệ thống
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Khách hàng</CardTitle>
                <CardDescription>
                  Đặt xe vận chuyển, theo dõi đơn hàng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" asChild>
                  <Link to="/customer-login">Đăng nhập</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/customer-register">Đăng ký</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Đơn vị vận tải</CardTitle>
                <CardDescription>
                  Quản lý xe, đơn hàng và định giá
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link to="/login">Đăng nhập Provider</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <UserCheck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Nhân viên</CardTitle>
                <CardDescription>
                  Xử lý đơn hàng, ghép container
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                  <Link to="/login">Đăng nhập Staff</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Ship className="w-6 h-6" />
            <span className="text-xl font-bold">Container Go</span>
          </div>
          <p className="text-gray-400 mb-6">
            Đối tác tin cậy trong lĩnh vực vận chuyển container
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              © 2024 Container Go. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
