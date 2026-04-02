import { Link } from "react-router-dom";
import { useAuthStore } from "../Stores/authContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { products } from "../data";

const mockOrders = [
  { id: "#VS-1001", customer: "Sarah Benali", total: 14500, status: "Paid" },
  { id: "#VS-1002", customer: "Nina K.", total: 8900, status: "Pending" },
  { id: "#VS-1003", customer: "Yasmine A.", total: 22000, status: "Paid" },
];

export default function AdminPanel() {
  const { user } = useAuthStore();
  const { language, t } = useLanguage();

  const labels =
    language === "fr"
      ? {
          recentOrders: "Commandes récentes",
          quickActions: "Actions rapides",
          goShop: "Voir la boutique",
          manageUsers: "Gérer les utilisateurs",
          stock: "Stock total",
        }
      : {
          recentOrders: "Recent orders",
          quickActions: "Quick actions",
          goShop: "Go to shop",
          manageUsers: "Manage users",
          stock: "Total stock",
        };

  const stats = [
    { label: t("admin.users"), value: 2 },
    { label: t("admin.products"), value: products.length },
    { label: t("admin.orders"), value: mockOrders.length },
    { label: t("admin.revenue"), value: "145 000 Da" },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="mb-1 text-3xl font-bold text-rose-700 dark:text-rose-300">{t("admin.title")}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {t("admin.subtitle")} {user ? `- ${user.name}` : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-300">{item.label}</p>
            <p className="text-2xl font-bold text-rose-600">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <article className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold">{labels.recentOrders}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-rose-100 dark:border-zinc-700">
                  <th className="px-2 py-2">ID</th>
                  <th className="px-2 py-2">{language === "fr" ? "Client" : "Customer"}</th>
                  <th className="px-2 py-2">{language === "fr" ? "Montant" : "Amount"}</th>
                  <th className="px-2 py-2">{language === "fr" ? "Statut" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-rose-50 dark:border-zinc-800">
                    <td className="px-2 py-2 font-medium">{order.id}</td>
                    <td className="px-2 py-2">{order.customer}</td>
                    <td className="px-2 py-2">{order.total} Da</td>
                    <td className="px-2 py-2">
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-amber-50 p-5 shadow-sm dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800">
          <h2 className="mb-3 text-lg font-semibold">{labels.quickActions}</h2>
          <div className="flex flex-col gap-2">
            <Link to="/shop" className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white no-underline">
              {labels.goShop}
            </Link>
            <button type="button" className="rounded-xl border border-rose-200 px-4 py-2 text-left text-sm dark:border-zinc-700">
              {labels.manageUsers}
            </button>
            <p className="rounded-xl bg-white/70 px-4 py-2 text-sm dark:bg-zinc-900/70">
              {labels.stock}: {products.reduce((acc, product) => acc + product.sizes.length, 0)}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
