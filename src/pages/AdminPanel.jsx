import { Navigate } from "react-router-dom";
import { products } from "../data.js";
import { categories } from "../composants/Categories.jsx";
import { useAuthStore } from "../Stores/authContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

const fakeOrders = [
  { id: "ORD-1001", customer: "Lina M.", total: 9400, status: "Paid" },
  { id: "ORD-1002", customer: "Nora B.", total: 5600, status: "Processing" },
  { id: "ORD-1003", customer: "Amira K.", total: 12400, status: "Delivered" },
];

export default function AdminPanel() {
  const { user } = useAuthStore();
  const { t } = useLanguage();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-lg w-full rounded-3xl border border-amber-200 bg-amber-50 text-amber-900 p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">{t("admin.title")}</h1>
          <p>{t("admin.notAllowed")}</p>
        </div>
      </section>
    );
  }

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalNew = products.filter((product) => product.isNew).length;
  const totalBest = products.filter((product) => product.isBestseller).length;

  const statCards = [
    { label: t("admin.statsProducts"), value: totalProducts },
    { label: t("admin.statsCategories"), value: totalCategories },
    { label: t("admin.statsNew"), value: totalNew },
    { label: t("admin.statsBest"), value: totalBest },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-700">{t("admin.title")}</h1>
          <p className="text-gray-600 mt-2">{t("admin.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {statCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-pink-100 bg-white p-4 sm:p-5 shadow-sm">
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-pink-700 mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-pink-100 bg-white p-4 sm:p-6">
            <h2 className="font-semibold text-lg mb-4">{t("admin.recentOrders")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-pink-100">
                    <th className="py-2">ID</th>
                    <th className="py-2">{t("admin.users")}</th>
                    <th className="py-2">Total</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fakeOrders.map((order) => (
                    <tr key={order.id} className="border-b border-pink-50">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.total} Da</td>
                      <td className="py-3">
                        <span className="inline-flex px-2 py-1 rounded-full bg-pink-100 text-pink-700 text-xs">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white p-4 sm:p-6">
            <h2 className="font-semibold text-lg mb-4">{t("admin.users")}</h2>
            <div className="space-y-3">
              <div className="rounded-xl bg-pink-50 p-3">
                <p className="font-medium text-pink-700">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-semibold">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
