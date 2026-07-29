import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import ProtectedRoute from '../Contexts/ProtectedRoute';
import AdminLayout from '../Layout/AdminLayout';
import RiderDashboard from '../Pages/Rider/Dashboard/RiderDashboard';
import BranchDashboard from '../Pages/Branch/Dashboard/BranchDashboard';
import ExpenseType from '../Pages/Admin/Expense-type/ExpenseType';
import CompanyInfo from '../Pages/Admin/Company-info/CompanyInfo';
import Dashboard from '../Pages/Admin/Dashboard/Dashboard';
import RiderLayout from '../Layout/RiderLayout';
import Pickup from '../Pages/Rider/Pickup/Pickup';
import BranchLayout from '../Layout/BranchLayout';
import Rider from '../Pages/Branch/Rider/Rider';
import InCharge from '../Pages/Branch/In-Charge/InCharge';
import Consignments from '../Pages/Branch/Consignments/Consignments';
import AddParcel from '../Pages/Branch/Add-Parcel/AddParcel';
import BulkImport from '../Pages/Branch/Bulk-Import/BulkImport';
import OrderExport from '../Pages/Branch/Order-Export/OrderExport';
import ConsignmentsRequest from '../Pages/Branch/Consignments-Request/ConsignmentsRequest';
import ConsignmentsReceive from '../Pages/Branch/Consignments-Receive/ConsignmentsReceive';
import TransitParcel from '../Pages/Branch/Transit-Parcel/TransitParcel';
import DestinationHub from '../Pages/Branch/Destination-Hub/DestinationHub';
import DeliveryParcel from '../Pages/Branch/Delivery-Parcel/DeliveryParcel';
import CollectAmountRider from '../Pages/Branch/Collect-Amount-Rider/CollectAmountRider';
import ReturnProcessing from '../Pages/Branch/Return-Processing/ReturnProcessing';
import RescheduleParcel from '../Pages/Branch/Reschedule-Parcel/RescheduleParcel';
import CollectionAmount from '../Pages/Branch/Collection-Amount/CollectionAmount';
import PaymentAmount from '../Pages/Branch/Payment-Amount/PaymentAmount';
import PickupReAssign from '../Pages/Branch/Pickup-Re-Assign/PickupReAssign';
import DeliveryReAssign from '../Pages/Branch/Delivery-Re-Assign/DeliveryReAssign';
import HubFulfillment from '../Pages/Branch/Hub-Fulfillment/HubFulfillment';
import ReturnHistory from '../Pages/Branch/Return-History/ReturnHistory';
import TransferHistory from '../Pages/Branch/Transfer-History/TransferHistory';
import RiderCollectHistory from '../Pages/Branch/Rider-Collect-History/RiderCollectHistory';
import TransactionHistory from '../Pages/Branch/Transaction-History/TransactionHistory';
import RiderHistory from '../Pages/Branch/Rider-History/RiderHistory';
import ErrorPage from '../Pages/Error/ErrorPage';
import RiderDeliveryParcel from '../Pages/Rider/Delivery-Parcel/RiderDeliveryParcel';
import RiderRescheduleOrder from '../Pages/Rider/Reschedule-Order/RiderRescheduleOrder';
import TransferOrder from '../Pages/Rider/Transfer-Order/TransferOrder';
import ReturnParcel from '../Pages/Rider/Return-Parcel/ReturnParcel';
import ParcelHistory from '../Pages/Rider/Parcel-History/ParcelHistory';
import RiderTransferHistory from '../Pages/Rider/Transfer-History/RiderTransferHistory';
import RiderReturnHistory from '../Pages/Rider/Return-History/RiderReturnHistory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/admin/dashboard',
        Component: Dashboard,
      },
      {
        path: '/admin/dashboard/company-info',
        Component: CompanyInfo,
      },
      {
        path: '/admin/dashboard/expense-type',
        Component: ExpenseType,
      },
    ],
  },
  {
    path: '/rider',
    element: (
      <ProtectedRoute allowedRoles={['rider']}>
        <RiderLayout></RiderLayout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/rider/dashboard',
        Component: RiderDashboard,
      },
      {
        path: '/rider/pickup',
        Component: Pickup,
      },
      {
        path: '/rider/delivery-parcel',
        Component: RiderDeliveryParcel,
      },
      {
        path: '/rider/reschedule-order',
        Component: RiderRescheduleOrder,
      },
      {
        path: '/rider/transfer-order',
        Component: TransferOrder,
      },
      {
        path: '/rider/return-parcel',
        Component: ReturnParcel,
      },
      {
        path: '/rider/reports/parcel-history',
        Component: ParcelHistory,
      },
      {
        path: '/rider/reports/transfer-history',
        Component: RiderTransferHistory,
      },
      {
        path: '/rider/reports/return-history',
        Component: RiderReturnHistory,
      },
    ],
  },
  {
    path: '/branch',
    element: (
      <ProtectedRoute allowedRoles={['branch']}>
        <BranchLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/branch/dashboard',
        element: <BranchDashboard />,
      },
      {
        path: '/branch/dashboard/riders',
        element: <Rider />,
      },
      {
        path: '/branch/dashboard/in-charge',
        element: <InCharge />,
      },
      {
        path: '/branch/dashboard/consignments',
        element: <Consignments />,
      },
      {
        path: '/branch/dashboard/add-parcel',
        element: <AddParcel />,
      },
      {
        path: '/branch/dashboard/bulk-import',
        element: <BulkImport />,
      },
      {
        path: '/branch/dashboard/order-export',
        element: <OrderExport />,
      },
      {
        path: '/branch/dashboard/consignments-request',
        element: <ConsignmentsRequest />,
      },
      {
        path: '/branch/dashboard/consignments-receive',
        element: <ConsignmentsReceive />,
      },
      {
        path: '/branch/dashboard/transit-parcel',
        element: <TransitParcel />,
      },
      {
        path: '/branch/dashboard/destination-hub',
        element: <DestinationHub />,
      },
      {
        path: '/branch/dashboard/delivery-parcel',
        element: <DeliveryParcel />,
      },
      {
        path: '/branch/dashboard/collect-amount-rider',
        element: <CollectAmountRider />,
      },
      {
        path: '/branch/dashboard/return-processing',
        element: <ReturnProcessing />,
      },
      {
        path: '/branch/dashboard/reschedule-parcel',
        element: <RescheduleParcel />,
      },
      {
        path: '/branch/dashboard/collection-amount',
        element: <CollectionAmount />,
      },
      {
        path: '/branch/dashboard/payment-amount',
        element: <PaymentAmount />,
      },
      {
        path: '/branch/dashboard/pickup-re-assign',
        element: <PickupReAssign />,
      },
      {
        path: '/branch/dashboard/delivery-re-assign',
        element: <DeliveryReAssign />,
      },
      {
        path: '/branch/dashboard/hub-fulfillment',
        element: <HubFulfillment />,
      },
      {
        path: '/branch/dashboard/rider-history',
        element: <RiderHistory />,
      },
      {
        path: '/branch/dashboard/transaction-history',
        element: <TransactionHistory />,
      },
      {
        path: '/branch/dashboard/rider-collect-history',
        element: <RiderCollectHistory />,
      },
      {
        path: '/branch/dashboard/transfer-history',
        element: <TransferHistory />,
      },
      {
        path: '/branch/dashboard/return-history',
        element: <ReturnHistory />,
      },
    ],
  },
]);
