
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye, FileText } from "lucide-react";

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  unprocessedOrders: number;
  processedOrders: number;
  assignedOrders: number;
  status: "active" | "inactive";
  createdAt: string;
}

interface Order {
  id: string;
  customerName: string;
  pickupLocation: string;
  deliveryLocation: string;
  containerType: string;
  status: string;
  assignedAt?: string;
  processedAt?: string;
  createdAt: string;
}

const AdminStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);

  const [staffMembers] = useState<Staff[]>([
    {
      id: 1,
      name: "Nguyễn Văn B",
      email: "staff1@company.com",
      phone: "0987654321",
      department: "Logistics",
      unprocessedOrders: 5,
      processedOrders: 12,
      assignedOrders: 3,
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Trần Thị C",
      email: "staff2@company.com",
      phone: "0912345678",
      department: "Operations",
      unprocessedOrders: 8,
      processedOrders: 20,
      assignedOrders: 5,
      status: "active",
      createdAt: "2024-02-10"
    },
    {
      id: 3,
      name: "Lê Văn D",
      email: "staff3@company.com",
      phone: "0909123456",
      department: "Customer Service",
      unprocessedOrders: 2,
      processedOrders: 15,
      assignedOrders: 1,
      status: "inactive",
      createdAt: "2024-01-05"
    }
  ]);

  const [staffOrders] = useState<{ [key: string]: Order[] }>({
    unprocessed: [
      {
        id: "ORD-101",
        customerName: "Công ty ABC",
        pickupLocation: "Hà Nội",
        deliveryLocation: "TP.HCM",
        containerType: "FCL",
        status: "pending",
        createdAt: "2024-03-01"
      },
      {
        id: "ORD-102",
        customerName: "XYZ Ltd",
        pickupLocation: "Đà Nẵng",
        deliveryLocation: "Hải Phòng",
        containerType: "LCL",
        status: "pending",
        createdAt: "2024-03-02"
      }
    ],
    processed: [
      {
        id: "ORD-201",
        customerName: "DEF Corp",
        pickupLocation: "Cần Thơ",
        deliveryLocation: "Hà Nội",
        containerType: "FCL",
        status: "confirmed",
        processedAt: "2024-02-28",
        createdAt: "2024-02-25"
      }
    ],
    assigned: [
      {
        id: "ORD-301",
        customerName: "GHI Industries",
        pickupLocation: "TP.HCM",
        deliveryLocation: "Đà Nẵng",
        containerType: "LCL",
        status: "assigned",
        assignedAt: "2024-03-03",
        createdAt: "2024-03-01"
      }
    ]
  });

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsDetailDialogOpen(true);
  };

  const handleViewOrders = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsOrdersDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700"
    };
    const statusLabels = {
      active: "Hoạt động",
      inactive: "Ngừng hoạt động"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getOrderStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      assigned: "bg-purple-100 text-purple-700"
    };
    const labels = {
      pending: "Chờ xử lý",
      confirmed: "Đã xử lý",
      assigned: "Đã giao việc"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý nhân viên</h1>
          <p className="text-muted-foreground">
            Xem thông tin và quản lý công việc của nhân viên
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách nhân viên</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, email hoặc phòng ban..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên nhân viên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Chưa xử lý</TableHead>
                  <TableHead>Đã xử lý</TableHead>
                  <TableHead>Đã giao việc</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phone}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>{staff.unprocessedOrders}</TableCell>
                    <TableCell>{staff.processedOrders}</TableCell>
                    <TableCell>{staff.assignedOrders}</TableCell>
                    <TableCell>{getStatusBadge(staff.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewStaff(staff)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewOrders(staff)}
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Staff Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thông tin nhân viên</DialogTitle>
            </DialogHeader>
            {selectedStaff && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tên nhân viên</label>
                  <p className="text-sm text-gray-600">{selectedStaff.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-gray-600">{selectedStaff.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Điện thoại</label>
                  <p className="text-sm text-gray-600">{selectedStaff.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phòng ban</label>
                  <p className="text-sm text-gray-600">{selectedStaff.department}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Chưa xử lý</label>
                    <p className="text-sm text-gray-600">{selectedStaff.unprocessedOrders}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Đã xử lý</label>
                    <p className="text-sm text-gray-600">{selectedStaff.processedOrders}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Đã giao việc</label>
                    <p className="text-sm text-gray-600">{selectedStaff.assignedOrders}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Trạng thái</label>
                  <div className="mt-1">{getStatusBadge(selectedStaff.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày tạo</label>
                  <p className="text-sm text-gray-600">{selectedStaff.createdAt}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Staff Orders Dialog */}
        <Dialog open={isOrdersDialogOpen} onOpenChange={setIsOrdersDialogOpen}>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>Quản lý đơn hàng của {selectedStaff?.name}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="unprocessed" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="unprocessed">Chưa xử lý</TabsTrigger>
                <TabsTrigger value="processed">Đã xử lý</TabsTrigger>
                <TabsTrigger value="assigned">Đã giao việc</TabsTrigger>
              </TabsList>
              
              <TabsContent value="unprocessed">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Điểm đón</TableHead>
                      <TableHead>Điểm giao</TableHead>
                      <TableHead>Loại container</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffOrders.unprocessed.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.pickupLocation}</TableCell>
                        <TableCell>{order.deliveryLocation}</TableCell>
                        <TableCell>{order.containerType}</TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="processed">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Điểm đón</TableHead>
                      <TableHead>Điểm giao</TableHead>
                      <TableHead>Loại container</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày xử lý</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffOrders.processed.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.pickupLocation}</TableCell>
                        <TableCell>{order.deliveryLocation}</TableCell>
                        <TableCell>{order.containerType}</TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.processedAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="assigned">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Điểm đón</TableHead>
                      <TableHead>Điểm giao</TableHead>
                      <TableHead>Loại container</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày giao việc</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffOrders.assigned.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.pickupLocation}</TableCell>
                        <TableCell>{order.deliveryLocation}</TableCell>
                        <TableCell>{order.containerType}</TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.assignedAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminStaff;
