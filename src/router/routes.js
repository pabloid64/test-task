const routes = [
  {
    path: "/",
    component: () => import("components/Navigation/Navigation"),
    redirect: "/account",
    children: [
      {
        path: "account",
        name: "account",
        component: () => import("components/Account/Account"),
      },
      {
        path: "operations",
        name: "operations",
        component: () => import("components/Operations/Operations"),
      },
      {
        path: "operatingdays",
        name: "operatingdays",
        component: () => import("components/OperatingDays/OperatingDays"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("components/ErrorPage/ErrorPage"),
  },
];

export default routes;
